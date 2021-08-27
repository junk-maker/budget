import React, {useState} from 'react';
import SettingsForm from '../../container/form/settings-form/SettingsForm';
import DataSchemasService from '../../../services/dataSchemasService';


const ChangePassword = () => {
    const schema = new DataSchemasService();
    const [password, setPassword] = useState(schema.changePasswordSchema());

    return(
        <SettingsForm
            password={password}
            type={'change-password'}
            setPassword={setPassword}
            selected={schema.settingsSchema()[1].name}
        />
    );
};


export default ChangePassword;