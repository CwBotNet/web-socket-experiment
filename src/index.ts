import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req: any, res: any) => {
  console.log(new Date() + " Recived request for " + req.url);
  res.end("hi there");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, {
          binary: isBinary,
        });
      }
    });
  });

  ws.send("hello! Message form server");
});

server.listen(8080, () => {
  console.log(new Date() + " Server is listening on port 8080 ");
});
