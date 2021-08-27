import {Link} from 'react-router-dom';
import Logout from '../../container/logout/Logout';
import React, {useLayoutEffect, useMemo, useState} from 'react';


const Sidebar = () => {
    const menuItems = useMemo(() => {
        return [
            {name: 'Features', to: '/features', icon: '/icons/features.svg'},
            {name: 'Budget', to: '/budget', icon: '/icons/budget.svg'},
            {name: 'Statistic', to: '/statistic', icon: '/icons/graph.svg'},
            {name: 'Contact', to: '/contact', icon: '/icons/contacts.svg'},
            {name: 'Settings', to: '/settings/change-email', icon: '/icons/services.svg'},
        ];
    }, []);

    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);

    // Set selected menu item based on URL pathname
    useLayoutEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
            let selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            setSelectedMenuItem(selectedItem)
        }
    }, [menuItems]);

    const clickMenuItemHandler = name => setSelectedMenuItem(name);

    const menuItemsRender = menuItems.map((item, idx) => {
        let isItemSelected = selected === item.name;
        return (
            <div className={'sidebar__container--menu'} key={idx + item.name}>
                <Link to={item.to} style={{textDecoration: 'none'}}>
                    <div
                        onClick={() => clickMenuItemHandler(item.name)}
                        className={isItemSelected ? 'sidebar__container--item selected': 'sidebar__container--item after'}>
                        <img className={'sidebar__container--image'} src={item.icon} alt={item.name}/>
                        <div className={'sidebar__container--text'}>{item.name}</div>
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <div className={'sidebar'}>
            <div className={'sidebar__header'}>
                <Logout>
                    <p className={'sidebar__header--heading'} >
                        <img className={'sidebar__header--image'} src={'/icons/logout.svg'} alt={'logout'}/>
                    </p>
                </Logout>
            </div>
            <div className={'sidebar__container'}>{menuItemsRender}</div>
        </div>
    );
};


export default Sidebar;