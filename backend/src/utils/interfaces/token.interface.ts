import {Schema} from 'mongoose';

interface Token extends Object {
    id: Schema.Types.ObjectId;
};

export default Token;