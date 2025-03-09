// Workspace
"use strict";
const Generator = require("yeoman-generator");
const utils = require("../utils");

module.exports = class extends Generator {
  initializing() {
    this.success = false;
    this.versions = [
      "dxp-2024.q2.13",
      "dxp-2025.q1.0-lts",
      "portal-7.4-ga132",
      "dxp-2024.q4.7",
      "dxp-2024.q1.13",
      "dxp-2023.q4.10",
      "dxp-2024.q3.13",
      "dxp-7.4-u112"
    ];

    this.argument("name", {
      type: String,
      required: false,
      description: "Workspace name is required"
    });

    this.argument("version", {
      type: String,
      required: false,
      description: "Version is required"
    });

    this.workspaceName = this.options.name;
    this.workspaceVersion = this.options.version;
  }

  async prompting() {
    const answers = await this.prompt([
      {
        name: "name",
        message: "Workspace name?",
        type: "input",
        default: "my-workspace",
        when: !this.options.name
      },
      {
        name: "version",
        message: "Version?",
        type: "list",
        default: this.versions[3],
        when: !this.options.version,
        choices: this.versions
      }
    ]);

    if (answers.name === undefined) {
      answers.name = this.options.name;
    }

    if (answers.version === undefined) {
      answers.version = this.workspaceVersion;
    }

    this.workspaceName = answers.name;
    this.workspaceVersion = answers.version;
  }

  async writing() {
    // this.log(`Workspace name: ${this.workspaceName}`);
    // this.log(`Workspace version: ${this.workspaceVersion}`);
    // this.workspaceName = this.options.name;
    this.workspacePath = this.destinationPath(this.workspaceName);
    this.pathAlreadyExists = utils.resourceAlreadyExists(this.workspacePath);

    if (this.pathAlreadyExists) {
      this.log(`Workspace already exists... (${this.workspaceName})`);
      return false;
    }

    if (!this.versions.includes(this.workspaceVersion)) {
      this.log(
        `Workspace version does not exists... (${this.workspaceVersion})`
      );
      return false;
    }

    try {
      await this.fs.copy(
        this.templatePath("workspace"),
        this.destinationPath(this.workspaceName),
        { globOptions: { dot: true } }
      );

      await this.fs.append(
        this.workspacePath + "/gradle.properties",
        `liferay.workspace.product=${this.workspaceVersion}`
      );

      // this.writeFileFromString();
      this.success = true;
    } catch (e) {
      this.log(e.message);
    }
  }

  end() {
    if (this.success) {
      utils.dotGitIgnore(this.workspacePath + "/_gitignore");
      this.log(`Workspace created... (${this.workspaceName})`);
    }
  }
};
