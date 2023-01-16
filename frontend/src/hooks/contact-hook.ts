import {useState} from 'react';
import {UseContactInterface} from './hooks.interface';
import {TextareaSchemaInterface, ContactSchemaInterface} from '../services/dataSchemesService/data.schemes.interface';

const useContact = (textForm: TextareaSchemaInterface, contactForm: ContactSchemaInterface): UseContactInterface => {
    const [textarea, setTextarea] = useState<TextareaSchemaInterface>(textForm);
    const [contact, setContact] = useState<ContactSchemaInterface>(contactForm);
    const [isMessageFormValid, setIsMessageFormValid] = useState<boolean>(false);

    return {
        contact,
        textarea,
        setContact,
        setTextarea,
        isMessageFormValid,
        setIsMessageFormValid,
    };
};

export default useContact;