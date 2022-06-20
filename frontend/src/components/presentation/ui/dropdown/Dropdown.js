import PropTypes from 'prop-types';
import useOpen from '../../../../hooks/open-hook';
import React, {useRef, useEffect, useCallback} from 'react';


const Dropdown = props => {
    const iconRef  = useRef(null);
    const selectedRef  = useRef(null);
    const {dropdownOpen, setDropdownOpen} = useOpen();
    const {name, value, options, currency, appService, setCurrency, setValue, placeholder, markupService} = props;

    const close = useCallback(e => {
        if (e && e.target !== iconRef.current && e && e.target !== selectedRef.current) return setDropdownOpen(false);
    },[setDropdownOpen]);

    useEffect(() => {
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [close]);

    return (
        <div className={'container__add'} >
            <div className={dropdownOpen ? 'dropdown open' : 'dropdown'} onClick={() => setDropdownOpen(prev => !prev)}>
                <div className={'dropdown__top'}>
                    <div className={'dropdown__box'}>
                        <span className={appService.selectDropdownContentSwitch(name, value, currency)
                            ? 'dropdown__selected selected' : 'dropdown__selected'
                        } ref={selectedRef}>
                            {
                                appService.selectDropdownContentSwitch(name, value, currency) 
                                    ? (appService.selectDropdownContentSwitch(name, value, currency).hasOwnProperty('description')
                                    ? appService.checkLanguage() ? appService.selectDropdownContentSwitch(name, value, currency).description 
                                    : appService.selectDropdownContentSwitch(name, value, currency).translate : appService.checkLanguage() 
                                    ? appService.selectDropdownContentSwitch(name, value, currency).symbol : appService.selectDropdownContentSwitch(name, value, currency).translate) 
                                    : placeholder
                            }
                        </span>
                        <img
                            ref={iconRef}
                            alt={markupService.dropdownHeadingTemplate()['alt']}
                            src={markupService.dropdownHeadingTemplate()['icon']}
                            className={dropdownOpen ? 'dropdown__icon rotate' : 'dropdown__icon'}
                        />
                    </div>
                </div>

                <div className={dropdownOpen ? 'dropdown__bottom open' : 'dropdown__bottom'}>
                    {options.map(opts =>
                        <div key={opts.id}
                             onClick={() => {
                                setDropdownOpen(true);
                                 return {
                                     value() {setValue(opts)},
                                     currency() {setCurrency(opts)},
                                 }[name]();
                             }}
                             className={
                                 appService.selectDropdownContentSwitch(name, value, currency) === null 
                                    ? appService.selectDropdownContentSwitch(name, value, currency) === opts 
                                    ? 'dropdown__options selected' : 'dropdown__options' 
                                    : appService.selectDropdownContentSwitch(name, value, currency).hasOwnProperty('id') 
                                    ? appService.selectDropdownContentSwitch(name, value, currency).id === opts.id 
                                    ? 'dropdown__options selected' :'dropdown__options' 
                                    : 'dropdown__options'
                            }
                        >
                            <span>
                                {
                                    opts.hasOwnProperty('description') 
                                        ? appService.checkLanguage() ? opts.description : opts.translate 
                                        : appService.checkLanguage() ? opts.symbol : opts.translate
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
    markupService: PropTypes.object,
};


export default Dropdown;