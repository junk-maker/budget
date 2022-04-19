import React, {useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const ChangeEmail = () => {
    const {markupService, dataSchemesService} = useContext(Context);
    const {email, setEmail} = useSettings(dataSchemesService.changeEmailScheme(), null, null);

    return (
        <SettingsForm
            email={email}
            setEmail={setEmail}
            type={'change-email'}
            selected={markupService.settingsTemplate()[0].name}
        />
    );
};


export default ChangeEmail;