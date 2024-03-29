import React, {memo, useContext} from 'react';
import {ContextData} from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import Settings from '../../container/form/settings/Settings';

const ChangePassword = memo(() => {
    const {markupService, dataSchemasService} = ContextData();
    const {password, setPassword} = useSettings(null, dataSchemasService.changePasswordSchema(), null);
    
    return (
        <Settings
            password={password}
            type={'change-password'}
            setPassword={setPassword}
            selected={markupService.settingsTemplate()[1].name}
        />
    );
});

export default ChangePassword;