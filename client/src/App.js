import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import axios from "axios";

import "@chatui/core/dist/index.css";


const request =  (jsonObj) => {
  const api = "/api"
  const headers = {
    'Content-Type': 'application/json'
  }
  const promise = axios.post(api, jsonObj, {
    headers: headers
  })
  return promise.then((response) => response.data)
}


const parseQuery = (query) => {
  return query
}


function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      let text = "沉默是金；）"

      const query = parseQuery(val)

      const jsonObj = {
        service: "stock",
        method: "getTopRise",
        kwargs: { query: query }
      }

      request(jsonObj)
      .then(data => {
        text = data["response"]
      })
      .catch(error => {
        console.log(error)
      })

      setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: text }
        })
      }, 1000)
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "大白的弟弟小白，喜欢自称小沙弥；）" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}

export default App;

