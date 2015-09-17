//test - can I add this??
var app = require('./server.js');

var port = process.env.PORT || 5000;

app.listen(port);

console.log('Server now listening on port ' + port);
console.log('It is all working');
