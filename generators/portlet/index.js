// Portlet
"use strict";

const Generator = require("yeoman-generator");
const utils = require("../utils");
const portlet = require("./portlet");
module.exports = class extends Generator {
  initializing() {
    this.success = false;
    this.argument("name", {
      type: String,
      required: false,
      description: "Project name is required"
    });

    this.argument("portlet", {
      type: String,
      required: false,
      description: "Portlet Name is required"
    });

    this.argument("package", {
      type: String,
      required: false,
      description: "Package is required"
    });
  }

  async prompting() {
    const answers = await this.prompt([
      {
        name: "name",
        message: "Project name?",
        type: "input",
        default: "my-project",
        when: !this.options.name
      },
      {
        name: "portlet",
        message: "Portlet name?",
        type: "input",
        default: "MyPortlet",
        when: !this.options.portlet
      },
      {
        name: "package",
        message: "Package name?",
        type: "input",
        default: "com.package.docs",
        when: !this.options.package
      }
    ]);

    if (answers.name === undefined) {
      answers.name = this.options.name;
    }

    if (answers.portlet === undefined) {
      answers.portlet = this.options.portlet;
    }

    if (answers.package === undefined) {
      answers.package = this.options.package;
    }

    this.projectName = answers.name;
    this.portletName = answers.portlet;
    this.packageName = answers.package;
    this.packagePath = this.packageName.replace(/\./g, "/");
    this.rootPath = this.destinationPath("modules/" + this.projectName);

    // Check if this generator is used in a Liferay workspace
    if (!utils.isWorkspace(this.destinationPath())) {
      this.log.error("This generator must be used in a Liferay workspace");
      process.exit(1);
    }

    // Check if project already exists
    if (utils.isFolderExists(this.rootPath)) {
      this.log.error(`Project already exists... (${this.projectName})`);
      process.exit(1);
    }
  }

  writing() {
    this.resourcePath = this.rootPath + "/src/main/resources";
    this.packagePath = this.rootPath + "/src/main/java/" + this.packagePath;

    // Create java root folder
    utils.createFolders(this.packagePath);
    // Create bnd file
    portlet.createBndFile(this.rootPath, this.projectName, this.packageName);
    portlet.createLanguagePropertiesFile(
      this.resourcePath,
      this.portletName,
      this.packageName
    );
    portlet.createViewJSP(this.resourcePath, this.portletName);
    portlet.createPortletClass(
      this.packagePath,
      this.portletName,
      this.packageName
    );
    portlet.createPortletConstantsClass(
      this.packagePath,
      this.portletName,
      this.packageName
    );
    try {
      this.fs.copy(
        this.templatePath("source"),
        this.destinationPath(this.rootPath),
        { globOptions: { dot: true } }
      );

      this.success = true;
    } catch (err) {
      this.success = false;
      console.log(err);
    }
  }

  end() {
    if (this.success) {
      utils.dotGitIgnore(this.rootPath + "/_gitignore");
      this.log(`Project created... (${this.projectName})`);
    }
  }
};

// blade create -t mvc-portlet -p com.liferay.docs.guestbook -c GuestbookPortlet my-guestbook-project
