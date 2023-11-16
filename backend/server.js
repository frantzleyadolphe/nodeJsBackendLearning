//import package http's node
const http = require("http");
const app = require("./app");
app.set('port', process.env.PORT || 3000);
//create fuction to receive object request & response of query
const server = http.createServer(app);

//listening's port 3000 else use env port 
server.listen(process.env.PORT || 3000);
