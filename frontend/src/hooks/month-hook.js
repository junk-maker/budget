import {useState} from 'react';

const useMonth = () => {
    const [monthId, setMonthId] = useState(new Date().getMonth());

    return {monthId, setMonthId};
};

export default useMonth;