/**
 * Copyright: ftheomunhoz
 */
"use strict";

var util = require('util');
var parserUtils = require("./parserUtils");
var BPMNFlowObject = require("./flowObject.js").BPMNFlowObject;

/**
 * @param node
 * @constructor
 */
exports.createBPMNTaskVariable = function(node) {
    var getValue = parserUtils.getAttributesValue;

    return (new BPMNTaskVariable(
        getValue(node, "id"),
        getValue(node, "name"),
        node.local
    ));
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.isTaskVariable = function(localName) {
    return (localName === 'dataInputRefs' || localName === 'dataOutputRefs');
};


/**
 * @param {String} bpmnId
 * @param {String} name
 * @param {String} type
 * @param {String} sourceRef
 * @param {String} targetRef
 * @constructor
 */
var BPMNTaskVariable = exports.BPMNTaskVariable = function(bpmnId, name, type) {
    this.bpmnId = bpmnId;
    this.name = name;
    this.type = type;
    this.isProcessVariable = true;
};
util.inherits(BPMNTaskVariable, BPMNFlowObject);

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNTaskVariable.prototype.validate = function(processDefinition, errorQueue) {
    this.assertName(errorQueue);
};