import {Link} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useMemo ,useState, useEffect, useLayoutEffect} from 'react';




const Sidebar = () => {
    const menuItems = [
        {name: 'Home', to: '/', icon: '/icons/home.svg', subMenuItems: [] },
        {name: 'Budget', to: '/budget', icon: '/icons/budget.svg',
            subMenuItems: [
                { name: 'Доход', to: '/income'},
                { name: 'Расходы', to: '/expenses'},
            ]
        },
        {name: 'Statistics', to: '/statistics', icon: '/icons/graph.svg', subMenuItems: [] },
        {name: 'Services', to: '/services', icon: '/icons/services.svg', subMenuItems: [] },
    ];

    // const menuItemsReturn = props => {
    //     return props;
    // };

    //const menuItemsMemo = useMemo(() => menuItemsReturn(menuItems),[menuItems]);

    // State
    const [subMenusStates, setSubmenus] = useState({});
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);


    // Effects

    // Set selected menu item based on URL pathname
    useLayoutEffect(() => {
        const path = window.location.pathname;
        const parts = path.split('/');

        if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
            const selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            setSelectedMenuItem(selectedItem)
        }
    }, [menuItems])

    useEffect(() => {
        const newSubmenus = {};

        menuItems.forEach((item, index) => {
            const hasSubmenus = !!item.subMenuItems.length;
            if (hasSubmenus) {
                newSubmenus[index] = {};
                newSubmenus[index]['isOpen'] = false;
                newSubmenus[index]['selected'] = null;
            }
        })


        // Set selected submenu if user landed on one
        const path = window.location.pathname;
        const parts = path.split('/');

        if (parts.length === 3) {
            const selectedItem = parts[1].toLowerCase();
            const selectedSubItem = parts[2].toLowerCase()
            const selectedItemIndex = menuItems.findIndex(item => item.name.toLowerCase() === selectedItem);
            const selectedSubItemIndex = menuItems[selectedItemIndex]?.subMenuItems.findIndex(subItem => subItem.name.toLowerCase() === selectedSubItem);
            if (selectedItemIndex !== -1) newSubmenus[selectedItemIndex]['isOpen'] = true;
            if (selectedItemIndex !== -1 && selectedSubItemIndex !== -1) newSubmenus[selectedItemIndex]['selected'] = selectedSubItemIndex;
        }

        Object.keys(subMenusStates).length === 0 && setSubmenus(newSubmenus);
    }, [menuItems, subMenusStates]);


    const clickMenuItemHandler = (name, idx) => {
        setSelectedMenuItem(name);

        const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

        if (subMenusStates.hasOwnProperty(idx)) {
            subMenusCopy[idx]['isOpen'] = !subMenusStates[idx]['isOpen']
            setSubmenus(subMenusCopy)
        }
        else {
            for (let item in subMenusStates) {
                subMenusCopy[item]['isOpen'] = false;
                subMenusCopy[item]['selected'] = null
            }
            setSubmenus(subMenusCopy);
        }
    };


    const clickSubMenuItemHandler = (menuItemIdx, subMenuItemIdx) => {
        const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

        subMenusCopy[menuItemIdx]['selected'] = subMenuItemIdx;
        setSubmenus(subMenusCopy);
    }

    const menuItemsRender = menuItems.map((item, idx) => {
        const isItemSelected = selected === item.name;


        const hasSubmenus = !!item.subMenuItems.length;
        const isOpen = subMenusStates[idx]?.isOpen;

        const subMenu = item.subMenuItems.map((subItem, subIdx) => {
            const isSubmenuItemSelected = subMenusStates[idx]?.selected === subIdx;
            // console.log(selected = null)
            return (
                <Link to={`${item.to}${subItem.to}`} style={{ textDecoration: 'none' }} key={subIdx}>
                    <p key={subIdx}
                       className={isSubmenuItemSelected ?
                           'sidebar__container--sub-item selected' :'sidebar__container--sub-item none'}
                       onClick={() => clickSubMenuItemHandler(idx, subIdx)}
                    >
                        {subItem.name}
                    </p>
                </Link>
            );
        });

        return (
            <div className={'sidebar__container--menu'} key={idx}>
                <Link to={item.to} style={{ textDecoration: 'none' }}>
                    <div
                        onClick={() => clickMenuItemHandler(item.name, idx)}
                        className={isItemSelected ? 'sidebar__container--item selected': 'sidebar__container--item after'}>
                        <img className={'sidebar__container--image'} src={item.icon} alt={item.name}/>
                        <div className={'sidebar__container--text'}>{item.name}</div>
                    </div>
                </Link>

                <AnimatePresence>
                    {hasSubmenus && isOpen && (
                        <motion.nav
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            exit={{ opacity: 0, x: -30 }}
                        >

                            <div className={'sidebar__container--sub'}>
                                {subMenu}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        );


    });

    return (
        <div className={'sidebar'}>
            <div className={'sidebar__header'}>
                <p className={'sidebar__header--heading'}>Личный Бюджет</p>
            </div>
            <div className={'sidebar__container'}>{menuItemsRender}</div>
        </div>
    );
};

export default Sidebar;