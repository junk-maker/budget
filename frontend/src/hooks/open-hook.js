import {useState} from 'react';

const useOpen= () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [valuePopupOpen, setValuePopupOpen] = useState(false);
    const [removePopupOpen, setRemovePopupOpen] = useState(false);
    const [datepickerPopupOpen, setDatepickerPopupOpen] = useState(false);

    return {
        dropdownOpen, 
        valuePopupOpen, 
        removePopupOpen, 
        setDropdownOpen, 
        setValuePopupOpen, 
        setRemovePopupOpen,
        datepickerPopupOpen,
        setDatepickerPopupOpen,
    };
};

export default useOpen;