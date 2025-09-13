export type StudentID = number
export type Student = {studentID: number, studentName: string}
export type Course = string
export type CourseGrade = {course:Course, grade:number}
export type Transcript = {student:Student, grades:CourseGrade[]}

export function initialize() {
    throw Error("Not implemented");
}

// returns a list of all the transcripts.
// handy for debugging
export function getAll(){
    throw Error("Not implemented");
}

// creates an empty transcript for a student with this name,
// and returns a fresh ID number
export function addStudent(name:string) : StudentID{
    throw Error("Not implemented");
}

// gets transcript for given ID.  Returns undefined if missing
export function getTranscript(studentID:number) : Transcript{
    throw Error("Not implemented");
}

// returns list of studentIDs matching a given name
export function getStudentIDs(studentName:string) : StudentID[]{
    throw Error("Not implemented");
}

