import WebServer from "./services/WebServer";

new WebServer();

declare global {
    type Dictionary<T> = { [key: string]: T };
}