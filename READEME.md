# 실시간 채팅 서비스 제작

1. 개발 환경 구축 , JavaScript 실행
   - Visual Stuido Code
     - Codex 확장기능
   - Git
   - Node.js

   ```shell
   node server.js
   ```

2. 정적 파일(html, css, js)서버
   - sever.js
     - server = http.createServer()
     - server.listen()
     - index.html
     - #app
       - header
       - ul#messages
       - input#chat-input
       - button
     - reset.css
     - -
     - ulS
   - style.css
   - client.js
     - addEventListener("submit", (event) => {})
     - addMesessge()

3. WebSocket
   1. `npm install ws`
      - WebSocketServer, WebSocket
      - server.js
        - wss.on("connection", (ws) => {});
          - ws.on("message", (data) => {}); string -> json
          - ws.on("close", () => {});
      - client.js
        - chatForm.addEventListener("submit", ...)
          - ws.send({type : "message", text}); //json -> string
        - ws.onopen = () => {};
        - ws.onclose = () => {};
   2. Broadcast //방송
   - client A -> Server -> 모든 클라이언트
   - client B -> Server -> 모든 클라이언트
   - server.js
     - 연결된 client들 목록
       - wss.on("connection",) 할 때, client 추가
       - ws.on("close",) 할 떼 client 삭제
     - message 수신 -> broadcastmessage 객체 -> broadcast()
       - broadcastmessage 객체 = {type, text, id, timestamp}
       - broadcast() = client 목록에서 WebSocket.OPEN인 client에게 send()
   - client.js
   - message 송신 -> Server: send() when submit

- message 수신(onmessage()) -> addMessage()
