import AppService from '../services/appService';
import BudgetService from '../services/budgetService';
import MarkupService from '../services/markupService';
import StorageService from '../services/storageService';
import ValidationService from '../services/validationService';
import DataSchemasService from '../services/dataSchemesService';

export interface ContextInterface {
    appService:  AppService;
    budgetService: BudgetService;
    markupService: MarkupService;
    storageService: StorageService;
    validationService: ValidationService;
    dataSchemasService: DataSchemasService;
};