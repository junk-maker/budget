import {useState} from 'react';
import {UseBudgetInterface} from './hooks.interface';

const useBudget = (): UseBudgetInterface => {
    const [id, setId] = useState<null>(null);
    const [end, setEnd] = useState<null>(null);
    const [edit, setEdit] = useState<null>(null);
    const [year, setYear] = useState<null>(null);
    const [start, setStart] = useState<null>(null);
    const [month, setMonth] = useState<null>(null);
    const [value, setValue] = useState<null>(null);
    const [toggle, setToggle] = useState<null>(null);
    const [heading , setHeading] = useState<string>('');
    const [dropdown, setDropdown] = useState<null>(null);
    const [tab, setTab] = useState<string>('TotalBudget');
    const [prevValue, setPrevValue] = useState<null>(null);
    
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