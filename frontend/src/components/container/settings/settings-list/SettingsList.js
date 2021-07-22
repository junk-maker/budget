import React from 'react';
import ChangeEmail from './setting/change-email/ChangeEmail';
import DeleteAccount from './setting/delete-account/DeleteAccount';
import ChangePassword from './setting/change-passowrd/ChangePassword';


const SettingsList = props => {
    const list = props.match.params.list;
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
        <div>{settingsList[list]['description']}</div>
    );
};


export default SettingsList;
