import {useState} from 'react';

const useHeading= () => {
    const [heading , setHeading] = useState('');

    return {
        heading,
        setHeading,
    }
};

export default useHeading;