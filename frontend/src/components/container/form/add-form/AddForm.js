import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import AppService from '../../../../services/appService';
import Button from '../../../presentation/ui/button/Button';
import Dropdown from '../../../presentation/ui/dropdown/Dropdown';
import ValidationService from '../../../../services/validationService';
import DataSchemasService from '../../../../services/dataSchemasService';
import {addItem, editItem} from '../../../../redux/actions/budgetActions';


const AddForm = props => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const schema = new DataSchemasService();
    const validationService = new ValidationService();
    const [isFormValid, setIsFormValid] = useState(false);
    const {id, edit, value, toggle, dropdown, prevCurrency, setCurrency,
        setEdit, heading, setValue, currency, autoClosing, setErrorPopupOpen} = props;

    const submitHandler = e => {
        e.preventDefault();
    };

    const addHandler = () => {
        dispatch(
            addItem(
                value,
                currency,
                autoClosing,
                setErrorPopupOpen,
                edit.amount.value,
                edit.category.value,
                edit.description.value
            )
        );

        setValue(null);
        setCurrency(null);
        setIsFormValid(false);
        setEdit(schema.addSchema(true));
    };

    const editHandler = () => {
        autoClosing();
        dispatch(
            editItem(
                id,
                value,
                currency,
                setErrorPopupOpen,
                edit.amount.value,
                edit.category.value,
                edit.description.value
            )
        );
    };

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal
                && schema[name].value !== '' && schema['amount'].value > 0 && schema['amount'].value !== '-0'
        });
        setEdit(schema);
        setIsFormValid(isFormValidLocal);
    };

    const createInput = (idx, name, control) => {
        return (
            <Input
                key={idx + name}
                type={control.type}
                value={control.value}
                className={control.className}
                placeholder={control.placeholder}
                onChange={e => validationService.changeHandler(e, name, edit, setStateHandler)}
            />
        );
    };

    const createDropdown = (idx, name, control) => {
        return (
            <div className={'add__wrapper'} key={idx + name}>
                <Dropdown
                    currency={currency}
                    name={name}
                    value={value}
                    toggle={toggle}
                    setCurrency={setCurrency}
                    setValue={setValue}
                    options={control.options}
                />
            </div>
        );
    };

    return (
        <form onClick={e => submitHandler(e)}>
            <div className={'add'}>
                <div className={'add__container'}>
                    <div className={'add__raw add__space'}>
                        {appService.objectIteration(dropdown, createDropdown)}
                    </div>

                    <div className={'add__raw add__space'}>
                        {appService.objectIteration(edit, createInput)}
                    </div>

                </div>

                <div className={'add__btn'}>
                    <Button
                        onClick={toggle ? addHandler : editHandler}
                        disabled={toggle ? !isFormValid || !value || !currency : !isFormValid && currency === prevCurrency}
                        className={toggle ? (!isFormValid || !value || !currency ? 'auth__btn-off' : 'auth__btn-on') :
                            !isFormValid && currency === prevCurrency ? 'auth__btn-off' : 'auth__btn-on'
                        }
                    >
                        <span>{heading}</span>
                    </Button>
                </div>
            </div>
        </form>
    );
};


AddForm.propTypes = {
    id: PropTypes.string,
    toggle: PropTypes.bool,
    edit: PropTypes.object,
    value: PropTypes.object,
    setEdit: PropTypes.func,
    setValue: PropTypes.func,
    heading: PropTypes.string,
    dropdown: PropTypes.object,
    currency: PropTypes.object,
    autoClosing: PropTypes.func,
    setCurrency: PropTypes.func,
    prevCurrency: PropTypes.object,
    setErrorPopupOpen: PropTypes.func
};


export default AddForm;