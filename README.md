# websockets
A basic chat allowing users to send messages and images via Socket.IO websockets

## Setup
1. `npm install`
2. Redis must be running on port 6379 (default)
3. Add a [Pixabay API Key](https://pixabay.com/api/docs/) to `config/pixabay.json`

```
// pixabay.json

{
    key: <API KEY>
}
```

## About
Users can send messages to one another and see eachother's messages update in real-time. Try it out by opening two separate windows and sending messages back and forth.