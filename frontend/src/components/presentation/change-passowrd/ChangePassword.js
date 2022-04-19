import React, {useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import SettingsForm from '../../container/form/settings-form/SettingsForm';




const ChangePassword = () => {
    const {markupService, dataSchemesService} = useContext(Context);
    const {password, setPassword} = useSettings(null, dataSchemesService.changePasswordScheme(), null);

    return (
        <SettingsForm
            password={password}
            type={'change-password'}
            setPassword={setPassword}
            selected={markupService.settingsTemplate()[1].name}
        />
    );
};


export default ChangePassword;