import {useState} from 'react';

const useValidation = () => {
    const [isFormValid, setIsFormValid] = useState(false);

    return {isFormValid, setIsFormValid};
};

export default useValidation;