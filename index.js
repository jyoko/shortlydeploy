//test - can I add this??
var app = require('./server.js');

var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
