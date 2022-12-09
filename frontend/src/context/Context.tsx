import {useContext, createContext} from 'react';
import {ContextInterface, ContextStateInterface} from './context.interface';

const Context = createContext<ContextInterface | null>(null);

export const ContextState = ({children, services}: ContextStateInterface): JSX.Element => {
    const {appService, sliceService, markupService, budgetService, storageService, 
        validationService, dataSchemasService, valueStorage, budgetStorage, currencyStorage, statisticStorage} = services
    ;

    return (
        <Context.Provider value={{appService, sliceService, markupService, budgetService, storageService, 
            validationService, dataSchemasService, valueStorage, budgetStorage, currencyStorage, statisticStorage,
        }}>
            {children}
        </Context.Provider>
    );
};

export const ContextData = (): ContextInterface => {
    const context = useContext(Context);

    if (context === null) {
        throw new Error('Please specify the context');
    };

    return context;
};


