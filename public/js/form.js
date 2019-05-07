// Socket
const socket = io();

const formElement = document.getElementById("form");

if (formElement) {
    formElement.addEventListener("submit", event => {
        event.preventDefault();

        // Username
        const usernameElement = document.getElementById("username");
        const usernameValue = usernameElement.value;
        
        // Query
        const queryElement = document.getElementById("query");
        const queryValue = queryElement.value;

        // Message
        const messageElement  = document.getElementById("message");
        const messageValue = messageElement.value;

        // Checks
        if (!usernameValue) {
            alert("Please enter a username");
        }
        else if (!queryValue) {
            alert("Please enter a search query");
        }
        else if (!messageValue)
            alert("Please enter a message");

        // OK
        else {

            // Make username readonly
            usernameElement.readOnly = true;

            // Data to send
            const data = {
                username: usernameElement.value,
                query: queryElement.value,
                message: messageElement.value
            };

            // Emit
            socket.emit('submitted', data);
            
            // Clear search query and message
            queryElement.value = '';
            messageElement.value = '';
        }
    });
}


// Update page
socket.on('results', (data) => {

    // User Name
    const usernameH1 = document.createElement("h1");
    usernameH1.innerText = data.username;
    document.body.appendChild(usernameH1);

    // Message
    const messageP = document.createElement("p");
    messageP.innerText = data.message
    document.body.appendChild(messageP);

    // Images
    for (result of data.results) {
        const img = document.createElement("img");
        img.src = result.previewURL;
        img.alt = data.query + ' image';
        document.body.appendChild(img);
    }
});