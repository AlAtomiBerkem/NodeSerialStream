import type { Request, Response } from "express";

export interface Users {
    UserName: string;
    UserLastName: string;
    UserEmail: string;
    idTab: string;
}

export type DeleteUserParams = {
    idTab: string;
}