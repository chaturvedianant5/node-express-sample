import { Gender } from './Gender';

export interface Student {

    rollNo: string;
    name: string;
    gender: Gender;
    currentClass: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' | 'XI' | 'XII';
}