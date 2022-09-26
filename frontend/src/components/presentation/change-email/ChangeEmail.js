import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';
import useSettings from '../../../hooks/settings-hook';
import Settings from '../../container/form/settings/Settings';

const ChangeEmail = memo(() => {
    const {markupService, dataSchemasService} = useContext(Context);
    const {email, setEmail} = useSettings(dataSchemasService.changeEmailSchema(), null, null);

    return (
        <Settings
            email={email}
            setEmail={setEmail}
            type={'change-email'}
            selected={markupService.settingsTemplate()[0].name}
        />
    );
});

export default ChangeEmail;