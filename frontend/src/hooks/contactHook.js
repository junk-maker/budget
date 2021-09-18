import {useState} from 'react';

const useContact = (textForm, contactForm) => {
    const [textarea, setTextarea] = useState(textForm);
    const [contact, setContact] = useState(contactForm);
    const [isMessageFormValid, setIsMessageFormValid] = useState(false);

    return {
        contact,
        textarea,
        setContact,
        setTextarea,
        isMessageFormValid,
        setIsMessageFormValid
    }
};

export default useContact;