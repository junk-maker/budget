import {useState} from 'react';
import {UseValidationInterface} from './hooks.interface';

const useValidation = (): UseValidationInterface => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    return {isFormValid, setIsFormValid,};
};

export default useValidation;