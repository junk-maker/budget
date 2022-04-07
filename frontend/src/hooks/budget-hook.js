import {useState} from 'react';

const useBudget =() => {
    const [id, setId] = useState(null);
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState(null);
    const [index, setIndex] = useState(null);
    const [toggle, setToggle] = useState(null);
    const [heading , setHeading] = useState('');
    const [tab, setTab] = useState('TotalBudget');
    const [dropdown, setDropdown] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    
    return {
        id,
        tab,
        edit,
        setId,
        index,
        value,
        setTab,
        toggle,
        setEdit,
        heading,
        dropdown,
        setIndex,
        setValue,
        prevValue,
        setToggle,
        setHeading,
        setDropdown,
        setPrevValue
    };

};

export default useBudget;