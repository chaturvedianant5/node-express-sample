import express, { Request, Response, Router } from 'express';
import { FileOpsUtil } from '../io/FileOpsUtil';
import { Student } from '../model/Student';

export class StudentController {

    private studentRouter: Router;
    private static students: Set<Student>;

    constructor() {
        this.studentRouter = express.Router();
        this.studentRouter.post('/add', this.addStudent);
        this.studentRouter.get('/getAll', this.getAllStudents);
        this.studentRouter.get('/get/:id', this.getStudentById);
        this.studentRouter.put('/update', this.updateStudent);
        this.studentRouter.delete('/delete', this.deleteStudent);
    }

    public static async init() {
        let fileContent = await FileOpsUtil.loadDataFromFile('./students.json');
        StudentController.students = JSON.parse(fileContent);
    }

    addStudent = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    }

    getAllStudents = (req: Request, res: Response) => {
        res.status(200).send(StudentController.students);
    }

    getStudentById = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    }

    updateStudent = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    }

    deleteStudent = (req: Request, res: Response) => {
        throw new Error('Method not implemented.');
    }

    public get router(): Router {
        return this.studentRouter;
    }
}