import { Router } from "express";
import UserController from "../controller/userController";

import db from "../models";

export default function routes(database: typeof db) {
    const api = Router();

    const userController = new UserController(database)

    api.get('/user', userController.getUserProfile)
    api.get('/items', userController.getVaultItems)

    api.post('/register', userController.createUserProfile)
    api.post('/entry', userController.setVaultItem)

    return api
}
