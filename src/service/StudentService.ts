import { Request, Response } from 'express';

import { Student } from '../model/Student';
import { FileOpsUtil } from '../io/FileOpsUtil';

export class StudentService {

    private static readonly STUDENTS_FILE_LOCATION = './students.json';

    private static students: Array<Student> = new Array<Student>();

    public static async init() {
        let fileContent = await FileOpsUtil.loadDataFromFile(this.STUDENTS_FILE_LOCATION) ?? '';
        
        try {
            StudentService.students = JSON.parse(fileContent);
        } catch(err) {
            console.log(err);
            StudentService.students = [];
        }
    }

    public addStudent(student: Student): Array<Student> {
        StudentService.students.push(student);
        FileOpsUtil.loadDataToFile(StudentService.STUDENTS_FILE_LOCATION, StudentService.students);
        return StudentService.students;
    }

    public getAllStudents () {
        return StudentService.students;
    }

    getStudentById = (rollNo: string) => {
        let matchingStudent = StudentService.students.filter(element => element.rollNo === rollNo);
        return matchingStudent[0];
    }

    updateStudent = (student: Student) => {
        StudentService.students = StudentService.students.map(item => item.rollNo === student.rollNo ? student : item);
        FileOpsUtil.loadDataToFile(StudentService.STUDENTS_FILE_LOCATION, StudentService.students);
        return student;
    }

    deleteStudent = (rollNo: string) => {
        StudentService.students = StudentService.students.filter(element => element.rollNo !== rollNo);
        FileOpsUtil.loadDataToFile(StudentService.STUDENTS_FILE_LOCATION, StudentService.students);
        return;
    }
}