import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
// import { sendMsgToOpenAI } from './openai';
import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

function App() {

  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // const hanldeSend = async () => {
  //   const res = await sendMsgToOpenAI(input)
  //   console.log(res)
  // }


  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
      console.log(result)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    console.log(input)
  };


  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className="midBtn"><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideButtom">
            <button className="query"><img src={msgIcon} alt="Query" className="" />What is programming ?</button>
            <button className="query"><img src={msgIcon} alt="Query" className="" />How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="" className="listItemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="chat">
            <img className='chatImg' src={userIcon} alt="" />
            <p className="txt">{input}</p>
          </div>
          <div className="chat bot">
            <img className='chatImg'  src={gptImgLogo} alt="" />
            <pre className="txt">{result}</pre>
          </div>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" value = {input} onChange={(e) => {setInput(e.target.value)}} placeholder='Send a message' id=''/> <button className="send" onClick={handleClick}><img src={sendBtn} alt="Send" /></button>

          </div>
          <p>ChatGPT may produce information about people, places, or facts. ChatGPT Aguest 20 Version.</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
