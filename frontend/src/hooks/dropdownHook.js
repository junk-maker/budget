import {useState} from 'react';

const useDropdown= () => {
    const [dropdown, setDropdown] = useState(null);

    return {
        dropdown,
        setDropdown
    }
};

export default useDropdown;