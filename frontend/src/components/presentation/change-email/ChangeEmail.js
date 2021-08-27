import React, {useState} from 'react';
import MarkupService from '../../../services/markupService';
import DataSchemasService from '../../../services/dataSchemasService';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const ChangeEmail = () => {
    const markup = new MarkupService();
    const schema = new DataSchemasService();
    const [email, setEmail] = useState(schema.changeEmailSchema());
    return(
        <SettingsForm
            email={email}
            setEmail={setEmail}
            type={'change-email'}
            selected={markup.settingsPattern()[0].name}
        />
    );
};


export default ChangeEmail;