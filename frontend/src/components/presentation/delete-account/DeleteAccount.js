import React, {useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import Settings from '../../container/form/settings/Settings';


const DeleteAccount = () => {
    const {markupService, dataSchemasService} = useContext(Context);
    const {deleteAcc, setDeleteAcc} = useSettings(null, null, dataSchemasService.deleteAccountSchema());

    return (
        <Settings
            deleteAcc={deleteAcc}
            type={'delete-account'}
            setDeleteAcc={setDeleteAcc}
            selected={markupService.settingsTemplate()[2].name}
        />
    );
};


export default DeleteAccount;