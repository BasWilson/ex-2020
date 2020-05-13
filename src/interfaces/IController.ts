import * as Express from "express";

/**
 * Gebruikt om controller classes te maken.
 */
export default interface IController {
    router: Express.Router;
    setupRouter: () => void;
}