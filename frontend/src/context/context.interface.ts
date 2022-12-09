import {ReactNode} from 'react';
import AppService from '../services/appService';
import SliceService from '../services/sliceService';
import BudgetService from '../services/budgetService';
import MarkupService from '../services/markupService';
import StorageService from '../services/storageService';
import valueStorage from '../json-storage/valueStorage.json';
import ValidationService from '../services/validationService';
import budgetStorage from '../json-storage/budgetStorage.json';
import DataSchemasService from '../services/dataSchemesService';
import currencyStorage from '../json-storage/currencyStorage.json';
import statisticStorage from '../json-storage/currencyStorage.json';

type ValueStorageInterface = typeof valueStorage;
type BudgetStorageInterface = typeof budgetStorage;
type CurrencyStorageInterface = typeof currencyStorage;
type StatisticStorageInterface = typeof statisticStorage;

export interface ContextInterface {
    appService:  AppService;
    sliceService: SliceService;
    budgetService: BudgetService;
    markupService: MarkupService;
    storageService: StorageService;
    valueStorage: ValueStorageInterface;
    validationService: ValidationService;
    budgetStorage: BudgetStorageInterface;
    dataSchemasService: DataSchemasService;
    currencyStorage: CurrencyStorageInterface;
    statisticStorage: StatisticStorageInterface;
};

export interface ContextStateInterface {
    children: ReactNode;
    services:  ContextInterface;
};