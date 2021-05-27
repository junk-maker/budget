import PropTypes from 'prop-types';
import React, {useState} from 'react';


const Tabs = props => {
    const {setTabs, tabItems} = props;
    const switchTabHandler = tab => setTabs(tab);
    const [selected, setSelectedTabItem] = useState(tabItems[0].name);

    const clickTabItemHandler = name => setSelectedTabItem(name);

    const renderTabs = tabItems.map((item, idx) => {
        const isItemSelected = selected === item.name;
        return(
            <li className={'tabs__lists'} key={idx}>
                <div className={'tabs__list'} onClick={() => switchTabHandler(item.openTab)}>
                    <span
                        onClick={() => clickTabItemHandler(item.name)}
                        className={isItemSelected ? 'tabs__span selected': 'tabs__span'}>
                        {item.name}</span>
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
    tabItems: PropTypes.array
};


export default Tabs;