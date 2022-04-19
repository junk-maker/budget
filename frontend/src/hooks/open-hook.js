import {useState} from 'react';

const useOpen= () => {
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return {open, setOpen, isOpen, setIsOpen,};
};

export default useOpen;