import React, {useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import SettingsForm from '../../container/form/settings-form/SettingsForm';




const ChangePassword = () => {
    const {markupService, dataSchemasService} = useContext(Context);
    const {password, setPassword} = useSettings(null, dataSchemasService.changePasswordSchema(), null);

    return (
        <SettingsForm
            password={password}
            type={'change-password'}
            setPassword={setPassword}
            selected={markupService.settingsPattern()[1].name}
        />
    );
};


export default ChangePassword;