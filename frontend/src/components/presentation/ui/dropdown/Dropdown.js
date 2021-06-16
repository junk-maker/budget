import PropTypes from 'prop-types';
import React, {useState} from 'react';
import AppService from '../../../../services/appService';


const Dropdown = props => {
    const appService = new AppService();
    const [open, setOpen] = useState(false);
    const {coin, name, value, toggle, setCoin, setValue, options} = props;
    return (
        <div className={toggle ? 'container__add' : 'container__edit'}>
            <div className={open ? 'dropdown open' : 'dropdown'} onClick={() => setOpen(prev => !prev)}>
                <div className={'dropdown__top'}>
                    <div className={'dropdown__box'}>
                        <span className={appService.selectContentToggle(name, value, coin)
                            ? 'dropdown__selected selected' : 'dropdown__selected'
                        }>
                            {
                                appService.selectContentToggle(name, value, coin) ?
                                    (appService.selectContentToggle(name, value, coin).hasOwnProperty('description')
                                            ? appService.selectContentToggle(name, value, coin).description :
                                            appService.selectContentToggle(name, value, coin).symbol
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
                                 appService.selectToggle(name, setValue, setCoin, opts)
                             }}
                             className={appService.selectContentToggle(name, value, coin) === opts ?
                                 'dropdown__options selected' : 'dropdown__options'}>
                            <span>{opts.hasOwnProperty('description') ? opts.description : opts.symbol}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


Dropdown.propTypes = {
    coin: PropTypes.object,
    name: PropTypes.string,
    value: PropTypes.object,
    setValue: PropTypes.func,
    options: PropTypes.array,
    currency: PropTypes.object,
    setCurrency : PropTypes.func,
};


export default Dropdown;