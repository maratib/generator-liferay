"use strict";

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  initializing() {
    this.log("Initializing dummy generator...");
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyFile.txt"),
      this.destinationPath("dummyFile.txt")
    );
  }

  end() {
    this.log("End dummy generator...");
  }
};
