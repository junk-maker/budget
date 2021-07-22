import React, {useState} from 'react';
import SettingsForm from '../../../../form/settings-form/SettingsForm';
import DataSchemasService from '../../../../../../services/dataSchemasService';


const ChangeEmail = () => {
    const schema = new DataSchemasService();
    const [email, setEmail] = useState(schema.changeEmailSchema());
    return(
        <SettingsForm
            email={email}
            setEmail={setEmail}
            type={'change-email'}
            selected={schema.settingsSchema()[0].name}
        />
    );
};


export default ChangeEmail;