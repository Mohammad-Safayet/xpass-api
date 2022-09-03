import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from 'express';

import db from "../models";
import UserService from "../service/userService";

import {
    apiResponse,
    failedResponse,
    successResponse,
} from '../utils/utils';

export default class UserController {

    private userService: UserService

    public constructor (database: typeof db) {
        this.getUserProfile = this.getUserProfile.bind(this)
        this.createUserProfile = this.createUserProfile.bind(this)
        this.getVaultItems = this.getVaultItems.bind(this)
        this.setVaultItem = this.setVaultItem.bind(this)

        this.userService = new UserService(database)
    }

    public async getUserProfile (
        req: Request,
        res: Response,
    ): Promise<Response> {
        // logger.info('getUserProfile');

        try {
            const email = req.query.email as String
            const password = req.query.password as String
            
            const user = await this.userService.getUserProfile(
                email, 
                password
            );

            return apiResponse(res, successResponse(user), StatusCodes.OK)
        } catch (error: any) {
            // logger.error(`error while getting all Servers ${error.message}`, {
            //     meta: { ...error },
            // });
            console.log(error);
            

            return apiResponse(
                res,
                failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    public async getVaultItems (
        req: Request,
        res: Response,
    ): Promise<Response> {
        // logger.info('getVaultItem');

        try {
            const vaultNumber = req.query.vaultNumber as String
            
            const items = await this.userService.getVaultItems(
                vaultNumber, 
            );

            return apiResponse(res, successResponse(items), StatusCodes.OK)
        } catch (error: any) {
            // logger.error(`error while getting all Servers ${error.message}`, {
            //     meta: { ...error },
            // });
            console.log(error);
        
            return apiResponse(
                res,
                failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    public async createUserProfile (
        req: Request,
        res: Response,
    ): Promise<Response> {
        // logger.info('createUserProfile');

        try {
            const email = req.body.email as String
            const password = req.body.password as String
            const name = req.body.name as String

            console.log(`${email} ${password} ${name}`);
            
            
            const user = await this.userService.createUserProfile(
                email, 
                password,
                name
            );

            return apiResponse(res, successResponse(user), StatusCodes.OK)
        } catch (error: any) {
            // logger.error(`error while getting all Servers ${error.message}`, {
            //     meta: { ...error },
            // });
            console.log(error);
            

            return apiResponse(
                res,
                failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    public async setVaultItem (
        req: Request,
        res: Response,
    ): Promise<Response> {
        // logger.info('setVaultItem');

        try {
            const vaultNumber = req.body.vaultNumber as String
            const item = req.body.item as String

            console.log(`vaultNumber = ${vaultNumber} item = ${item}`);
            
            
            const result = await this.userService.setVaultItem(
                vaultNumber, 
                item
            );

            return apiResponse(res, successResponse(result), StatusCodes.OK)
        } catch (error: any) {
            // logger.error(`error while getting all Servers ${error.message}`, {
            //     meta: { ...error },
            // });
            console.log(error);
            

            return apiResponse(
                res,
                failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}