import React from 'react';
import PropTypes from 'prop-types';
import useOpen from '../../../../hooks/openHook';


const Dropdown = props => {
    const {open, setOpen} = useOpen();
    const {name, value, toggle, currency, appService, setCurrency, setValue, options, placeholder} = props;

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
                                            ? appService.checkLanguage() ? appService.selectContentToggle(name, value, currency).description :
                                            appService.selectContentToggle(name, value, currency).translate : appService.checkLanguage() ?
                                            appService.selectContentToggle(name, value, currency).symbol : appService.selectContentToggle(name, value, currency).translate
                                    ) : placeholder
                            }
                        </span>
                        <i className={open ? 'dropdown__icon fas fa-chevron-up' : ' dropdown__icon fas fa-chevron-down'}/>
                    </div>
                </div>

                <div className={open ? 'dropdown__bottom open' : 'dropdown__bottom'}>
                    {options.map(opts =>
                        <div key={opts.id}
                             onClick={() => {
                                 setOpen(true);
                                 appService.selectToggle(name, setValue, setCurrency, opts)
                             }}
                             className={appService.selectContentToggle(name, value, currency) === opts ?
                                 'dropdown__options selected' : 'dropdown__options'}>
                            <span>
                                {
                                    opts.hasOwnProperty('description') ?
                                        appService.checkLanguage() ? opts.description : opts.translate :
                                        appService.checkLanguage() ? opts.symbol : opts.translate
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
    currency: PropTypes.object,
    appService: PropTypes.object,
    setCurrency : PropTypes.func,
    placeholder: PropTypes.string,
};


export default Dropdown;