import {useState} from 'react';

const useEdit= () => {
    const [edit, setEdit] = useState(null);

    return {
        edit,
        setEdit,
    }
};

export default useEdit;