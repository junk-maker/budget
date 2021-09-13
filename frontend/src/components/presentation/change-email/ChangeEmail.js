import PropTypes from 'prop-types';
import React, {useState} from 'react';
import MarkupService from '../../../services/markupService';
import DataSchemasService from '../../../services/dataSchemasService';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const ChangeEmail = props => {
    const {language} = props;
    const schemaService = new DataSchemasService();
    const markupService = new MarkupService(language);
    const [email, setEmail] = useState(schemaService.changeEmailSchema());
    return(
        <SettingsForm
            email={email}
            language={language}
            setEmail={setEmail}
            type={'change-email'}
            selected={markupService.settingsPattern()[0].name}
        />
    );
};


ChangeEmail.propTypes = {
    language: PropTypes.string,
};


export default ChangeEmail;