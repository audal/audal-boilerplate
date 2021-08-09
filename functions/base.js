const { resolve } = require("appsby");
const Form = require("../server/form");

exports.handler = async (event) => {
  if (process.env.NETLIFY_DEV) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  }

  process.env.overrideNodeEnv = "development";
  global.appsbyAPI = [{ endpoint: "form", handler: Form }];

  return resolve(event);
};
