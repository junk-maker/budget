import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {ContextData} from '../../../../context/Context';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validation-hook';
import useDatepicker from '../../../../hooks/datepicker-hook'
import Dropdown from '../../../presentation/ui/dropdown/Dropdown';
import React, {memo, useMemo, useContext, useCallback} from 'react';
import {actionToAddItem, actionToEditItem} from '../../../../redux/slice/budgetSlice';

const Value = memo(props => {
    const dispatch = useDispatch();
    const addItemType = 'add-item';
    const editItemType = 'edit-item';
    const {isFormValid, setIsFormValid} = useValidation();
    const {appService, markupService, validationService} = ContextData();
    const {id, end, edit, year, start, month, value, toggle, setEdit, heading, setValue, 
        currency, dropdown, prevValue, setCurrency, setPopupOpen, setPrevValue, prevCurrency, setPrevCurrency} = props
    ;
    const {endDate, startDate, selectedMonth} = useDatepicker(appService);

    const addItemData = useMemo(() => {return {
        value,
        currency,
        end: endDate,
        start: startDate,
        type: addItemType,
        year: selectedMonth?.year,
        amount: edit?.amount?.value,
        category: edit?.category?.value,
        month: selectedMonth?.monthIndex,
        description: edit?.description?.value,
    }}, [value, endDate, currency, startDate, selectedMonth?.year, edit?.amount?.value, edit?.category?.value, selectedMonth?.monthIndex, edit?.description?.value]);
    
    const editItemData = useMemo(() => {return {
        id,
        end,
        year,
        start,
        month,  
        value,
        currency,
        type: editItemType,
        amount: edit?.amount?.value,
        category: edit?.category?.value,
        description: edit?.description?.value,
    }}, [id, end, year, start, month, value, currency, edit?.amount?.value, edit?.category?.value, edit?.description?.value]);

    const addHandler = useCallback(() => {
        setValue(null);
        setCurrency(null);
        setIsFormValid(prev => !prev);
        dispatch(actionToAddItem(addItemData));
        setEdit(markupService.addTemplate(true));
    }, [dispatch, setEdit, setValue,  setCurrency, addItemData, markupService, setIsFormValid]);

    const editHandler = useCallback(() => {
        setPopupOpen('out');
        dispatch(actionToEditItem(editItemData));

        if(isFormValid) {
            setPrevValue(value);
            setPrevCurrency(currency);
            setIsFormValid(prev => !prev);
        } else {
            setPrevValue(value);
            setPrevCurrency(currency);
        };
    }, [value, dispatch, currency, editItemData, isFormValid, setPrevValue, setIsFormValid, setPopupOpen, setPrevCurrency]);

    const setStateHandler = useCallback(schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal
                && schema[name].value !== '' && schema['amount'].value > 0 && schema['amount'].value !== '-0'
            ;
        });
        setEdit(schema);
        setIsFormValid(isFormValidLocal);
    }, [setEdit, setIsFormValid]);

    const createInput = useCallback((name, control) => (
        <Input
            key={control.id}
            type={control.type}
            value={control.value}
            className={control.className}
            placeholder={control.placeholder}
            onChange={e => validationService.changeHandler(e, name, edit, setStateHandler)}
        />
    ), [edit, setStateHandler, validationService]);

    const createDropdown = useCallback((name, control) => (
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
    ), [value, toggle, currency, setValue, appService, setCurrency, markupService]);

    const classNameForButton = useMemo(() => toggle ? (!isFormValid || !value || !currency ? 'auth__btn-off' : 'auth__btn-on') :
        !isFormValid && (value === prevValue) && (currency === prevCurrency) ? 'auth__btn-off' : 'auth__btn-on', [value, toggle, currency, prevValue, prevCurrency, isFormValid])
    ;

    const disabledForButton = useMemo(() =>  toggle ? !isFormValid || !value || !currency :
        !isFormValid &&  (value === prevValue) && (currency === prevCurrency), [value, toggle, currency, prevValue, prevCurrency, isFormValid])
    ;

    const onClickForButton = useMemo(() => toggle ? addHandler : editHandler, [toggle, addHandler, editHandler]);
    const editRender = useMemo(() => appService.objectIteration(edit, createInput), [edit, createInput, appService]);
    const dropdownRender = useMemo(() => appService.objectIteration(dropdown, createDropdown), [dropdown, appService, createDropdown]);

    return (
        <form onClick={e => e.preventDefault()}>
            <div className={'add'}>
                <div className={'add__container'}>
                    <div className={'add__raw add__space'}>
                        {dropdownRender}
                    </div>

                    <div className={'add__raw add__space'}>
                        {editRender}
                    </div>

                </div>

                <div className={'add__btn'}>
                    <Button
                        onClick={onClickForButton}
                        disabled={disabledForButton}
                        className={classNameForButton}
                    >
                        <span>{heading}</span>
                    </Button>
                </div>
            </div>
        </form>
    );
});

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