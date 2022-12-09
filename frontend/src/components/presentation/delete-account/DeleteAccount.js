import React, {memo, useContext} from 'react';
import {ContextData} from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import Settings from '../../container/form/settings/Settings';

const DeleteAccount = memo(() => {
    const {markupService, dataSchemasService} = ContextData();
    const {deleteAcc, setDeleteAcc} = useSettings(null, null, dataSchemasService.deleteAccountSchema());

    return (
        <Settings
            deleteAcc={deleteAcc}
            type={'delete-account'}
            setDeleteAcc={setDeleteAcc}
            selected={markupService.settingsTemplate()[2].name}
        />
    );
});

export default DeleteAccount;