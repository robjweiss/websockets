const fetch = require('node-fetch');
const redisConnection = require("./config/redis-connection");
const pixabay = require('./config/pixabay.json');
const key = pixabay.key;

(async () => {
    redisConnection.on("search:request:*", async (message, channel) => {
        const requestId = message.requestId;
        const eventName = message.eventName;
        
        const successEvent = `${eventName}:success:${requestId}`;
        const failedEvent = `${eventName}:failed:${requestId}`;
        
        // Build URL
        const query = message.data.query;
        const url = 'https://pixabay.com/api/?key=' + key + '&q=' + query;

        try {
            // API Call
            const res = await fetch(url);
            const json = await res.json();
            const hits = json.hits;

            // Success
            redisConnection.emit(successEvent, {
                requestId: requestId,
                data: hits,
                eventName: eventName
            });
        } catch(e) {
            // Failure
            redisConnection.emit(failedEvent, {
                requestId: requestId,
                data: {
                    message: "An error occurred searching Pixabay"
                },
                eventName: eventName
            });
        }
    });
})();