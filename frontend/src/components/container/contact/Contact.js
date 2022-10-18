import Context from '../../../context/Context';
import useContact from '../../../hooks/contact-hook';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../presentation/ui/input/Input';
import useIsOpened from '../../../hooks/open-alert-hook';
import Button from '../../presentation/ui/button/Button';
import useValidation from '../../../hooks/validation-hook';
import Textarea from '../../presentation/ui/textarea/Textarea';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../presentation/ui/btn-loader/BtnLoader';
import React, {memo, useMemo, useEffect, useContext, useCallback} from 'react';
import {actionToContact, actionToSendingMessage, contactResetStateHandler} from '../../../redux/slice/сontactSlice';

const Contact = memo(() => {
    const type = 'contact';
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const contactActions =  useSelector(state => state.contact);
    const {appService, markupService, storageService,
        validationService, dataSchemasService} = useContext(Context);
    const {contact, textarea, setContact, setTextarea, isMessageFormValid,
        setIsMessageFormValid} = useContact(dataSchemasService.textareaSchema(), dataSchemasService.contactSchema())
    ;

    const {error, message, loading} = contactActions;
    const response = error || message ||  message === 'Not authorized to access this router' ? error || message?.response || message : null;

    const contactData = useMemo(() => {return {type}}, [type]);
    const messageData = useMemo(() => {return {
        type,
        name: contact?.name?.value,
        email: contact?.email?.value,
        message: textarea?.message?.value,
    }}, [type, contact?.name?.value, contact?.email?.value, textarea?.message?.value]);

    useEffect(() => {
        dispatch(actionToContact(contactData));
    }, [dispatch, contactData]);

    const sendingMessageHandler = () => {
        setIsMessageFormValid(false);
        dispatch(actionToSendingMessage(messageData));
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

    const setStateHandler = useCallback(schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '';
        });
        setContact(schema);
        setIsFormValid(isFormValidLocal);
    }, [setContact, setIsFormValid]);

    const setMessageStateHandler = useCallback(schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '';
        });
        setTextarea(schema);
        setIsMessageFormValid(isFormValidLocal);
    }, [setTextarea, setIsMessageFormValid]);

    const renderInput = useCallback((name, control) => (
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
    ), [contact, setStateHandler, validationService]);

    const renderTextarea = useCallback((name, control) => (
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
    ), [textarea, validationService, setMessageStateHandler]);

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || message ? appService.budgetResponse()[response] : null}
    </AlertPopup>;

    const disabledForButton = useMemo(() => !isFormValid || !isMessageFormValid, [isFormValid, isMessageFormValid]);
    const contactRender = useMemo(() => appService.objectIteration(contact, renderInput), [contact, appService, renderInput]);
    const textareaRender = useMemo(() => appService.objectIteration(textarea, renderTextarea), [textarea, appService, renderTextarea]);
    const classNameForButton = useMemo(() => !isFormValid || !isMessageFormValid ? 'auth__btn-off' : 'auth__btn-on', [isFormValid, isMessageFormValid]);

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
                        {contactRender}
                        {textareaRender}
                    </form>
                </div>
                <div className={'contact__footer'}>
                    <div className={'contact__btn-box'}>
                        <Button
                            onClick={sendingMessageHandler}
                            disabled={disabledForButton}
                            className={classNameForButton}
                        >
                            <span>{!loading ? markupService.contactHeadingTemplate()['send'] : <BtnLoader/>}</span>
                        </Button>
                    </div>
                </div>
            </div>

            {useIsOpened(response) && alert}
        </>
    );
});

export default Contact;