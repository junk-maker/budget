import {useState} from 'react';

const useSelected = m => {
    const [selected, setSelected] = useState(m);

    return {selected, setSelected,};
};

export default useSelected;