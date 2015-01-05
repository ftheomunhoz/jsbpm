/**
 * Copyright: ftheomunhoz
 */
"use strict";

var util = require('util');
var parserUtils = require("./parserUtils");
var BPMNFlowObject = require("./flowObject.js").BPMNFlowObject;
var variableMap = {};

/**
 * @param node
 * @constructor
 */
exports.createBPMNTaskVariable = function(node) {
    var getValue = parserUtils.getAttributesValue;
    var id = getValue(node, "id");

    return (new BPMNTaskVariable(
        getValue(node, "id"),
        variableMap[id],
        node.local
    ));
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.addVariableToMap = function(node) {
    var getValue = parserUtils.getAttributesValue;

    variableMap[getValue(node, "id")] = getValue(node, "name");
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.isTaskVariable = function(localName) {
    return (localName === 'dataInputRefs' || localName === 'dataOutputRefs');
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.isTaskVariableDeclaration = function(localName) {
    return (localName === 'dataInput' || localName === 'dataOutput');
};

/**
 * @param {String} bpmnId
 * @param {String} name
 * @param {String} type
 * @constructor
 */
var BPMNTaskVariable = exports.BPMNTaskVariable = function(bpmnId, name, type) {
    this.bpmnId = bpmnId;
    this.name = name;
    this.type = type;
    this.isTaskVariable = true;
    this.isTaskInputVariable = type.indexOf('Input') >= 0;
    this.isTaskOutputVariable = type.indexOf('Output') >= 0;
};
util.inherits(BPMNTaskVariable, BPMNFlowObject);

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNTaskVariable.prototype.validate = function(processDefinition, errorQueue) {
    this.assertName(errorQueue);
};