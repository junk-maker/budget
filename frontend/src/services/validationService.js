export default class ValidationService {
    validateEmail(email) {
        let regExp = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[A-Z]{2}|ru|com|org|net)\b/
        return regExp.test(String(email));
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

    setStateHandler(schema) {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            if (!schema.hasOwnProperty('confirmPassword')) {
                return isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid
            } else {
                return isFormValidLocal = isFormValidLocal && schema[name].value !== ''
                    && schema[name].valid && schema['password'].value === schema['confirmPassword'].value &&
                    (this.strengthChecker(schema['password'].value).score === 2 || this.strengthChecker(schema['password'].value).score === 3);
            }
        });
        return isFormValidLocal;
    };

    strengthChecker(password) {
        // console.log(password)
        let strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
        let mediumPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
        if(password.length === 0) return {score: 0};
        if(strongPassword.test(password)) {
            return {
                score: 3,
                message: 'Отличный пароль'
            }
        } else if(mediumPassword.test(password)) {
            return {
                score: 2,
                message: 'Средний пароль'
            }
        } else {
            return {
                score: 1,
                message: 'Ненадежный пароль'
            }
        }
    };
};