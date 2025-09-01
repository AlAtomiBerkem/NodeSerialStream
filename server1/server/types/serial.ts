import type { Response } from "express";


export interface idTabError {
    idTab: number;
    IndexStand: number;
    res: Response;
}

export interface messageError {
    message: string;
}
