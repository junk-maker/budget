import {useState} from 'react';
import {UseSettingsInterface, ChangeEmailInterface, ChangePasswordInterface, DeleteAccountInterface} from './hooks.interface';

const useSettings = (e: ChangeEmailInterface, p: ChangePasswordInterface, d: DeleteAccountInterface): UseSettingsInterface => {
    const [email, setEmail] = useState<ChangeEmailInterface>(e);
    const [password, setPassword] = useState<ChangePasswordInterface>(p);
    const [deleteAcc, setDeleteAcc] = useState<DeleteAccountInterface>(d);

    return {
        email,
        setEmail,
        password,
        deleteAcc,
        setPassword,
        setDeleteAcc,
    };
};

export default useSettings;