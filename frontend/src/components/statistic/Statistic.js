import React, {useState} from 'react';
import Dropdown from '../presentation/ui/dropdown/Dropdown';
import statisticStorage from '../../json-storage/statisticStorage.json';


const Statistic = () => {
    const [value, setValue] = useState(null);

    return(
        <div className={'statistic'}>
            <div className={'statistic__header'}>
                <div className={'statistic__header--title'}>Статистика</div>
            </div>

            <div className={'statistic__dropdown'}>
                <Dropdown
                    single={true}
                    value={value}
                    setValue={setValue}
                    options={statisticStorage}
                    placeholder={'Выбрать статистику'}
                />
            </div>
        </div>
    );
};


export default Statistic;