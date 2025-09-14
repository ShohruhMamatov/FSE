"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var db = require("./TranscriptManager");
var app = express();
var PORT = 4001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.initialize();
console.log("Initial list of transcripts:");
console.log(JSON.stringify(db.getAll(), null, 2));
function initializeServer() {
    console.log("Express server now listening on localhost:".concat(PORT));
}
// REST API routes
app.get("/transcripts", function (req, res) {
    res.status(200).send(db.getAll());
});
app.post("/transcripts", function (req, res) {
    var name = req.body.name;
    if (!name)
        return res.status(400).send({ error: "Missing 'name'" });
    var id = db.addStudent(name);
    res.status(200).send({ studentID: id });
});
app.get("/transcripts/:id", function (req, res) {
    var id = parseInt(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).send("Invalid id");
    var transcript = db.getTranscript(id);
    if (!transcript)
        return res.status(404).send("No student with id = ".concat(id));
    res.status(200).send(transcript);
});
app.post("/transcripts/:id/:course", function (req, res) {
    var id = parseInt(req.params.id);
    var course = req.params.course;
    var grade = parseInt(req.body.grade);
    if (Number.isNaN(id))
        return res.status(400).send("Invalid id");
    if (!course)
        return res.status(400).send("Missing course");
    if (Number.isNaN(grade))
        return res.status(400).send("Missing/invalid grade");
    try {
        db.addGrade(id, course, grade);
        res.status(200).send("OK");
    }
    catch (e) {
        res.status(404).send(e.toString());
    }
});
app.get("/transcripts/:id/:course", function (req, res) {
    var id = parseInt(req.params.id);
    var course = req.params.course;
    if (Number.isNaN(id))
        return res.status(400).send("Invalid id");
    try {
        var grade = db.getGrade(id, course);
        res.status(200).send({ studentID: id, course: course, grade: grade });
    }
    catch (e) {
        res.status(404).send(e.toString());
    }
});
app.get("/studentids", function (req, res) {
    var name = req.query.name;
    if (!name)
        return res.status(400).send({ error: "Missing 'name'" });
    res.status(200).send(db.getStudentIDs(name));
});
app.delete("/transcripts/:id", function (req, res) {
    var id = parseInt(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).send("Invalid id");
    try {
        db.deleteStudent(id);
        res.sendStatus(200);
    }
    catch (e) {
        res.status(404).send(e.toString());
    }
});
// ✅ Express 5-safe fallback (no route pattern)
app.use(function (req, res) {
    console.log("Unknown ".concat(req.method, " request for ").concat(req.originalUrl));
    res.sendStatus(404);
});
app.listen(PORT, initializeServer);
