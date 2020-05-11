import * as Express from "express";

interface SessionCookieData {
    originalMaxAge: number;
    path: string;
    maxAge: number | null;
    secure?: boolean;
    httpOnly: boolean;
    domain?: string;
    expires: Date | boolean;
    sameSite?: boolean | string;
}

interface SessionCookie extends SessionCookieData {
    serialize(name: string, value: string): string;
}

export default interface IReq extends Express.Request {
    session: {
        id: string;
        regenerate(callback: (err: any) => void): void;
        destroy(callback: (err: any) => void): void;
        reload(callback: (err: any) => void): void;
        save(callback: (err: any) => void): void;
        touch(): void;
        cookie: SessionCookie;
        token: string;
    }
}