import Context from '../../../context/Context';
import React, {useEffect, useContext} from 'react';
import useContact from '../../../hooks/contact-hook';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../presentation/ui/input/Input';
import useIsOpened from '../../../hooks/open-alert-hook';
import Button from '../../presentation/ui/button/Button';
import useValidation from '../../../hooks/validation-hook';
import Textarea from '../../presentation/ui/textarea/Textarea';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../presentation/ui/btn-loader/BtnLoader';
import {sendMessage, fetchContact, contactResetStateHandler} from '../../../redux/actions/contactActions';


const Contact = () => {
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const contactActions =  useSelector(state => state.getContact);
    const {appService, markupService, storageService,
        validationService, dataSchemasService} = useContext(Context);
    const {contact, textarea, setContact, setTextarea, isMessageFormValid,
        setIsMessageFormValid} = useContact(dataSchemasService.textareaSchema(), dataSchemasService.contactSchema());

    const {error, message, loading} = contactActions;
    const response = error || message ? error || message?.response : null;

    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);

    const sendMessageHandler = () => {
        dispatch(
            sendMessage(
                contact.name.value,
                contact.email.value,
                textarea.message.value,
            )
        );

        setIsMessageFormValid(false);
        setContact(dataSchemasService.contactSchema());
        setTextarea(dataSchemasService.textareaSchema());
    };

    const responseCloseHandler = () => {
        window.location.reload();
        dispatch(contactResetStateHandler());
        storageService.removeItem('authToken');
    };

    const alertResetStateHandler = () => {
        message ? dispatch(contactResetStateHandler()) : responseCloseHandler()
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

    const renderInput = (name, control) => {
        let type = control.type === 'email';
        return(
            <div className={'contact-form__row'} key={control.id + name}>
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

    const renderTextarea = (name, control) =>
        <div className={'contact-form__row'} key={control.id + name}>
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

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || message ? appService.budgetResponseSwitch(response) : null}
    </AlertPopup>;

    return(
        <>
            <div className={'contact-form'}>
                <div className={'contact-form__header'}>
                    <div className={'contact-form__header--title'}>
                        {markupService.toggleContactLanguage('main')}
                    </div>
                </div>

                <div className={'contact-form__main'}>
                    <form onClick={e => e.preventDefault()}>
                        {appService.objectIteration(contact, renderInput)}
                        {appService.objectIteration(textarea, renderTextarea)}
                    </form>
                </div>
                <div className={'contact-form__footer'}>
                    <div className={'contact-form__cell'}>
                        <Button
                            onClick={sendMessageHandler}
                            disabled={!isFormValid || !isMessageFormValid}
                            className={!isFormValid || !isMessageFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                        >
                            <span>{!loading ? markupService.toggleButtonLanguage('send') : <BtnLoader/>}</span>
                        </Button>
                    </div>
                </div>
            </div>
            {useIsOpened(response) && alert}
        </>
    );
};


export default Contact;