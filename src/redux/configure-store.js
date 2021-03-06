/* eslint-disable */
/**
 *
 * This file is responsible for intelligently determining which configure store is to be used. There are two reasons
 * why this is necessary:
 *
 * 1. Devtools should not be included in production builds.
 * 2. Hot module reloading support should only be taken into account for development.
 */
if (process.env.NODE_ENV === "production") {
  module.exports = require("./configure-store.prod.js");
} else {
  module.exports = require("./configure-store.dev.js");
}
