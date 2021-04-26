import React from 'react';
import AppService from '../../../services/appService';


const Features = () => {
    const app = new AppService();
    const featuresSchema = {
        convenience:{
            heading: 'Удобство',
            text: 'Удобный и простой графический пользовательский интерфейс'
        },
        functionality:{
            heading: 'Функциональность',
            text: 'Позволяет контролировать доходы и  расходы. Можно следить за тратами, удобная система учёта'
        },
        reliability:{
            heading: 'Надёжеость',
            text: 'Ваши персональные данные не пострадают'
        },
        statistics:{
            heading: 'Статистика',
            text: 'Исчерпывающая статистика за любой интересующий вас период времени'
        },
    };

    const createFeatures = (...args) => {
        const [idx, name, control] = args;
        return(
            <li className={'features__card'} key={idx + name}>
                <h2 className={'features__card--heading'}>{control.heading}</h2>
                <p className={'features__card--text'}>{control.text}</p>
            </li>
        );
    };

    const featuresRender = () => app.objectIteration(featuresSchema, createFeatures);
    return(
        <section className={'features'}>
            <div className={'features__header'}>
                <h1 className={'features__heading'}>
                    Приложение для финансов
                </h1>

                <p className={'features__text'}>
                    Наши инструменты помогут контролировать ваши персональные финансы
                </p>
            </div>

            <div className={'features__main'}>
                <ul className={'features__container'}>
                    {featuresRender()}
                </ul>
            </div>
        </section>
    );
};


export default Features;