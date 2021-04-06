export default class ValidationService {
    isInvalid(...args) {
        const [valid, touched, validation] = args;
        return !valid && touched && validation;
    };

    validateEmail(...args) {
        const [email] = args;
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|ru|com|org|net)\b/
        return regExp.test(String(email).toLowerCase().trim());
    };

    validateControl(...args) {
        const [value, validation] = args;

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

    changeHandler(...args) {
        const [e, name, form, callback] = args;
        let schema = {...form};
        let control = {...schema[name]};

        control.touched = true;
        control.value = e.target.value;
        control.valid = this.validateControl(control.value, control.validation);

        schema[name] = control;
        callback(schema);
    };
};