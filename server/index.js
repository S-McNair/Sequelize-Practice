const server = require('./app.js');

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('Express server is listening on port ' + port);
});