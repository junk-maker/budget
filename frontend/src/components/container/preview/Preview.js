import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '../../presentation/ui/button/Button';
import AuthView from '../../presentation/auth-view/AuthView';


const Preview = () => {
    const budgetActions  = useSelector(state => state.getAuth);
    const {token} = budgetActions;
    return (
        <AuthView>
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


                    <Link to={!token ? '/sign-in' : '/features'}>
                        <Button className={'btn btn__preview'}>
                            <span>{!token ? 'Авторизоваться' : 'Перейти'}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthView>
    );
};


export default Preview;