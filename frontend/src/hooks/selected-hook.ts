import {useState} from 'react';
import {useSelectedInterface, BudgetStorageInterface} from './hooks.interface';

const useSelected = (m: BudgetStorageInterface): useSelectedInterface => {
    const [selected, setSelected] = useState<BudgetStorageInterface>(m);

    return {selected, setSelected,};
};

export default useSelected;