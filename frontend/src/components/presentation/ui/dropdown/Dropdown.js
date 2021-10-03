import PropTypes from 'prop-types';
import useOpen from '../../../../hooks/open-hook';
import React, {useRef, useEffect, useCallback} from 'react';


const Dropdown = props => {
    const {open, setOpen} = useOpen();
    const iconRef  = useRef(null);
    const selectedRef  = useRef(null);
    const {name, value, options, currency, appService, setCurrency, setValue, placeholder} = props;

    const close = useCallback(e => {
        if (e && e.target !== iconRef.current && e && e.target !== selectedRef.current) return setOpen(false);
    },[setOpen]);

    useEffect(() => {
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [close]);

    return (
        <div className={'container__add'} >
            <div className={open ? 'dropdown open' : 'dropdown'} onClick={() => setOpen(prev => !prev)}>
                <div className={'dropdown__top'}>
                    <div className={'dropdown__box'}>
                        <span className={appService.selectDropdownContentToggle(name, value, currency)
                            ? 'dropdown__selected selected' : 'dropdown__selected'
                        } ref={selectedRef}>
                            {
                                appService.selectDropdownContentToggle(name, value, currency) ?
                                    (appService.selectDropdownContentToggle(name, value, currency).hasOwnProperty('description')
                                            ? appService.checkLanguage() ? appService.selectDropdownContentToggle(name, value, currency).description :
                                            appService.selectDropdownContentToggle(name, value, currency).translate : appService.checkLanguage() ?
                                            appService.selectDropdownContentToggle(name, value, currency).symbol : appService.selectDropdownContentToggle(name, value, currency).translate
                                    ) : placeholder
                            }
                        </span>
                        <i className={open ? 'dropdown__icon fas fa-chevron-up' : ' dropdown__icon fas fa-chevron-down'} ref={iconRef}/>
                    </div>
                </div>

                <div className={open ? 'dropdown__bottom open' : 'dropdown__bottom'}>
                    {options.map(opts =>
                        <div key={opts.id}
                             onClick={() => {
                                 setOpen(true);
                                 appService.selectToggle(name, setValue, setCurrency, opts)
                             }}
                             className={
                                 appService.selectDropdownContentToggle(name, value, currency) === null ?
                                     appService.selectDropdownContentToggle(name, value, currency) === opts ?
                                         'dropdown__options selected' : 'dropdown__options' :
                                     appService.selectDropdownContentToggle(name, value, currency).hasOwnProperty('id') ?
                                         appService.selectDropdownContentToggle(name, value, currency).id === opts.id ?
                                             'dropdown__options selected' :'dropdown__options' : 'dropdown__options'
                             }
                        >
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
    value: PropTypes.object,
    setValue: PropTypes.func,
    options: PropTypes.array,
    currency: PropTypes.object,
    appService: PropTypes.object,
    setCurrency : PropTypes.func,
    placeholder: PropTypes.string,
};


export default Dropdown;