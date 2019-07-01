let config = {};
config.port = 8080;
config.allowedCorsOrigin = "*";
config.env = "dev";
config.db = {
    uri: 'mongodb+srv://test:Qoc9AYACNtBhRsK9@assignmentdb-fuyzc.mongodb.net/test?retryWrites=true&w=majority'
}
module.exports = {
    port: config.port,
    allowedCorsOrigin: config.allowedCorsOrigin,
    environment: config.env,
    dbStrng: config.db.uri
}
// test
// Qoc9AYACNtBhRsK9




