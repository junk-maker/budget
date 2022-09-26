import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import ChangeEmail from '../change-email/ChangeEmail';
import DeleteAccount from '../delete-account/DeleteAccount';
import ChangePassword from '../change-passowrd/ChangePassword';

const Settings = memo(() => {
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

    return (<section className={'settings'}>{settingsList[params.list]['description']}</section>);
});

Settings.propTypes = {
    match: PropTypes.object,
};

export default Settings;
