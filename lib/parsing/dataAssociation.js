/**
 * Copyright: ftheomunhoz
 */
"use strict";

var util = require('util');
var parserUtils = require("./parserUtils");

/**
 * @param node
 * @constructor
 */
exports.createBPMNDataAssociation = function(node) {
    var getValue = parserUtils.getAttributesValue;

    return (new BPMNDataAssociation(
        getValue(node, "id"),
        getValue(node, "sourceRef"),
        getValue(node, "targetRef"),
        node.local
    ));
};

/**
 * @param node
 * @constructor
 */
exports.createBPMNDataAssociationRef = function(node) {
    var getValue = parserUtils.getAttributesValue;

    return (new BPMNDataAssociationRef(
        "VALUE",
        node.local
    ));
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.isDataAssociation = function(localName) {
    return (localName === 'dataOutputAssociation' || localName === 'dataInputAssociation');
};

/**
 * @param localName name without namespace prefix
 * @return {Boolean}
 */
exports.isDataAssociationRef = function(localName) {
    return (localName === 'sourceRef' || localName === 'targetRef');
};

/**
 * @param {String} bpmnId
 * @param {String} sourceRef
 * @param {String} targetRef
 * @param {String} type
 * @constructor
 */
var BPMNDataAssociation = exports.BPMNDataAssociation = function(bpmnId, sourceRef, targetRef, type) {
    this.bpmnId = bpmnId;
    this.sourceRef = sourceRef;
    this.targetRef = targetRef;
    this.type = type;
    this.isDataAssociation = true;
    this.isDataAssociationInput = type.indexOf('dataInput') === 0;
    this.isDataAssociationOutput = type.indexOf('dataOutput') === 0;
};

/**
 * @param {String} refId
 * @param {String} type
 * @constructor
 */
var BPMNDataAssociationRef = exports.BPMNDataAssociationRef = function(refId, type) {
    this.refId = refId;
    this.isDataAssociationRef = true;
    this.isDataAssociationSrcRef = type.indexOf('source') === 0;
    this.isDataAssociationTargetRef = type.indexOf('target') === 0;
};