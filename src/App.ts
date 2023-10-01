import bodyParser from 'body-parser';
import express, { Application } from 'express';

import { StudentController } from './controller/StudentController';

export class App {

    private static instance: App;

    private expressApp: Application;
    private studentController: StudentController = new StudentController();

    constructor() {
        this.expressApp = express();
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use('/student', this.studentController.router);

        this.expressApp.listen(8080, () => {
            console.log('App started on port 8080!');
        });
    }

    public static init() {
        StudentController.init();
        if(!App.instance) {
            App.instance = new App();
        }
    }
}

App.init();