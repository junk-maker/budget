import {Dispatch, SetStateAction} from 'react';
import budgetStorage from '../json-storage/budgetStorage.json';
import currencyStorage from '../json-storage/currencyStorage.json';
import {SchemaInterface, CreateDateInterface, CreateMonthInterface} from '../services/appService/app.service.interface';
import {ChangeEmailSchemaInterface, ChangePasswordSchemaInterface, 
    DeleteAccountSchemaInterface, TextareaSchemaInterface, ContactSchemaInterface} from '../services/dataSchemesService/data.schemes.interface'
;

export interface UseAuthInterface {
    count: number;
    form: SchemaInterface;
    setCount: Dispatch<SetStateAction<number>>;
    setForm: Dispatch<SetStateAction<SchemaInterface>>;
};

export interface UseValueInyerface{
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
};

export interface UseValidationInterface {
    isFormValid: boolean;
    setIsFormValid: Dispatch<SetStateAction<boolean>>;
};

export interface UseTooltipInterface {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export interface UseSlideInterface {
    slide: number;
    setSlide: Dispatch<SetStateAction<number>>;
};

export interface UseRemoveInterface {
    remove: string;
    setRemove: Dispatch<SetStateAction<string>>;
};

export interface UseDelayInterface {
    delay: boolean;
    getDelay: () => void;
};

export interface UseDateInterface {
    date: Date;
};

export interface UseOpenInterface {
    popupOpen: string;
    dropdownOpen: boolean;
    faqPopupOpen: boolean;
    valuePopupOpen: boolean;
    removePopupOpen: boolean;
    datepickerPopupOpen: boolean;
    setPopupOpen: Dispatch<SetStateAction<string>>;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    setFaqPopupOpen: Dispatch<SetStateAction<boolean>>;
    setValuePopupOpen: Dispatch<SetStateAction<boolean>>;
    setRemovePopupOpen: Dispatch<SetStateAction<boolean>>;
    setDatepickerPopupOpen: Dispatch<SetStateAction<boolean>>;
};

export interface UsePaginationInterface {
    pageCount: null;
    currentPage: null;
    setPageCount: Dispatch<SetStateAction<null>>;
    setCurrentPage: Dispatch<SetStateAction<null>>;
};

export type BudgetStorageInterface = typeof budgetStorage;
export type CurrencyStorageInterface = typeof currencyStorage;

export interface useSelectedInterface {
    selected: BudgetStorageInterface;
    setSelected: Dispatch<SetStateAction<BudgetStorageInterface>>;
};

export interface ChangeEmailInterface {
    email: ChangeEmailSchemaInterface | null;
};

export interface ChangePasswordInterface {
    password: ChangePasswordSchemaInterface | null;
};

export interface DeleteAccountInterface {
    deleteAcc: DeleteAccountSchemaInterface | null;
};

export interface UseSettingsInterface {
    email: ChangeEmailInterface;
    password: ChangePasswordInterface;
    deleteAcc: DeleteAccountInterface;
    setEmail: Dispatch<SetStateAction<ChangeEmailInterface>>;
    setPassword: Dispatch<SetStateAction<ChangePasswordInterface>>;
    setDeleteAcc: Dispatch<SetStateAction<DeleteAccountInterface>>;
};

export interface UseBudgetInterface {
    id: null;
    end: null;
    edit: null;
    year: null;
    start: null;
    tab: string;
    month: null;
    value: null;
    toggle: null;
    dropdown: null;
    heading: string;
    prevValue: null;
    setId: Dispatch<SetStateAction<null>>;
    setEnd: Dispatch<SetStateAction<null>>;
    setEdit: Dispatch<SetStateAction<null>>;
    setYear: Dispatch<SetStateAction<null>>;
    setStart: Dispatch<SetStateAction<null>>;
    setTab: Dispatch<SetStateAction<string>>;
    setMonth: Dispatch<SetStateAction<null>>;
    setValue: Dispatch<SetStateAction<null>>;
    setToggle: Dispatch<SetStateAction<null>>;
    setDropdown: Dispatch<SetStateAction<null>>;
    setHeading: Dispatch<SetStateAction<string>>;
    setPrevValue: Dispatch<SetStateAction<null>>;
};

export interface UseCurrencyInterface {
    currency: null;
    prevCurrency: null;
    currentCurrency: CurrencyStorageInterface;
    setCurrency: Dispatch<SetStateAction<null>>;
    setPrevCurrency: Dispatch<SetStateAction<null>>;
    setCurrentCurrency: Dispatch<SetStateAction<CurrencyStorageInterface>>;
};

export interface UseContactInterface {
    isMessageFormValid: boolean;
    contact: ContactSchemaInterface;
    textarea: TextareaSchemaInterface;
    setIsMessageFormValid: Dispatch<SetStateAction<boolean>>;
    setContact: Dispatch<SetStateAction<ContactSchemaInterface>>;
    setTextarea: Dispatch<SetStateAction<TextareaSchemaInterface>>;
};

export interface UseDatepickerInterface {
    mode: string;
    endDate: null;
    between: any[];
    selected: Date;
    pickYear: null;
    startDate: null;
    animation: string;
    selectedYear: number;
    monthesNames: unknown[];
    selectedYearsInterval: number[];
    selectedDay: CreateDateInterface;
    selectedMonth: CreateMonthInterface;
    getAnimation: (direction: string) => void;
    setMode: Dispatch<SetStateAction<string>>;
    setEndDate: Dispatch<SetStateAction<null>>;
    setBetween: Dispatch<SetStateAction<any[]>>;
    setPickYear: Dispatch<SetStateAction<null>>;
    setSelected: Dispatch<SetStateAction<Date>>;
    setStartDate: Dispatch<SetStateAction<null>>;
    setAnimation: Dispatch<SetStateAction<string>>;
    setSelectedYear: Dispatch<SetStateAction<number>>;
    setSelectedYearsInterval: Dispatch<SetStateAction<number[]>>;
    setSelectedDay: Dispatch<SetStateAction<CreateDateInterface>>;
    setSelectedMonth: Dispatch<SetStateAction<CreateMonthInterface>>;
};