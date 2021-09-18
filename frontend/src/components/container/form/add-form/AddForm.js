import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validationHook';
import Dropdown from '../../../presentation/ui/dropdown/Dropdown';
import {addItem, editItem} from '../../../../redux/actions/budgetActions';


const AddForm = props => {
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {id, date, edit, value, toggle, dropdown, appService,  prevCurrency, setCurrency,
        markupService, setEdit, heading, setValue, currency, autoClosing, setErrorPopupOpen, validationService} = props;

    const submitHandler = e => e.preventDefault();

    const addHandler = () => {
        dispatch(
            addItem(
                value,
                currency,
                autoClosing,
                setErrorPopupOpen,
                edit.amount.value,
                edit.category.value,
                edit.description.value,
                appService.currentMonth(date),
            )
        );

        setValue(null);
        setCurrency(null);
        setIsFormValid(false);
        setEdit(markupService.addPattern(true));
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

    const createInput = (name, control) =>
        <Input
            key={control.id}
            type={control.type}
            value={control.value}
            className={control.className}
            placeholder={control.placeholder}
            onChange={e => validationService.changeHandler(e, name, edit, setStateHandler)}
        />
    ;

    const createDropdown = (name, control) =>
        <div className={'add__wrapper'} key={control.id + name}>
            <Dropdown
                name={name}
                value={value}
                toggle={toggle}
                setValue={setValue}
                currency={currency}
                appService={appService}
                setCurrency={setCurrency}
                options={control.options}
                placeholder={appService.checkLanguage() ? 'Выбрать опцию' : 'Select an option'}
            />
        </div>
    ;

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
    appService: PropTypes.object,
    prevCurrency: PropTypes.object,
    markupService: PropTypes.object,
    setErrorPopupOpen: PropTypes.func,
    validationService: PropTypes.object
};


export default AddForm;