import React, {useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const ChangeEmail = () => {
    const {markupService, dataSchemasService} = useContext(Context);
    const {email, setEmail} = useSettings(dataSchemasService.changeEmailSchema(), null, null);

    return(
        <SettingsForm
            email={email}
            setEmail={setEmail}
            type={'change-email'}
            selected={markupService.settingsPattern()[0].name}
        />
    );
};


export default ChangeEmail;