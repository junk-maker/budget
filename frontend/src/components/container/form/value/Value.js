import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import Context from '../../../../context/Context';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validation-hook';
import useDatepicker from '../../../../hooks/datepicker-hook';
import Dropdown from '../../../presentation/ui/dropdown/Dropdown';
import {addItem, editItem} from '../../../../redux/actions/budgetActions';


const Value = props => {
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {appService, markupService, validationService} = useContext(Context);
    const {id, end, edit, year, start, month, value, toggle, setEdit, heading, setValue, 
        currency, dropdown, prevValue, setCurrency, setPopupOpen, setPrevValue, prevCurrency, setPrevCurrency} = props
    ;
    const {endDate, startDate, selectedMonth} = useDatepicker(appService);
    
    const addHandler = () => {
        dispatch(
            addItem(
                endDate, 
                startDate, 
                selectedMonth.year, 
                selectedMonth.monthIndex,
                value,
                currency,
                edit.amount.value,
                edit.category.value,
                edit.description.value,
            )
        );

        setValue(null);
        setCurrency(null);
        setIsFormValid(prev => !prev);
        setEdit(markupService.addTemplate(true));
    };

    const editHandler = () => {
        dispatch(
            editItem(
                id,
                end,
                year,
                start,
                month,  
                value,
                currency,
                edit.amount.value,
                edit.category.value,
                edit.description.value
            )
        );
        setPopupOpen('out');
        if(isFormValid) {
            setPrevValue(value);
            setPrevCurrency(currency);
            setIsFormValid(prev => !prev);
        } else {
            setPrevValue(value);
            setPrevCurrency(currency);
        };
    };

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal
                && schema[name].value !== '' && schema['amount'].value > 0 && schema['amount'].value !== '-0'
            ;
        });
        setEdit(schema);
        setIsFormValid(isFormValidLocal);
    };

    const createInput = (name, control) => (
        <Input
            key={control.id}
            type={control.type}
            value={control.value}
            className={control.className}
            placeholder={control.placeholder}
            onChange={e => validationService.changeHandler(e, name, edit, setStateHandler)}
        />
    );

    const createDropdown = (name, control) => (
        <React.Fragment key={control.id + name}>
            <Dropdown
                name={name}
                value={value}
                toggle={toggle}
                setValue={setValue}
                currency={currency}
                appService={appService}
                setCurrency={setCurrency}
                options={control.options}
                markupService={markupService}
                placeholder={markupService.budgetHeadingTemplate()['dropdown']}
            />
        </React.Fragment>
    );

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


Value.propTypes = {
    end: PropTypes.any,
    year: PropTypes.any,
    start: PropTypes.any,
    month: PropTypes.any,
    id: PropTypes.string,
    toggle: PropTypes.bool,
    edit: PropTypes.object,
    value: PropTypes.object,
    setEdit: PropTypes.func,
    setValue: PropTypes.func,
    heading: PropTypes.string,
    dropdown: PropTypes.object,
    currency: PropTypes.object,
    setCurrency: PropTypes.func,
    prevValue: PropTypes.object,
    setPopupOpen: PropTypes.func,
    setPrevValue: PropTypes.func,
    prevCurrency: PropTypes.object,
    setPrevCurrency: PropTypes.func,
};


export default Value;