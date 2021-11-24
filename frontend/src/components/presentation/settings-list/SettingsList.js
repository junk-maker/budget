import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import ChangeEmail from '../change-email/ChangeEmail';
import DeleteAccount from '../delete-account/DeleteAccount';
import ChangePassword from '../change-passowrd/ChangePassword';


const SettingsList = () => {
    const params = useParams();

    const settingsList = {
        'change-email': {
            description: <ChangeEmail/>
        },
        'change-password': {
            description: <ChangePassword/>
        },
        'delete-account': {
            description: <DeleteAccount/>
        }
    };

    return(
        <div>{settingsList[params.list]['description']}</div>
    );
};


SettingsList.propTypes = {
    match: PropTypes.object,
};


export default SettingsList;
