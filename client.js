const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const messages = document.querySelector("#messages");

function addMessage(message) {
  const messageItem = document.createElement("li");
  messageItem.textContent = message;
  messages.appendChild(messageItem);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault(); //화면 깜빡거리는 기본 동작 막기

  const message = chatInput.value.trim(); //앞뒤 옆백 자르기

  if (!message) return; //메시지가 빈칸이면 return

  //ws.send(message); // 서버로 message 날리기
  ws.send(JSON.stringify({ type: "chat", text: message })); //json -> string
  //addMessage(message);

  chatInput.value = "";
  chatInput.focus();
});

// -------------------- Welcome WebSocket World-----------------------
const ws = new WebSocket(`ws://${location.host}`);

// ws.on("open", () => {});
ws.onopen = () => {
  console.log("서버 연결");
};
ws.onmessage = (event) => {
  //string -> json
  const data = event.data;
  const json = JSON.parse(data);
  //type : chat 0-> 채팅 창에 대화로 추가(li)
  switch (json.type) {
    case "chat":
      //팝업 화면에 json.text을 보여 주자
      addMessage(json.text);
      break;
  }
};
ws.onclose = () => {
  console.log("서버 연결 해제");
};
