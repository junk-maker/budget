import PropTypes from 'prop-types';
import React, {useState} from 'react';
import MarkupService from '../../../services/markupService';
import DataSchemasService from '../../../services/dataSchemasService';
import SettingsForm from '../../container/form/settings-form/SettingsForm';


const DeleteAccount = props => {
    const {language} = props;
    const schemaService = new DataSchemasService();
    const markupService = new MarkupService(language);
    const [deleteAcc, setDeleteAcc] = useState(schemaService.deleteAccountSchema());

    return(
        <SettingsForm
            language={language}
            deleteAcc={deleteAcc}
            type={'delete-account'}
            setDeleteAcc={setDeleteAcc}
            selected={markupService.settingsPattern()[2].name}
        />
    );
};


DeleteAccount.propTypes = {
    language: PropTypes.string,
};


export default DeleteAccount;