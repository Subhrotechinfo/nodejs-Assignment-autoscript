let config = {};
config.port = 8080;
config.allowedCorsOrigin = "*";
config.env = "dev";
config.db = {
    uri: 'mongodb://127.0.0.1:27017/assignment'
}
module.exports = {
    port: config.port,
    allowedCorsOrigin: config.allowedCorsOrigin,
    environment: config.env,
    dbStrng: config.db.uri
}








