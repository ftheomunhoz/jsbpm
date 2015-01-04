/*global exports */

var doLog = false;

function log(eventName) {
    if (doLog) console.log("TestProc.js: Calling handler for '" + eventName + "'");
}

exports.StartEvent = function(data, done) {
    log("StartEvent");
    if (data) {
        log("Data: " + JSON.stringify(data, null, "  "));
        this.setProperty("myFirstProperty", data);
    }
    done(data);
};

exports.UserTask = function(data, done) {
    log("UserTask");
    done(data);
};

exports.UserTaskDone = function(data, done) {
    log("UserTaskDone");
    done(data);
};

exports.EndEvent = function(data, done) {
    log("EndEvent");
    done(data);
};