import { Student } from '../model/Student';
import { FileOpsUtil } from '../io/FileOpsUtil';

export class StudentService {

    private static readonly STUDENTS_FILE_LOCATION = './students.json';

    private static studentsSet: Set<Student> = new Set<Student>();

    public static async init() {
        let fileContent = await FileOpsUtil.loadDataFromFile(this.STUDENTS_FILE_LOCATION) ?? '';
        
        try {
            StudentService.studentsSet = new Set(JSON.parse(fileContent));
        } catch(err) {
            console.log(err);
        }
    }

    public addStudent(student: Student): Student {
        StudentService.studentsSet.add(student);
        FileOpsUtil.loadDataToFile(StudentService.STUDENTS_FILE_LOCATION, Array.from(StudentService.studentsSet));
        return student;
    }

    public getAllStudents(): Array<Student> {
        return Array.from(StudentService.studentsSet);
    }

    public getStudentById(rollNo: string): Student {
        let matchingStudent = Array.from(StudentService.studentsSet).filter(element => element.rollNo === rollNo);
        return matchingStudent[0];
    }

    public updateStudent(student: Student): Student {
        let updatedArray = Array.from(StudentService.studentsSet).map(
            item => item.rollNo === student.rollNo ? student : item);

        StudentService.studentsSet = new Set(updatedArray);
        FileOpsUtil.loadDataToFile(StudentService.STUDENTS_FILE_LOCATION, updatedArray);
        return student;
    }

    public deleteStudent(rollNo: string): void {
        let updatedArray = Array.from(StudentService.studentsSet).filter(element => element.rollNo !== rollNo);
        StudentService.studentsSet = new Set(updatedArray);
        FileOpsUtil.loadDataToFile(StudentService.STUDENTS_FILE_LOCATION, updatedArray);
        return;
    }
}