import PropTypes from 'prop-types';
import React, {useState} from 'react';
import AppService from '../../../services/appService';


const Tabs = props => {
    const appService = new AppService();
    const {setTab, language, budgetStorage} = props;
    const switchTabHandler = type =>  setTab(type);
    const [selected, setSelected] = useState(budgetStorage[0].description);

    const clickTabItemHandler = description => setSelected(description);

    const renderTabs = budgetStorage.map((value, idx) => {
        const isValueSelected = selected === value.description;
        return(
            <li className={'tabs__lists'} key={idx}>
                <div className={'tabs__list'}>
                    <span
                        onClick={() => {
                            clickTabItemHandler(value.description);
                            switchTabHandler(value.type);
                        }}
                        className={isValueSelected ? 'tabs__span selected': 'tabs__span'}>
                        {appService.checkLanguage(language) ? value.description : value.translate}</span>
                </div>
            </li>
        );
    });

    return(
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
    language: PropTypes.string,
};


export default Tabs;