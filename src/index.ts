import * as express from 'express';

const app: express.Application = express();
const inputPort = 4001
function initializeServer () {
    console.log(`Express server now listening on localhost:${inputPort}`)
}
app.listen(inputPort, initializeServer)

//