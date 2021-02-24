import React from 'react';
import Input from '../ui/input/Input';


const AddData = () => {
    const inputSchema = {
        description: {
            placeholder: 'Описание',
            className: 'input add__description'
        },
        category: {
            placeholder: 'Категория',
            className: 'input add__category'
        },
        amount: {
            type: 'number',
            placeholder: 'Сумма',
            className: 'input add__amount'
        }
    };
    const inputRender = () => {
        return Object.keys(inputSchema).map((name, idx) => {
            const control = inputSchema[name];
            return (
                <Input
                    key={idx}
                    type={control.type}
                    className={control.className}
                    placeholder={control.placeholder}
                />
            );
        });
    };

    return (
        <div className={'add'}>
            <div className={'add__container'}>
                {inputRender()}
            </div>
        </div>
    );
};


export default AddData;