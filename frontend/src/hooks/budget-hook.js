import {useState} from 'react';

const useBudget =() => {
    const [id, setId] = useState(null);
    const [end, setEnd] = useState(null);
    const [edit, setEdit] = useState(null);
    const [year, setYear] = useState(null);
    const [start, setStart] = useState(null);
    const [month, setMonth] = useState(null);
    const [value, setValue] = useState(null);
    const [toggle, setToggle] = useState(null);
    const [heading , setHeading] = useState('');
    const [tab, setTab] = useState('TotalBudget');
    const [dropdown, setDropdown] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    
    return {
        id,
        tab,
        end,
        edit,
        year,
        start,
        month,
        setId,
        value,
        setTab,
        setEnd,
        toggle,
        setEdit,
        setYear,
        setStart,
        setMonth,
        heading,
        dropdown,
        setValue,
        prevValue,
        setToggle,
        setHeading,
        setDropdown,
        setPrevValue,
    };

};

export default useBudget;