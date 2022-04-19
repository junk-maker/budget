import React, {useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const DeleteAccount = () => {
    const {markupService, dataSchemesService} = useContext(Context);
    const {deleteAcc, setDeleteAcc} = useSettings(null, null, dataSchemesService.deleteAccountScheme());

    return (
        <SettingsForm
            deleteAcc={deleteAcc}
            type={'delete-account'}
            setDeleteAcc={setDeleteAcc}
            selected={markupService.settingsTemplate()[2].name}
        />
    );
};


export default DeleteAccount;