// config-overrides.js
module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  console.log('config - ', config);
  return config
}