import React from 'react';
import PropTypes from 'prop-types';
import useSelected from '../../../hooks/selected-hook';


const Tabs = props => {
    const {setTab, appService, budgetStorage} = props;
    const {selected, setSelected} = useSelected(budgetStorage[0].description);

    const renderTabs = budgetStorage.map(value => {
        const isValueSelected = selected === value.description;

        return (
            <li className={'tabs__lists'} key={value.id}>
                <div className={'tabs__list'}>
                    <span
                        onClick={() => {
                            setTab(value.type);
                            setSelected(value.description);
                        }}
                        className={isValueSelected ? 'tabs__value selected' : 'tabs__value'}>
                        {appService.checkLanguage() ? value.description : value.translate}
                    </span>
                </div>
            </li>
        );
    });

    return (
        <div className={'tabs'}>
            <div className={'tabs__container'}>
                <ul className={'tabs__wrapper'}>
                    {renderTabs}
                    <li className={'tabs__lists'}>
                        <div className={'tabs__list'}>
                            <div className={'tabs__btn'}>
                                <div className={'tabs__btn-container'} onClick={props.onClick}>
                                    <div id={'popup'}/>
                                    <label htmlFor={'popup'}/>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};


Tabs.propTypes = {
    onClose: PropTypes.func,
    setTabs: PropTypes.func,
    tabItems: PropTypes.array,
    appService: PropTypes.object,
};


export default Tabs;