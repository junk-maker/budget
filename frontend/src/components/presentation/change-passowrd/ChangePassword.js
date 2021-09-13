import PropTypes from 'prop-types';
import React, {useState} from 'react';
import MarkupService from '../../../services/markupService';
import DataSchemasService from '../../../services/dataSchemasService';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const ChangePassword = props => {
    const {language} = props;
    const schemaService = new DataSchemasService();
    const markupService = new MarkupService(language);
    const [password, setPassword] = useState(schemaService.changePasswordSchema());

    return(
        <SettingsForm
            password={password}
            language={language}
            type={'change-password'}
            setPassword={setPassword}
            selected={markupService.settingsPattern()[1].name}
        />
    );
};


ChangePassword.propTypes = {
    language: PropTypes.string,
};


export default ChangePassword;