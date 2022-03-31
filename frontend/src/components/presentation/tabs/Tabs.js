import React from 'react';
import PropTypes from 'prop-types';
import useSelected from '../../../hooks/selected-hook';


const Tabs = props => {
    const {setTab, appService, budgetStorage} = props;
    const switchTabHandler = type => setTab(type);
    const {selected, setSelected} = useSelected(budgetStorage[0].description);

    const clickTabItemHandler = description => setSelected(description);

    const renderTabs = budgetStorage.map(value => {
        const isValueSelected = selected === value.description;

        return (
            <li className={'tabs__lists'} key={value.id}>
                <div className={'tabs__list'}>
                    <span
                        onClick={() => {
                            clickTabItemHandler(value.description);
                            switchTabHandler(value.type);
                        }}
                        className={isValueSelected ? 'tabs__span selected': 'tabs__span'}>
                        {appService.checkLanguage() ? value.description : value.translate}</span>
                </div>
            </li>
        );
    });

    return (
        <div className={'tabs'}>
            <ul className={'tabs__container'}>
                {renderTabs}
                <li className={'tabs__lists'}>
                    <div className={'tabs__list'}>
                        <div className={'tabs__btn'}>
                            <div className={'tabs__btn--container'} onClick={props.onClick}>
                                <div id={'popup-btn'}/>
                                <label htmlFor={'popup-btn'}/>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};


Tabs.propTypes = {
    setTabs: PropTypes.func,
    tabItems: PropTypes.array,
    appService: PropTypes.object
};


export default Tabs;