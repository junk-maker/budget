import React from 'react';
import AddForm from '../../container/form/add-form/AddForm';
import AddPopup from '../../container/popup/AddPopup';


const AddItem = props => {
    const {active, appService, setActive, addPopupOpen, autoClosing, setAddPopupOpen, setErrorPopupOpen} = props;
    return(
        <AddPopup
            active={active}
            service={appService}
            setActive={setActive}
            addPopupOpen={addPopupOpen}
            setAddPopupOpen={setAddPopupOpen}
        >
            <AddForm
                autoClosing={autoClosing}
                setErrorPopupOpen={setErrorPopupOpen}/>
        </AddPopup>
    );
};


export default AddItem;