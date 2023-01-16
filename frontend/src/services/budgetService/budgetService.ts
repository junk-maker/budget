import AppService from '../appService/appService';
import {FormatInterface, CurrencyStorageInterface} from './budget.service.interface';

class BudgetService {
    public language: string;
    private appService: AppService;

    constructor(language: string) {
        this.language = language;
        this.appService = new AppService(this.language);
    };

    // format(value: FormatInterface, currency: CurrencyStorageInterface) {
    //     console.log(value)
    //     let coin = currency.currency;
    //     let locales = currency.locales;
    //     let sum = Array.isArray(value) ?
    //         this.appService.calculateTotal(value, val => currency.locales === val.currency.locales) : +value
    //     ;

    //     return Intl.NumberFormat(locales, {style: 'currency', currency: coin}).format(sum);
    // };

    // budget(income: FormatInterface, expenses: FormatInterface, currency) {
    //     let budget = this.appService.calculateTotal(income, val => currency.locales === val.currency.locales) -
    //         this.appService.calculateTotal(expenses, val => currency.locales === val.currency.locales)
    //     ;

    //     return this.format(budget, currency);
    // };

    // percentage(income, value, currency) {
    //     let percentage = (Array.isArray(value) ?
    //         this.appService.calculateTotal(value, val => currency.locales === val.currency.locales) : +value) /
    //         this.appService.calculateTotal(income, val => currency.locales === val.currency.locales)
    //     ;
    //     let filter = income.filter(val => val.currency.currency === currency.currency);
        
    //     if(income <= 0 || percentage === 0 || isNaN(percentage) || filter.length === 0) {
    //         return '---';
    //     };

    //     return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    // };
};

export default BudgetService;