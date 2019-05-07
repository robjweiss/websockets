const NRP = require("node-redis-pubsub");
const config = {
  port: 6379,
  scope: "pixabay"
};

const nrp = new NRP(config);

module.exports = nrp;