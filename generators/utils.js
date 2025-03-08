const fs = require("fs");

module.exports = {
  titleCase: function(str) {
    return str
      .split("_")
      .filter(x => x.length > 0)
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");
  },
  camelCaseToSeparate: function(camelCased) {
    const withAddedSpaces = camelCased.replace(/([A-Z])/g, " $1");
    return (
      withAddedSpaces.substr(0, 1).toUpperCase() + withAddedSpaces.substr(1)
    );
  },
  camelCaseToSnakeCase: function(camelCased) {
    const withAddedSpaces = camelCased.replace(/([A-Z])/g, " $1");
    return withAddedSpaces
      .toLowerCase()
      .trim()
      .replace(/ /g, "_");
  },

  packageToSnakeCase: function(packageName) {
    return packageName.replace(/\./g, "_");
  },

  resourceAlreadyExists: function(resource) {
    return fs.existsSync(resource);
  },

  isWorkspace: function(workspaceRoot) {
    const settingsGradle = workspaceRoot + "/settings.gradle";
    if (!fs.existsSync(settingsGradle)) {
      return false;
    }

    return true;
  },
  isFolderExists: function(folder) {
    if (!fs.existsSync(folder)) {
      return false;
    }

    return true;
  },
  writeFile: function(path, content) {
    try {
      fs.writeFileSync(path, content, { force: true });
    } catch (err) {
      console.error(err);
    }
  },
  createFolders: function(path) {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    }
  }
};
