import { Request, Response } from "express";
import log from './../utils/logger.util';

import { postUserService, getUserService, deleteUserService } from "./../services/user.service";
import { postUserInput, getUserInput, updateUserInput, deleteUserInput} from './../schemas/user.schema';

export const postUserHandler = async (
    req:Request<{},{}, postUserInput["body"]>,
    res:Response
) => {cd t
    try {
        const reply =await postUserService(req.body)
        return res.send(reply)
    } catch (error: any) {
        res.send({status: 409, data: null, msg:error.message})
    }
}

export const getUserHandler = async(
    req:
)
