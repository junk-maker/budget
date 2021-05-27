import React, {useState} from 'react';
import Input from '../../presentation/ui/input/Input';
import Button from '../../presentation/ui/button/Button';
import {ValidationService} from '../../../services/validationService';
import AppService from '../../../services/appService';
import Select from '../../presentation/ui/select/Select';
import {postBudget} from '../../../redux/actions/budgetActions';
import {useDispatch} from 'react-redux';


const AddData = props => {
    const {schema} = props;
    const app = new AppService();
    const validation = ValidationService;
    const [data, setData] = useState(schema);
    const [isFormValid, setIsFormValid] = useState(false);
    const [type, setType] = useState(true);
    const dispatch = useDispatch();

    // const submitHandler = event => {
    //     event.preventDefault();
    // };

    const addHandler = async schema => {
        dispatch(postBudget(
            type ? 'income' : 'expenses',
            +data.amount.value,
            data.category.value,
            data.description.value
        ));
        setData(schema);
        setIsFormValid(false);
    };

    const onChangeHandler = (e, name, form, callback) => {
        validation.changeHandler(e, name, form, callback);
    };

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal  &&
                schema[name].value !== '' && schema['amount'].value >= 0 && schema['amount'].value !== '-0'
        });
        setData(schema);
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
                onChange={e => onChangeHandler(e, name, data, setStateHandler)}
            />
        );
    };

    const changeSelectHandler = () => {
        setType(!type);
    };

    const select = <Select
        options={[
            {type: type, value: 'income'},
            {type: !type, value: 'expenses'}
        ]}
        onChange={changeSelectHandler}
    />;

    return (
        <div className={'add'}>
            <div className={'add__container'}>
                {select}
                {app.valueRender(data, createInput)}
            </div>

            <div className={'add__btn'}>
                <Button
                    onClick={() => addHandler(schema)}
                    disabled={!isFormValid}
                    className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                >
                    <span>Добавить</span>
                </Button>
            </div>
        </div>
    );
};


export default AddData;