import {useState} from 'react';

const useOpen= () => {
    const [popupOpen, setPopupOpen] = useState<string>('');
    const [faqPopupOpen, setFaqPopupOpen] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [valuePopupOpen, setValuePopupOpen] = useState<boolean>(false);
    const [removePopupOpen, setRemovePopupOpen] = useState<boolean>(false);
    const [datepickerPopupOpen, setDatepickerPopupOpen] = useState<boolean>(false);

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