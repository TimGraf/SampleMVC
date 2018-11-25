"use strict";

var environment = (process.env.NODE_ENV || "development").trim();

if (environment === "development") {
    console.log("Building development...");
    module.exports = require("./webpack.config.dev.js");
} 
else {
    console.log("Building production...");
    module.exports = require("./webpack.config.prod.js");
}