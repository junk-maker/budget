import {Types} from 'mongoose';
import User from '@/resources/user/user.interface';

export default interface Budget {
    date: Date;
    amount: string;
    category: string;
    _id: Types.ObjectId;
    description: string;
    user_id: User['_id'];
    value: {id: string, type: string, translate: string, description: string};
    currency: {id: string, symbol: string, locales: string, currency: string, translate: string};
};