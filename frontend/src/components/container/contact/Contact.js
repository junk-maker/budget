import SignalPopup from '../popup/SignalPopup';
import Context from '../../../context/Context';
import useError from '../../../hooks/errorHook';
import React, {useEffect, useContext} from 'react';
import useContact from '../../../hooks/contactHook';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../presentation/ui/input/Input';
import Button from '../../presentation/ui/button/Button';
import useValidation from '../../../hooks/validationHook';
import Textarea from '../../presentation/ui/textarea/Textarea';
import BtnLoader from '../../presentation/ui/btn-loader/BtnLoader';
import {sendMessage, fetchContact, contactReset} from '../../../redux/actions/contactActions';


const Contact = () => {
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {errorPopupOpen, setErrorPopupOpen} = useError();
    const contactActions =  useSelector(state => state.getContact);
    const {appService, markupService,
        validationService, dataSchemasService} = useContext(Context);
    const {contact, textarea, setContact, setTextarea, isMessageFormValid,
        setIsMessageFormValid} = useContact(dataSchemasService.textareaSchema(), dataSchemasService.contactSchema());

    const {error, message, loading} = contactActions;
    const response = error || message ? error || message.response : null;

    console.log('con')

    useEffect(() => {
        dispatch(fetchContact(setErrorPopupOpen));
        // return () => dispatch(fetchContact(setErrorPopupOpen));
    }, [dispatch, setErrorPopupOpen]);

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
        setContact(dataSchemasService.contactSchema());
        setTextarea(dataSchemasService.textareaSchema());
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
                reset={contactReset}
                appService={appService}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>{error || message ? appService.budgetResponseToggle(response) : null}</span>
                </div>
            </SignalPopup>
        </>
    );
};


export default Contact;