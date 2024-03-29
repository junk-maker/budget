import {Link} from 'react-router-dom';
import {ContextData} from '../../../context/Context';
import Logout from '../../container/logout/Logout';
import useSelected from '../../../hooks/selected-hook';
import React, {memo, useMemo, useContext, useCallback, useLayoutEffect} from 'react';

const Sidebar = memo(() => {
    const {markupService} = ContextData();
    const menuItems = useMemo(() => markupService.sidebarTemplate(), [markupService]);
    
    const {selected, setSelected} = useSelected(menuItems[0].name);

    // Set selected menu item based on URL pathname
    useLayoutEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
            let selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            setSelected(selectedItem);
        };
    }, [menuItems, setSelected]);

    const clickMenuItemHandler = useCallback(name => setSelected(name), [setSelected]);

    const menuItemsRender = useMemo(() => menuItems.map(item => {
        let isItemSelected = selected === item.name;
        
        return (
            <div className={'sidebar__container-menu'} key={item.id}>
                <Link to={item.to} style={{textDecoration: 'none'}}>
                    <div
                        onClick={() => clickMenuItemHandler(item.name)}
                        className={isItemSelected ? 'sidebar__container-item selected' : 'sidebar__container-item after'}>
                        <img className={'sidebar__container-image'} src={item.icon} alt={item.alt}/>
                        <div className={'sidebar__container-text'}>{item.name}</div>
                    </div>
                </Link>
            </div>
        );
    }), [selected, menuItems, clickMenuItemHandler]);

    const logout = useMemo(() =>  <Logout>
        <p className={'sidebar__logout-box'} >
            <img 
                className={'sidebar__logout-image'} 
                alt={markupService.svgHeadingTemplate()['logout']}
                src={markupService.sidebarHeadingTemplate()['icon']}
            />
        </p>
    </Logout>, [markupService]);

    return (
        <div className={'sidebar'}>
            <div className={'sidebar__logout'}>
               {logout}
            </div>
            <div className={'sidebar__container'}>{menuItemsRender}</div>
        </div>
    );
});

export default Sidebar;