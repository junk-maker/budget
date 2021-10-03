import {useState} from 'react';

const useSettings = (e, p, d) => {
    const [email, setEmail] = useState(e);
    const [password, setPassword] = useState(p);
    const [deleteAcc, setDeleteAcc] = useState(d);

    return {
        email,
        setEmail,
        password,
        deleteAcc,
        setPassword,
        setDeleteAcc
    };
};

export default useSettings;