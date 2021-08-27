import React, {useState} from 'react';
import MarkupService from '../../../services/markupService';
import DataSchemasService from '../../../services/dataSchemasService';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const ChangePassword = () => {
    const markup = new MarkupService();
    const schema = new DataSchemasService();
    const [password, setPassword] = useState(schema.changePasswordSchema());

    return(
        <SettingsForm
            password={password}
            type={'change-password'}
            setPassword={setPassword}
            selected={markup.settingsPattern()[1].name}
        />
    );
};


export default ChangePassword;