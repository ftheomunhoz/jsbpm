/**
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var bpmn = require('../lib/public.js');
var path = require('path');

var port = 9998;

var manager = new bpmn.ProcessManager({
    persistencyOptions: {
        uri: "mongodb://bpmadmin:bpmadmin@ds049160.mongolab.com:49160/heroku_app32857595"
		//uri: "mongodb://localhost:27017"
    }
});

manager.addBpmnFilePath("./resources/projects/simple/TestProc.bpmn", function(err, myProcess){

    // we start the process
    myProcess.triggerEvent("StartEvent");

});

// Returns a restify server.
var server = manager.createServer();

server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});

