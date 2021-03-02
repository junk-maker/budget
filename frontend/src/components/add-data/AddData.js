import React, {useState} from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';


const AddData = () => {
    
    const inputSchema = {
        description: {
            value: '',
            placeholder: 'Описание',
            className: 'input add__description'
        },
        category: {
            value: '',
            placeholder: 'Категория',
            className: 'input add__category'
        },
        amount: {
            value: +'',
            type: 'number',
            placeholder: 'Сумма',
            className: 'input add__amount'
        }
    };
    const [date, setDate] = useState(inputSchema);

    const changeHandler = (...args) => {
        const form = date;
        const [e, name] = args;
        const control = form[name];
        control.value = e.target.value;
        form[name] = control;
        setDate(form);
        console.log(form)
        //setDate({ ...date, [control]: e.target.value});
    }

    const inputRender = () => {
        return Object.keys(date).map((name, idx) => {
            const control = inputSchema[name];
            return (
                <Input
                    key={idx}
                    // value={control.value}
                    type={control.type}
                    className={control.className}
                    placeholder={control.placeholder}
                    onChange={e => changeHandler(e, name)}
                />
            );
        });
    };

    return (
        <div className={'add'}>
            <div className={'add__container'}>
                {inputRender()}
            </div>

            <div className={'add__btn'}>
                <Button className={'btn btn__add--push'}>
                    Добавить
                </Button>
            </div>
        </div>
    );
};


export default AddData;