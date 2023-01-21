import WebSocket, { WebSocketServer } from 'ws';

const ws = new WebSocket("localhost")
ws.on("open", function(){
    let payload = {
        id: 1337,
        method: 'Runtime.evaluate',
        params: {
            expression: "console.log('injected');"
        }
    }

    ws.send(payload)
})