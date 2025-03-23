const ejs = require("ejs");
const {
  language,
  bnd,
  viewJSP,
  portlet,
  portletConstants
} = require("./portlet.templates");
const utils = require("../utils");
ejs.delimiter = "?";

module.exports = {
  createBndFile: function(path, projectName, packageName, portletName) {
    utils.createFolders(path);
    path += "/bnd.bnd";
    const fileContent = ejs.render(bnd, {
      projectName,
      packageName,
      portletName
    });
    utils.writeFile(path, fileContent);
  },
  createLanguagePropertiesFile: function(path, portletName, packageName) {
    path += "/content";
    utils.createFolders(path);
    path += "/Language.properties";
    const packageGroup = utils.packageToSnakeCase(
      packageName + "." + portletName
    );

    const fileContent = ejs.render(language, {
      portletName,
      packageGroup
    });
    utils.writeFile(path, fileContent);
  },
  createViewJSP: function(path, portletName) {
    path += "/META-INF/resources";
    utils.createFolders(path);
    path += "/view.jsp";
    const fileContent = ejs.render(viewJSP, { portletName });
    utils.writeFile(path, fileContent);
  },
  createPortletClass: function(path, portletName, packageName) {
    path += "/portlet";
    utils.createFolders(path);
    path += `/${portletName}.java`;

    const fileContent = ejs.render(portlet, {
      portletName,
      packageName
    });

    utils.writeFile(path, fileContent);
  },
  createPortletConstantsClass: function(path, portletName, packageName) {
    const packageGroup = utils.packageToSnakeCase(
      packageName + "." + portletName
    );

    path += "/constants";
    utils.createFolders(path);
    path += `/${portletName}Keys.java`;

    const fileContent = ejs.render(portletConstants, {
      portletName,
      packageName,
      packageGroup
    });

    utils.writeFile(path, fileContent);
  }
};
