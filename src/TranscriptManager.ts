// src/TranscriptManager.ts
export type StudentID = number;

export type Student = {
    studentID: StudentID;
    studentName: string;
};

export type Course = string;

export type CourseGrade = {
    course: Course;
    grade: number;
};

export type Transcript = {
    student: Student;
    grades: CourseGrade[];
};

// Simple in-memory DB
const transcripts: Transcript[] = [];
let nextID = 1;

export function initialize() {
    transcripts.length = 0;
    nextID = 1;
    // initialize with 4 students like the tutorial
    addStudent("Sardor");
    addStudent("Jasur");
    addStudent("Jasur"); // duplicate name intentionally
    addStudent("Nigora");
}

export function getAll(): Transcript[] {
    // return a deep-ish copy to avoid accidental external mutation
    return transcripts.map(t => ({
        student: { ...t.student },
        grades: t.grades.map(g => ({ ...g }))
    }));
}

export function addStudent(name: string): StudentID {
    const id = nextID++;
    const student: Student = { studentID: id, studentName: name };
    const transcript: Transcript = { student, grades: [] };
    transcripts.push(transcript);
    return id;
}

export function getTranscript(studentID: StudentID): Transcript | undefined {
    return transcripts.find(t => t.student.studentID === studentID);
}

export function getStudentIDs(studentName: string): StudentID[] {
    const lower = studentName.toLowerCase();
    return transcripts
        .filter(t => t.student.studentName.toLowerCase() === lower)
        .map(t => t.student.studentID);
}

export function deleteStudent(studentID: StudentID): void {
    const idx = transcripts.findIndex(t => t.student.studentID === studentID);
    if (idx === -1) {
        throw new Error(`No student with id = ${studentID}`);
    }
    transcripts.splice(idx, 1);
}

export function addGrade(studentID: StudentID, course: Course, grade: number): void {
    const t = getTranscript(studentID);
    if (!t) throw new Error(`No student with id = ${studentID}`);
    const existing = t.grades.find(g => g.course.toLowerCase() === course.toLowerCase());
    if (existing) throw new Error(`Student ${studentID} already has a grade for course ${course}`);
    t.grades.push({ course, grade });
}

export function getGrade(studentID: StudentID, course: Course): number {
    const t = getTranscript(studentID);
    if (!t) throw new Error(`No student with id = ${studentID}`);
    const g = t.grades.find(x => x.course.toLowerCase() === course.toLowerCase());
    if (!g) throw new Error(`No grade for student ${studentID} in course ${course}`);
    return g.grade;
}
