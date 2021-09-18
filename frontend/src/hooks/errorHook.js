import {useState} from 'react';

const useError = () => {
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    return {
        errorPopupOpen,
        setErrorPopupOpen
    }
}

export default useError;