import * as Express from "express";

export default interface IController {
    router: Express.Router;
    setupRouter: () => void;
}