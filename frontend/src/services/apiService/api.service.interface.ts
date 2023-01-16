export interface HeadersInterface {
    method: string;
    body?: string | null;
    headers: {
        'Content-Type': string;
        Authorization: string | null;
    };
};