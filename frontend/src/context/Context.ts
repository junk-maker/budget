import {createContext} from 'react';
import {ContextInterface} from '../types/types';

const Context = createContext<ContextInterface | null>(null);

export default Context;


