import PropTypes from 'prop-types';
import React, {useState} from 'react';
import AppService from '../../../../services/appService';


const Dropdown = props => {
    const appService = new AppService();
    const [open, setOpen] = useState(false);
    const {name, value, single, toggle, currency, setCurrency, setValue, options, placeholder} = props;

    if(!single) {
        return (
            <div className={toggle ? 'container__add' : 'container__edit'}>
                <div className={open ? 'dropdown open' : 'dropdown'} onClick={() => setOpen(prev => !prev)}>
                    <div className={'dropdown__top'}>
                        <div className={'dropdown__box'}>
                        <span className={appService.selectContentToggle(name, value, currency)
                            ? 'dropdown__selected selected' : 'dropdown__selected'
                        }>
                            {
                                appService.selectContentToggle(name, value, currency) ?
                                    (appService.selectContentToggle(name, value, currency).hasOwnProperty('description')
                                            ? appService.selectContentToggle(name, value, currency).description :
                                            appService.selectContentToggle(name, value, currency).symbol
                                    ) : 'Выбрать опцию'
                            }
                        </span>
                            <i className={open ? 'dropdown__icon fas fa-chevron-up' : ' dropdown__icon fas fa-chevron-down'}/>
                        </div>
                    </div>

                    <div className={open ? 'dropdown__bottom open' : 'dropdown__bottom'}>
                        {options.map((opts, idx) =>
                            <div key={idx}
                                 onClick={() => {
                                     setOpen(true);
                                     appService.selectToggle(name, setValue, setCurrency, opts)
                                 }}
                                 className={appService.selectContentToggle(name, value, currency) === opts ?
                                     'dropdown__options selected' : 'dropdown__options'}>
                                <span>{opts.hasOwnProperty('description') ? opts.description : opts.symbol}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={open ? 'dropdown open' : 'dropdown'} onClick={() => setOpen(prev => !prev)}>
                <div className={'dropdown__top'}>
                    <div className={'dropdown__box'}>
                        <span className={value ? 'dropdown__selected selected' : 'dropdown__selected'}>
                            {value ? value.hasOwnProperty('description') ?
                                value.description : value.symbol : placeholder
                            }
                        </span>
                        <i className={open ? 'dropdown__icon fas fa-chevron-up' : ' dropdown__icon fas fa-chevron-down'}/>
                    </div>
                </div>

                <div className={open ? 'dropdown__bottom open' : 'dropdown__bottom'}>
                    {
                        options.map((opts, idx) =>
                            <div key={idx}
                                 onClick={() => {
                                     setValue(opts)
                                     setOpen(true);
                                 }}
                                 className={value === opts ? 'dropdown__options selected' : 'dropdown__options'}>
                                <span>{opts.hasOwnProperty('description') ? opts.description : opts.symbol}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
};


Dropdown.propTypes = {
    single: PropTypes.bool,
    name: PropTypes.string,
    toggle: PropTypes.bool,
    value: PropTypes.object,
    setValue: PropTypes.func,
    options: PropTypes.array,
    currency: PropTypes.object,
    setCurrency : PropTypes.func,
    placeholder: PropTypes.string,
};

export default Dropdown;