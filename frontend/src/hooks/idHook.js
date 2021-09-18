import {useState} from 'react';

const useId= () => {
    const [id, setId] = useState(null);

    return {
        id,
        setId,
    }
};

export default useId;