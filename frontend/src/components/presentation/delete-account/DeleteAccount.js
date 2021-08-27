import React, {useState} from 'react';
import MarkupService from '../../../services/markupService';
import DataSchemasService from '../../../services/dataSchemasService';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const DeleteAccount = () => {
    const markup = new MarkupService();
    const schema = new DataSchemasService();
    const [deleteAcc, setDeleteAcc] = useState(schema.deleteAccountSchema());

    return(
        <SettingsForm
            deleteAcc={deleteAcc}
            type={'delete-account'}
            setDeleteAcc={setDeleteAcc}
            selected={markup.settingsPattern()[2].name}
        />
    );
};


export default DeleteAccount;