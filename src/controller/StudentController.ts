import express, { Request, Response, Router } from 'express';

import { StudentService } from '../service/StudentService';
import { Student } from '../model/Student';

export class StudentController {

    private studentRouter: Router;
    private studentService: StudentService =  new StudentService();

    constructor() {
        this.studentRouter = express.Router();
        this.studentRouter.post('/add', this.addStudent);
        this.studentRouter.get('/getAll', this.getAllStudents);
        this.studentRouter.get('/get/:id', this.getStudentById);
        this.studentRouter.put('/update', this.updateStudent);
        this.studentRouter.delete('/delete/:id', this.deleteStudent);
    }

    public static async init() {
        StudentService.init();
    }

    addStudent = (req: Request, res: Response) => {
        let student = req.body as unknown as Student;
        res.status(200).send(this.studentService.addStudent(student));
    }

    getAllStudents = (req: Request, res: Response) => {
        res.status(200).send(this.studentService.getAllStudents());
    }

    getStudentById = (req: Request, res: Response) => {
        let rollNo = req.params.id;
        res.status(200).send(this.studentService.getStudentById(rollNo));
    }

    updateStudent = (req: Request, res: Response) => {
        let student = req.body as unknown as Student;
        res.status(200).send(this.studentService.updateStudent(student));
    }

    deleteStudent = (req: Request, res: Response) => {
        let rollNo = req.params.id;
        this.studentService.deleteStudent(rollNo)
        res.status(200).send();
    }

    public get router(): Router {
        return this.studentRouter;
    }
}