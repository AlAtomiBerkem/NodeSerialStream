import type { Response } from "express";


export interface idTabError {
    idTab: string;
    IndexStand: number;
    res: Response;
}

export interface messageError {
    message: string;
}
