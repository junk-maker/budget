import React from 'react';
import Dropdown from '../presentation/ui/dropdown/Dropdown';
import statisticStorage from '../../json-storage/statisticStorage.json';


const Statistic = () => {
    return(
        <div className={'statistic'}>
            <div className={'statistic__header'}>
                <div className={'statistic__header--title'}>Статистика</div>
            </div>

            <div className={'statistic__dropdown'}>
                <Dropdown
                    options={statisticStorage}
                    placeholder={'Выбрать статистику'}
                />
            </div>
        </div>
    );
};


export default Statistic;