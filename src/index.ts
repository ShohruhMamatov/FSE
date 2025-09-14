import * as express from "express";
import * as cors from "cors";
import * as db from "./TranscriptManager";

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.initialize();
console.log("Initial list of transcripts:");
console.log(JSON.stringify(db.getAll(), null, 2));

function initializeServer() {
    console.log(`Express server now listening on localhost:${PORT}`);
}

// REST API routes
app.get("/transcripts", (req, res) => {
    res.status(200).send(db.getAll());
});

app.post("/transcripts", (req, res) => {
    const name = req.body.name as string;
    if (!name) return res.status(400).send({ error: "Missing 'name'" });
    const id = db.addStudent(name);
    res.status(200).send({ studentID: id });
});

app.get("/transcripts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send("Invalid id");

    const transcript = db.getTranscript(id);
    if (!transcript) return res.status(404).send(`No student with id = ${id}`);

    res.status(200).send(transcript);
});


app.post("/transcripts/:id/:course", (req, res) => {
    const id = parseInt(req.params.id);
    const course = req.params.course;
    const grade = parseInt(req.body.grade);
    if (Number.isNaN(id)) return res.status(400).send("Invalid id");
    if (!course) return res.status(400).send("Missing course");
    if (Number.isNaN(grade)) return res.status(400).send("Missing/invalid grade");
    try {
        db.addGrade(id, course, grade);
        res.status(200).send("OK");
    } catch (e: any) {
        res.status(404).send(e.toString());
    }
});

app.get("/transcripts/:id/:course", (req, res) => {
    const id = parseInt(req.params.id);
    const course = req.params.course;
    if (Number.isNaN(id)) return res.status(400).send("Invalid id");
    try {
        const grade = db.getGrade(id, course);
        res.status(200).send({ studentID: id, course, grade });
    } catch (e: any) {
        res.status(404).send(e.toString());
    }
});

app.get("/studentids", (req, res) => {
    const name = req.query.name as string;
    if (!name) return res.status(400).send({ error: "Missing 'name'" });
    res.status(200).send(db.getStudentIDs(name));
});

app.delete("/transcripts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send("Invalid id");
    try {
        db.deleteStudent(id);
        res.sendStatus(200);
    } catch (e: any) {
        res.status(404).send(e.toString());
    }
});

// ✅ Express 5-safe fallback (no route pattern)
app.use((req, res) => {
    console.log(`Unknown ${req.method} request for ${req.originalUrl}`);
    res.sendStatus(404);
});

app.listen(PORT, initializeServer);
