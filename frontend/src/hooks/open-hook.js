import {useState} from 'react';

const useOpen= () => {
    const [popupOpen, setPopupOpen] = useState('');
    const [faqPopupOpen, setFaqPopupOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [valuePopupOpen, setValuePopupOpen] = useState(false);
    const [removePopupOpen, setRemovePopupOpen] = useState(false);
    const [datepickerPopupOpen, setDatepickerPopupOpen] = useState(false);

    return {
        popupOpen, 
        dropdownOpen,
        setPopupOpen,
        faqPopupOpen,
        valuePopupOpen, 
        removePopupOpen, 
        setDropdownOpen,
        setFaqPopupOpen, 
        setValuePopupOpen,
        setRemovePopupOpen,
        datepickerPopupOpen,
        setDatepickerPopupOpen,
    };
};

export default useOpen;