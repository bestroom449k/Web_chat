const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const messages = document.querySelector("#messages");
chatInput.focus();

function addMessage(senderNickname, message) {
  const li = document.createElement("li"); //<li> <li>
  // <li> 닉네임 : 메시지<li>
  if (senderNickname !== nickname) {
    const nicknameDiv = document.createElement("div");

    nicknameDiv.classList.add("nickname");

    nicknameDiv.textContent = senderNickname;

    li.appendChild(nicknameDiv);
  } //<ul id ="messages"><li>닉네임 : 메시지</li></ul>
  //<<li><div class "nickname">닉네임</div>메시지</li>
  else {
    li.classList.add("mine");
  }
  li.append(message);
  messages.appendChild(li);

  //시간 <span class= "time">시간</span>
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

const nickname = prompt("당신의 닉네임을 입력 하세요.")?.trim() || "익명";

// ws.on("open", () => {});
ws.onopen = () => {
  console.log("서버 연결");
  ws.send(JSON.stringify({ type: "join", text: nickname })); //server에 nickname 보내기
};
ws.onmessage = (event) => {
  //string -> json
  const data = event.data;
  const json = JSON.parse(data);
  //type : chat 0-> 채팅 창에 대화로 추가(li)
  switch (json.type) {
    case "chat":
      //팝업 화면에 json.text을 보여 주자
      console.log(json.nickname);
      addMessage(json.nickname, json.text);
      break;
  }
};
ws.onclose = () => {
  console.log("서버 연결 해제");
};
