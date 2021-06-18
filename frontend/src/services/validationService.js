export default class ValidationService {
    isInvalid(valid, touched, validation) {
        return !valid && touched && validation
    };

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