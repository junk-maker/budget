import React, {useState} from 'react';
import SettingsForm from '../../container/form/settings-form/SettingsForm';
import DataSchemasService from '../../../services/dataSchemasService';


const DeleteAccount = () => {
    const schema = new DataSchemasService();
    const [deleteAcc, setDeleteAcc] = useState(schema.deleteAccountSchema());

    return(
        <SettingsForm
            deleteAcc={deleteAcc}
            type={'delete-account'}
            setDeleteAcc={setDeleteAcc}
            selected={schema.settingsSchema()[2].name}
        />
    );
};


export default DeleteAccount;