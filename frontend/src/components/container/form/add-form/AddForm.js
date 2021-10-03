import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import Context from '../../../../context/Context';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validation-hook';
import Dropdown from '../../../presentation/ui/dropdown/Dropdown';
import {addItem, editItem} from '../../../../redux/actions/budgetActions';


const AddForm = props => {
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {appService, markupService, validationService} = useContext(Context);
    const {id, edit, value, toggle, setEdit, heading, monthId,
        setValue, currency, dropdown, prevValue, setCurrency, setPrevValue, prevCurrency, setPrevCurrency} = props;

    const addHandler = () => {
        dispatch(
            addItem(
                value,
                monthId,
                currency,
                edit.amount.value,
                edit.category.value,
                edit.description.value,
            )
        );

        setValue(null);
        setCurrency(null);
        setIsFormValid(prev => !prev);
        setEdit(markupService.addPattern(true));
    };

    const editHandler = () => {
        dispatch(
            editItem(
                id,
                value,
                monthId,
                currency,
                edit.amount.value,
                edit.category.value,
                edit.description.value
            )
        );

        if(isFormValid) {
            setPrevValue(value);
            setPrevCurrency(currency);
            setIsFormValid(prev => !prev);
        } else {
            setPrevValue(value);
            setPrevCurrency(currency)
        }
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
        <form onClick={e => e.preventDefault()}>
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
                        disabled={
                            toggle ? !isFormValid || !value || !currency :
                            !isFormValid &&  (value === prevValue) && (currency === prevCurrency)
                        }
                        className={
                            toggle ? (!isFormValid || !value || !currency ? 'auth__btn-off' : 'auth__btn-on') :
                            !isFormValid && (value === prevValue) &&
                            (currency === prevCurrency) ? 'auth__btn-off' : 'auth__btn-on'
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
    monthId: PropTypes.number,
    dropdown: PropTypes.object,
    currency: PropTypes.object,
    setCurrency: PropTypes.func,
    prevValue: PropTypes.object,
    setPrevValue: PropTypes.func,
    prevCurrency: PropTypes.object,
    setPrevCurrency: PropTypes.func
};


export default AddForm;