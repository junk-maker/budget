import PropTypes from 'prop-types';
import React, {useState} from 'react';
import AppService from '../../../../services/appService';


const Dropdown = props => {
    const appService = new AppService();
    const [open, setOpen] = useState(false);
    const {name, value, toggle, language, currency, setCurrency, setValue, options, placeholder} = props;

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
                                            ? appService.checkLanguage(language) ? appService.selectContentToggle(name, value, currency).description :
                                            appService.selectContentToggle(name, value, currency).translate : appService.checkLanguage(language) ?
                                            appService.selectContentToggle(name, value, currency).symbol : appService.selectContentToggle(name, value, currency).translate
                                    ) : placeholder
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
                            <span>
                                {
                                    opts.hasOwnProperty('description') ?
                                        appService.checkLanguage(language) ? opts.description : opts.translate :
                                        appService.checkLanguage(language) ? opts.symbol : opts.translate
                                }
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


Dropdown.propTypes = {
    name: PropTypes.string,
    toggle: PropTypes.bool,
    value: PropTypes.object,
    setValue: PropTypes.func,
    options: PropTypes.array,
    language: PropTypes.string,
    currency: PropTypes.object,
    setCurrency : PropTypes.func,
    placeholder: PropTypes.string,
};

export default Dropdown;