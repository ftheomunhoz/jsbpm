/**
 * Copyright: E2E Technologies Ltd
 */
"use strict";

/**
 * Subsumes all kind process elements that have incoming and outgoing flows.
 * Name according to http://de.wikipedia.org/wiki/Business_Process_Model_and_Notation#Notation
 * @param {String} bpmnId
 * @param {String} name
 * @param {String} type
 * @constructor
 */
var BPMNFlowObject = exports.BPMNFlowObject = function(bpmnId, name, type) {
    this.bpmnId = bpmnId;
    this.name = name;
    this.type = type;
    this.isFlowObject = true;
    this.variables = [];
};

/**
 * Semantics: emit tokens along all outgoing flows. This is the default behavior
 * @param {BPMNProcess} currentProcess
 * @param {Object} data
 */
BPMNFlowObject.prototype.emitTokens = function(currentProcess, data) {
    var self = this;
    currentProcess.onFlowObjectEnd(self.name, data, function() {
        var outgoingSequenceFlows = currentProcess.processDefinition.getOutgoingSequenceFlows(self);
        outgoingSequenceFlows.forEach(function(outgoingSequenceFlow) {
            currentProcess.emitTokenAlong(self, outgoingSequenceFlow, data);
        });
    });
};

/**
 * Semantics: includes a variable to the object
 * @param {BPMNTaskVariable} variable
 */
BPMNFlowObject.prototype.addVariable = function(variable) {
    this.variables.push(variable);
};

/**
 * @return {BPMNTaskVariable} variable
 */
BPMNFlowObject.prototype.getVariable = function(id) {
    if (id && id.length > 0) {
        return this.variables.find(function(e){ return e.id === id;});
    }

    return this.variables;
};


/**
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertName = function(errorQueue) {
    var name = this.name.trim();
    if (name === "") {
        errorQueue.addError("FO1", this, "Found a " + this.type + " flow object having no name. BPMN id='" + this.bpmnId + "'.");
    }
};

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertOutgoingSequenceFlows = function(processDefinition, errorQueue) {
    if (!processDefinition.hasOutgoingSequenceFlows(this)) {
        errorQueue.addError("FO2", this, "The " + this.type + " '" + this.name + "' must have at least one outgoing sequence flow.");
    }
};

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertOneOutgoingSequenceFlow = function(processDefinition, errorQueue) {
    var outgoingFlows = processDefinition.getOutgoingSequenceFlows(this);
    if (outgoingFlows.length !== 1) {
        errorQueue.addError("FO3", this, "The " + this.type + " '" + this.name + "' must have exactly one outgoing sequence flow.");
    }
};

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertNoOutgoingSequenceFlows = function(processDefinition, errorQueue) {
    if (processDefinition.hasOutgoingSequenceFlows(this)) {
        errorQueue.addError("FO4", this, "The " + this.type + " '" + this.name + "' must not have outgoing sequence flows.");
    }
};

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertIncomingSequenceFlows = function(processDefinition, errorQueue) {
    if (!processDefinition.hasIncomingSequenceFlows(this)) {
        errorQueue.addError("FO5", this, "The " + this.type + " '" + this.name + "' must have at least one incoming sequence flow.");
    }
};

/**
 * @param {BPMNProcessDefinition} processDefinition
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertNoIncomingSequenceFlows = function(processDefinition, errorQueue) {
    if (processDefinition.hasIncomingSequenceFlows(this)) {
        errorQueue.addError("FO6", this, "The " + this.type + " '" + this.name + "' must not have incoming sequence flows.");
    }
};

/**
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertInputVariables = function(errorQueue) {
    if (!this.inputVariables || this.inputVariables.length === 0) {
        errorQueue.addError("FO7", this, "Found a " + this.type + " flow object having no input variables. BPMN id='" + this.bpmnId + "'.");
    }
};

/**
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertNoInputVariables = function(errorQueue) {
    if (this.inputVariables && this.inputVariables.length > 0) {
        errorQueue.addError("FO8", this, "Found a " + this.type + " flow object having input variables. BPMN id='" + this.bpmnId + "'.");
    }
};

/**
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertOutputVariables = function(errorQueue) {
    if (!this.outputVariables || this.outputVariables.length === 0) {
        errorQueue.addError("FO9", this, "Found a " + this.type + " flow object having no output variables. BPMN id='" + this.bpmnId + "'.");
    }
};

/**
 * @param {BPMNParseErrorQueue} errorQueue
 */
BPMNFlowObject.prototype.assertNoOutputVariables = function(errorQueue) {
    if (this.outputVariables && this.outputVariables.length > 0) {
        errorQueue.addError("F10", this, "Found a " + this.type + " flow object having output variables. BPMN id='" + this.bpmnId + "'.");
    }
};