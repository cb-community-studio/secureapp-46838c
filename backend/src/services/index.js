const users = require("./users/users.service.js");
const reports = require("./reports/reports.service.js");
const conversations = require("./conversations/conversations.service.js");
const companies = require("./companies/companies.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(reports);
  app.configure(conversations);
  app.configure(companies);
  // ~cb-add-configure-service-name~
};
