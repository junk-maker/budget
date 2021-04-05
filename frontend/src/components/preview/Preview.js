import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

//Component
import Button from '../ui/button/Button';


const Preview = props => {
    return (
        <div className={'preview'}>
            <header className={"preview__header"}>
                <div className={'preview__logo'}>
                    <i className={'fa fa-chart-pie'}/>
                </div>
                <motion.div
                    initial={{ y: -250}}
                    animate={{ y: -10 }}
                    className={'preview__title'}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 45 }}
                >
                    <h1>Бюджет</h1>
                </motion.div>
            </header>


            <div className={'preview__text'}>
                <h2 className={'preview__heading'}>
                    <span className={'preview__heading--main'}>Добро пожаловать</span>
                    <span className={'preview__heading--sub'}>Возьми финансы под контроль</span>
                </h2>

                <Link to={!props.user ? '/auth' : '/budget'}>
                    <Button className={'btn btn__preview'}>
                        <span>{!props.user ? 'Авторизоваться' : 'Перейти'}</span>
                    </Button>
                </Link>
            </div>

            {/*<motion.div*/}
            {/*    className={'preview__text'}*/}
            {/*    initial={{ opacity: 0 }}*/}
            {/*    animate={{ opacity: 1 }}*/}
            {/*    transition={{ delay: 1.5, duration: 1.2 }}*/}
            {/*>*/}
            {/*    <h2 className={'preview__heading'}>*/}
            {/*        <span className={'preview__heading--main'}>Добро пожаловать</span>*/}
            {/*        <span className={'preview__heading--sub'}>Возьми финансы под контроль</span>*/}
            {/*    </h2>*/}

            {/*    <Link to={!props.user ? '/auth' : '/budget'}>*/}
            {/*        <Button className={'btn btn__preview'}>*/}
            {/*            <span>{!props.user ? 'Авторизоваться' : 'Перейти'}</span>*/}
            {/*        </Button>*/}
            {/*    </Link>*/}

            {/*</motion.div>*/}
        </div>
    );
};


export default Preview;