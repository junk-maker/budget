import {useState} from 'react';

const useValidation = () => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    return {isFormValid, setIsFormValid,};
};

export default useValidation;