import {useState} from 'react';

const useOpen= () => {
    const [open, setOpen] = useState(false);

    return {
        open,
        setOpen,
    }
};

export default useOpen;