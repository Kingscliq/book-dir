export type Error = {
    statusCode: number;
    status: string;
    message: string;
    stack: string;
    isOperational: boolean
}