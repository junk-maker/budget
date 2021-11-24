import AppService from './appService';

export default class ValidationService {
    constructor() {
        this.appService = new AppService();
    };

    validateEmail(email, language) {
        let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+(?:[A-Z]{2}|ru|com|org|net)))$/;
        return regExp.test(String(email).trim());
    };

    setAuthStateHandler(schema) {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            if (!schema.hasOwnProperty('confirmPassword')) {
                return isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid
            } else {
                return isFormValidLocal = isFormValidLocal && schema[name].value !== ''
                    && schema[name].valid && schema['password'].value === schema['confirmPassword'].value &&
                    (this.strengthChecker(schema['password'].value).score === 2 ||
                        this.strengthChecker(schema['password'].value).score === 3);
            }
        });
        return isFormValidLocal;
    };

    validateControl(value, validation) {
        if(!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = this.validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    };

    strengthChecker(password, language) {
        let strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
        let mediumPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
        if(password.length === 0) return {score: 0};
        if(strongPassword.test(password)) {
            return {
                score: 3,
                message: this.appService.checkLanguage(language) ? 'Отличный пароль' : 'Great password'
            }
        } else if(mediumPassword.test(password)) {
            return {
                score: 2,
                message: this.appService.checkLanguage(language) ? 'Средний пароль' : 'Average password'
            }
        } else {
            return {
                score: 1,
                message: this.appService.checkLanguage(language) ? 'Ненадежный пароль' : 'Weak password'
            }
        }
    };

    isInvalid(valid, touched, validation) {
        return !valid && touched && validation
    };

    changeHandler(e, name, form, callback) {
        let schema = {...form};
        let control = {...schema[name]};
        control.touched = true;
        control.value = e.target.value;

        control.valid = this.validateControl(control.value, control.validation);

        schema[name] = control;
        callback(schema);
    };
};