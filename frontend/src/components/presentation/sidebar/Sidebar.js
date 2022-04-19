import {Link} from 'react-router-dom';
import Logout from '../../container/logout/Logout';
import React, {useMemo, useLayoutEffect} from 'react';
import useSelected from '../../../hooks/selected-hook';


const Sidebar = () => {
    const menuItems = useMemo(() => {
        return [
            {id: 0, name: 'Features', to: '/features', icon: '/icons/features.svg'},
            {id: 1, name: 'Budget', to: '/budget', icon: '/icons/budget.svg'},
            {id: 2, name: 'Statistics', to: '/statistics', icon: '/icons/graph.svg'},
            {id: 3, name: 'Contact', to: '/contact', icon: '/icons/contacts.svg'},
            {id: 4, name: 'Settings', to: '/settings/change-email', icon: '/icons/services.svg'},
        ];
    }, []);

    const {selected, setSelected} = useSelected(menuItems[0].name);

    // Set selected menu item based on URL pathname
    useLayoutEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
            let selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            setSelected(selectedItem)
        }
    }, [menuItems, setSelected]);

    const clickMenuItemHandler = name => setSelected(name);

    const menuItemsRender = menuItems.map(item => {
        let isItemSelected = selected === item.name;
        
        return (
            <div className={'sidebar__container--menu'} key={item.id}>
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