import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import {
    FailedResponse,
    SuccessResponse,
    ApiResponse,
} from '../interfaces/apiResponse';

export const apiResponse: ApiResponse = (
    res,
    data,
    statusCode,
    _rootElement = ''
): Response => {
    return res.format({
        json: () => {
            res.type('application/json');
            res.status(statusCode).send(data);
        },
        default: () => {
            res
                .status(StatusCodes.NOT_ACCEPTABLE)
                .send(getReasonPhrase(StatusCodes.NOT_ACCEPTABLE));
        },
    });
};

export function successResponse (data: any): SuccessResponse {
    return {
        success: true,
        data,
    };
}

export function failedResponse (data: any): FailedResponse {
    return {
        success: false,
        data,
    };
}
