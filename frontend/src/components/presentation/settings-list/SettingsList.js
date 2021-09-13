import React from 'react';
import PropTypes from 'prop-types';
import ChangeEmail from '../change-email/ChangeEmail';
import DeleteAccount from '../delete-account/DeleteAccount';
import ChangePassword from '../change-passowrd/ChangePassword';


const SettingsList = props => {
    const {match, language} = props;

    const settingsList = {
        'change-email': {
            description: <ChangeEmail language={language}/>
        },
        'change-password': {
            description: <ChangePassword language={language}/>
        },
        'delete-account': {
            description: <DeleteAccount language={language}/>
        }
    };

    return(
        <div>{settingsList[match.params.list]['description']}</div>
    );
};


SettingsList.propTypes = {
    match: PropTypes.object,
    language: PropTypes.string,
};


export default SettingsList;
