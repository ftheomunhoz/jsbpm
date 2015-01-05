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
exports.createBPMNProcessVariable = function(node) {
    var getValue = parserUtils.getAttributesValue;

    return (new BPMNProcessVariable(
        getValue(node, "id"),
        getValue(node, "name"),
        node.local
    ));
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.isProcessVariable = function(localName) {
    return (localName === 'property' || localName === 'dataObject');
};

/**
 * @param {String} bpmnId
 * @param {String} name
 * @param {String} type
 * @constructor
 */
var BPMNProcessVariable = exports.BPMNProcessVariable = function(bpmnId, name, type) {
    this.bpmnId = bpmnId;
    this.name = name;
    this.type = type;
    this.isProcessVariable = true;
};
util.inherits(BPMNProcessVariable, BPMNFlowObject);

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNProcessVariable.prototype.validate = function(processDefinition, errorQueue) {
    this.assertName(errorQueue);
};