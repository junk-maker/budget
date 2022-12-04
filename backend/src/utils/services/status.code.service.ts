function statusCode(type: string): number {
    switch(type) {
        case 'User not found': return 401;
        case 'Invalid request': return 401;
        case 'Email not found': return 401;
        case 'Not enough rights': return 401;
        case 'Password not found': return 401;
        case 'Please provide an ID': return 400;
        case 'Please provide a token': return 400;
        case 'Please provide an email': return 400;
        case 'Please provide password': return 400;
        case 'Please provide the data': return 400;
        case 'Password does not match': return 401;
        case 'Please confirm your email': return 401;
        case 'Email address already registered': return 401;
        case 'Please provide an email and password': return 400;
        case 'Please provide an email address and a message': return 400;
        default: return 500;
    };
};

export default statusCode;