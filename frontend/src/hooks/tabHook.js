import {useState} from 'react';

const useTab= () => {
    const [tab, setTab] = useState(null);

    return {
        tab,
        setTab,
    }
};

export default useTab;