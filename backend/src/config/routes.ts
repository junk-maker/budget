import express from 'express';

export abstract class RoutesConfig {
    name: string;
    app: express.Application;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    };

    getName() {return this.name;};

    abstract configureRoutes(): express.Application;
};