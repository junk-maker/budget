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
import {fetchContact, sendingMessage, contactResetStateHandler} from '../../../redux/actions/contactActions';


const Contact = () => {
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const contactActions =  useSelector(state => state.getContact);
    const {appService, markupService, storageService,
        validationService, dataSchemasService} = useContext(Context);
    const {contact, textarea, setContact, setTextarea, isMessageFormValid,
        setIsMessageFormValid} = useContact(dataSchemasService.textareaSchema(), dataSchemasService.contactSchema())
    ;

    const {error, message, loading} = contactActions;
    const response = error || message ||  message === 'Not authorized to access this router' ? error || message?.response || message : null;

    useEffect(() => dispatch(fetchContact()), [dispatch]);

    const sendingMessageHandler = () => {
        dispatch(
            sendingMessage(
                contact.name.value,
                contact.email.value,
                textarea.message.value,
            )
        );
        setIsMessageFormValid(false);
    };

    const responseCloseHandler = () => {
        window.location.reload();
        dispatch(contactResetStateHandler());
        storageService.removeItem('authToken');
    };

    const resetStateHandler = () => {
        dispatch(contactResetStateHandler());
        setContact(dataSchemasService.contactSchema());
        setTextarea(dataSchemasService.textareaSchema());
    };

    const alertResetStateHandler = () => 
        error || message === 'Not authorized to access this router' ? responseCloseHandler() : resetStateHandler();

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '';
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

    const renderInput = (name, control) => (
        <div className={'contact__row'} key={control.id + name}>
            <div className={'contact__name'}>{control.label}</div>
            <div className={'contact__value'}>
                <Input
                    className={'input'}
                    type={control.type}
                    value={control.value}
                    onChange={e => validationService.changeHandler(e, name, contact, setStateHandler)}
                />
            </div>
        </div>
    );

    const renderTextarea = (name, control) => (
        <div className={'contact__row'} key={control.id + name}>
            <div className={'contact__name'}>{control.label}</div>
            <div className={'contact__value'}>
                <Textarea
                    value={control.value}
                    className={'input textarea'}
                    onChange={e => validationService.changeHandler(e, name, textarea, setMessageStateHandler)}
                />
            </div>
        </div>
    );

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || message ? appService.budgetResponse()[response] : null}
    </AlertPopup>;

    return (
        <>
            <div className={'contact'}>
                <div className={'contact__header'}>
                    <div className={'contact__header-title'}>
                        {markupService.contactHeadingTemplate()['title']}
                    </div>
                </div>

                <div className={'contact__main'}>
                    <form onClick={e => e.preventDefault()}>
                        {appService.objectIteration(contact, renderInput)}
                        {appService.objectIteration(textarea, renderTextarea)}
                    </form>
                </div>
                <div className={'contact__footer'}>
                    <div className={'contact__btn-box'}>
                        <Button
                            onClick={sendingMessageHandler}
                            disabled={!isFormValid || !isMessageFormValid}
                            className={!isFormValid || !isMessageFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                        >
                            <span>{!loading ? markupService.contactHeadingTemplate()['send'] : <BtnLoader/>}</span>
                        </Button>
                    </div>
                </div>
            </div>

            {useIsOpened(response) && alert}
        </>
    );
};


export default Contact;