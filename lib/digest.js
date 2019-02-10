var md5 = require("md5");
var _ = require("lodash");

const normalizeData = initialData => {
  if (!initialData) {
    return JSON.stringify({});
  }

  if (_.isString(initialData)) {
    return initialData;
  }

  return JSON.stringify(initialData);
};

function key(axiosConfig) {
  // Content-Length is calculated automatically by Axios before sending a request
  // We don't want to include it here because it could be changed by axios

  const data = normalizeData(axiosConfig.data);
  const params = normalizeData(axiosConfig.params);
  const url = axiosConfig.url.replace(/^https?:\/\/[^\/]*/, "");

  var baseConfig = {
    url,
    method: axiosConfig.method,
    data,
    params
  };

  return md5(JSON.stringify(baseConfig));
}

module.exports = key;
