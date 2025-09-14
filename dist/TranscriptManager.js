"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = initialize;
exports.getAll = getAll;
exports.addStudent = addStudent;
exports.getTranscript = getTranscript;
exports.getStudentIDs = getStudentIDs;
exports.deleteStudent = deleteStudent;
exports.addGrade = addGrade;
exports.getGrade = getGrade;
// Simple in-memory DB
var transcripts = [];
var nextID = 1;
function initialize() {
    transcripts.length = 0;
    nextID = 1;
    // initialize with 4 students like the tutorial
    addStudent("Sardor");
    addStudent("Jasur");
    addStudent("Jasur"); // duplicate name intentionally
    addStudent("Nigora");
}
function getAll() {
    // return a deep-ish copy to avoid accidental external mutation
    return transcripts.map(function (t) { return ({
        student: __assign({}, t.student),
        grades: t.grades.map(function (g) { return (__assign({}, g)); })
    }); });
}
function addStudent(name) {
    var id = nextID++;
    var student = { studentID: id, studentName: name };
    var transcript = { student: student, grades: [] };
    transcripts.push(transcript);
    return id;
}
function getTranscript(studentID) {
    return transcripts.find(function (t) { return t.student.studentID === studentID; });
}
function getStudentIDs(studentName) {
    var lower = studentName.toLowerCase();
    return transcripts
        .filter(function (t) { return t.student.studentName.toLowerCase() === lower; })
        .map(function (t) { return t.student.studentID; });
}
function deleteStudent(studentID) {
    var idx = transcripts.findIndex(function (t) { return t.student.studentID === studentID; });
    if (idx === -1) {
        throw new Error("No student with id = ".concat(studentID));
    }
    transcripts.splice(idx, 1);
}
function addGrade(studentID, course, grade) {
    var t = getTranscript(studentID);
    if (!t)
        throw new Error("No student with id = ".concat(studentID));
    var existing = t.grades.find(function (g) { return g.course.toLowerCase() === course.toLowerCase(); });
    if (existing)
        throw new Error("Student ".concat(studentID, " already has a grade for course ").concat(course));
    t.grades.push({ course: course, grade: grade });
}
function getGrade(studentID, course) {
    var t = getTranscript(studentID);
    if (!t)
        throw new Error("No student with id = ".concat(studentID));
    var g = t.grades.find(function (x) { return x.course.toLowerCase() === course.toLowerCase(); });
    if (!g)
        throw new Error("No grade for student ".concat(studentID, " in course ").concat(course));
    return g.grade;
}
