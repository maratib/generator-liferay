"use strict";

const Generator = require("yeoman-generator");
const path = require("path");
const utils = require("../utils");

module.exports = class extends Generator {
  initializing() {
    this.success = false;
    this.argument("name", {
      type: String,
      required: false,
      description: "Theme name?"
    });

    this.argument("serverPath", {
      type: String,
      required: false,
      description: "Server path?"
    });

    this.argument("fontAwesome", {
      type: Boolean,
      required: false,
      default: false,
      description: "FontAwesome required?"
    });
  }

  async prompting() {
    const answers = await this.prompt([
      {
        name: "name",
        message: "Theme name?",
        type: "input",
        default: "my-theme",
        when: !this.options.name
      },

      {
        name: "serverPath",
        message: "Server path?",
        default: "server/liferay-dxp/tomcat",
        type: "input",
        required: true,
        when: !this.options.serverPath
      }
    ]);

    if (answers.name === undefined) {
      answers.name = this.options.name;
    }

    if (answers.serverPath === undefined) {
      answers.serverPath = this.options.serverPath;
    }

    this.themeName = answers.name;
    this.themeTitle = utils.titleCase(this.themeName);
    this.fontAwesome = this.options.fontAwesome;
    this.serverPath = answers.serverPath;

    this.rootPath = this.destinationPath(this.themeName);

    if (utils.isWorkspace(this.destinationPath())) {
      this.rootPath = this.destinationPath("themes/" + this.themeName);
    }

    if (utils.isFolderExists(this.rootPath)) {
      this.log.error(`Theme already exists... (${this.themeName})`);
      process.exit(1);
    }
  }

  writing() {
    // The ignore array is used to ignore files, push file names into this array that you want to ignore.
    const copyOpts = {
      globOptions: {
        ignore: [],
        dot: true
      }
    };

    const opts = {
      name: this.themeName,
      title: this.themeTitle,
      fontAwesome: this.fontAwesome,
      appServerPath: this.serverPath,
      deployPath: path.join(this.serverPath, "..", "deploy"),
      url: "http://localhost:8080"
    };

    this.fs.copyTpl(
      this.templatePath("source"),
      this.destinationPath(this.rootPath),
      opts,
      copyOpts
    );

    this.success = true;
  }

  // install() {
  //   const appDir = path.join(process.cwd(), this.props.name);
  //   process.chdir(appDir);
  //   this.npmInstall();
  // }

  end() {
    if (this.success) {
      this.log(`Theme created... (${this.themeName})`);
    }
  }
};
