"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helix_js_1 = require("helix-js");
const inferno_1 = require("inferno");
const createElement = require("inferno-create-element");
exports.h = createElement;
function renderer(dom) {
    let _dom = dom;
    return function (node, state, prev, actions) {
        if (node) {
            inferno_1.default.render(node(state, prev, actions), _dom);
        }
    };
}
function default_1(opts) {
    const config = Object.assign({}, opts, {
        render: renderer(opts.mount),
    });
    return helix_js_1.default(config);
}
exports.default = default_1;
