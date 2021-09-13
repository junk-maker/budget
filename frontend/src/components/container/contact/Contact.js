import PropTypes from 'prop-types';
import SignalPopup from '../popup/SignalPopup';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../presentation/ui/input/Input';
import AppService from '../../../services/appService';
import Button from '../../presentation/ui/button/Button';
import MarkupService from '../../../services/markupService';
import Textarea from '../../presentation/ui/textarea/Textarea';
import BtnLoader from '../../presentation/ui/btn-loader/BtnLoader';
import ValidationService from '../../../services/validationService';
import DataSchemasService from '../../../services/dataSchemasService';
import {sendMessage, fetchContact, contactReset} from '../../../redux/actions/contactActions';


const Contact = props => {
    const {language} = props;
    const dispatch = useDispatch();
    const appService = new AppService();
    const schemaService = new DataSchemasService();
    const validationService = new ValidationService();
    const markupService = new MarkupService(language);
    const contactActions =  useSelector(state => state.getContact);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [contact, setContact] = useState(schemaService.contactSchema());
    const [textarea, setTextarea] = useState(schemaService.textareaSchema());
    const [isMessageFormValid, setIsMessageFormValid] = useState(false);

    const {error, message, loading} = contactActions;
    const response = error || message ? error || message.response : null;

    useEffect(() => {
        dispatch(fetchContact(setErrorPopupOpen));
    }, [dispatch]);

    const submitHandler = e => e.preventDefault();

    const sendEmailHandler = () => {
        dispatch(
            sendMessage(
                contact.name.value,
                contact.email.value,
                textarea.message.value,
                setErrorPopupOpen
            )
        );

        setIsMessageFormValid(false);
        setContact(schemaService.contactSchema());
        setTextarea(schemaService.textareaSchema());
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
        setTextarea(schema);
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
                        className={!type ? 'input' : (!control.touched ? 'input' :
                            validationService.isInvalid(control.valid, control.touched, !!control.validation)
                                ? 'input error' : 'input success')}
                        onChange={e => validationService.changeHandler(e, name, contact, setStateHandler)}
                    />
                </div>
            </div>
        );
    };

    const renderTextarea = (idx, name, control) =>
        <div className={'contact-form__row'} key={idx + name}>
            <div className={'contact-form__name'}>{control.label}</div>
            <div className={'contact-form__value'}>
                <Textarea
                    value={control.value}
                    className={'input textarea'}
                    onChange={e => validationService.changeHandler(e, name, textarea, setMessageStateHandler)}
                />
            </div>
        </div>
    ;

    return(
        <>
            <div className={'contact-form'}>
                <div className={'contact-form__header'}>
                    <div className={'contact-form__header--title'}>
                        {markupService.languageContactToggle('main')}
                    </div>
                </div>

                <div className={'contact-form__main'}>
                    <form onClick={e => submitHandler(e)}>
                        {appService.objectIteration(contact, renderInput)}
                        {appService.objectIteration(textarea, renderTextarea)}
                    </form>
                </div>
                <div className={'contact-form__footer'}>
                    <div className={'contact-form__cell'}>
                        <Button
                            onClick={sendEmailHandler}
                            disabled={!isFormValid || !isMessageFormValid}
                            className={!isFormValid || !isMessageFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                        >
                            <span>{!loading ? markupService.languageButtonToggle('send') : <BtnLoader/>}</span>
                        </Button>
                    </div>
                </div>
            </div>

            <SignalPopup
                error={error}
                type={'contact'}
                message={message}
                language={language}
                reset={contactReset}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>{error || message ? appService.budgetResponseToggle(response, language) : null}</span>
                </div>
            </SignalPopup>
        </>
    );
};


Contact.propTypes = {
    language: PropTypes.string,
};


export default Contact;