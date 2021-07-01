import ErrorPopup from '../popup/ErrorPopup';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../presentation/ui/input/Input';
import AppService from '../../../services/appService';
import Button from '../../presentation/ui/button/Button';
import Textarea from '../../presentation/ui/textarea/Textarea';
import ValidationService from '../../../services/validationService';
import DataSchemasService from '../../../services/dataSchemasService';
import {sendMessage, fetchContact, contactReset} from '../../../redux/actions/contactActions';


const Contact = () => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const schema = new DataSchemasService();
    const validationService = new ValidationService();
    const [contact, setContact] = useState(schema.contactForm());
    const [message, setMessage] = useState(schema.messageForm());
    const contactActions =  useSelector(state => state.getContact);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [isMessageFormValid, setIsMessageFormValid] = useState(false);

    const {error} = contactActions;

    useEffect(() => {
        dispatch(fetchContact(setErrorPopupOpen));
    }, [dispatch]);

    const submitHandler = e => e.preventDefault();

    const sendEmailHandler = () => {
        dispatch(
            sendMessage(
                contact.name.value,
                contact.email.value,
                message.message.value,
                setErrorPopupOpen
            )
        );

        setMessage(schema.messageForm());
        setContact(schema.contactForm());
        setIsMessageFormValid(false);
    };

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid;
        });
        setContact(schema);
        setIsFormValid(isFormValidLocal);
    };

    const setMessageStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '';
        });
        setMessage(schema);
        setIsMessageFormValid(isFormValidLocal);
    };

    const renderInput = (idx, name, control) => {
        let type = control.type === 'email';
        return(
            <div className={'contact-form__row'} key={idx + name}>
                <div className={'contact-form__name'}>{control.label}</div>
                <div className={'contact-form__value'}>
                    <Input
                        type={control.type}
                        value={control.value}
                        className={!type ? 'input' :(!control.touched ? 'input' :
                            validationService.isInvalid(control.valid, control.touched, !!control.validation)
                                ? 'input error' : 'input success')}
                        onChange={e => validationService.changeHandler(e, name, contact, setStateHandler)}
                    />
                </div>
            </div>
        );
    };

    const renderTextarea = (idx, name, control) => {
        return(
            <div className={'contact-form__row'} key={idx + name}>
                <div className={'contact-form__name'}>{control.label}</div>
                <div className={'contact-form__value'}>
                   <Textarea
                       value={control.value}
                       className={'input textarea'}
                       onChange={e => validationService.changeHandler(e, name, message, setMessageStateHandler)}
                   />
                </div>
            </div>
        );
    };

    return(
        <>
            <div className={'contact-form'}>
                <div className={'contact-form__header'}>
                    <div className={'contact-form__header--title'}>Связаться с нами</div>
                </div>

                <div className={'contact-form__main'}>
                    <form onClick={e => submitHandler(e)}>
                        {appService.objectIteration(contact, renderInput)}
                        {appService.objectIteration(message, renderTextarea)}
                    </form>
                </div>
                <div className={'contact-form__footer'}>
                    <div className={'contact-form__cell'}>
                        <Button
                            onClick={sendEmailHandler}
                            disabled={!isFormValid || !isMessageFormValid}
                            className={!isFormValid || !isMessageFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                        >
                            <span>Отправить</span>
                        </Button>
                    </div>
                </div>
            </div>

            <ErrorPopup
                error={error}
                type={'contact'}
                reset={contactReset}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>Не авторизован для доступа</span>
                </div>
            </ErrorPopup>
        </>
    );
};


export default Contact;