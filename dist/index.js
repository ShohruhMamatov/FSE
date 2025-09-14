"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var inputPort = 4001;
function initializeServer() {
    console.log("Express server now listening on localhost:".concat(inputPort));
}
app.listen(inputPort, initializeServer);
