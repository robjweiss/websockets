const express = require("express");
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const redisConnection = require("./config/redis-connection");
const nrpSender = require("./utils/nrp-sender-shim");
const io = require('socket.io')(http);

app.use(bodyParser.json());

const static = express.static(__dirname + "/public");
app.use("/public", static);

app.get("/", async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('submitted', async (data) => {
        try {
            const response = await nrpSender.sendMessage({
                redis: redisConnection,
                eventName: "search",
                data: data,
                expectsResponse: true
            });

            // Append results to data
            data.results = response;

            io.emit('results', data);

        } catch (e) {
            console.log(e.message);
        }
    });
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

http.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
});