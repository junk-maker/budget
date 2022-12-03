import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Token from '@/utils/interfaces/token.interface';

const verifyToken = async (token: string): Promise<Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    });
};

const compareToken = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

export default {verifyToken, compareToken};