import { useState, useEffect } from "react";
import Err from './Err';
import Loading from "./Loading";
import { marked } from 'marked';

const Chat = () => {

    // API logic
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const welcomeDisplay = () => {
        document.querySelector('.welcome').innerHTML = ''
    }
    useEffect(() => {

        
        const loadChat = () => {
            const chat = JSON.parse(window.localStorage.getItem('chat'))
            const chatBox = document.querySelector('.chat-box') 
            
            if(chat){
                welcomeDisplay()
                chatBox.innerHTML = ''
                chat.forEach(mssg => {
                    const div = document.createElement('div')
                    div.innerHTML = mssg.text
                    div.classList = mssg.type
                    chatBox.appendChild(div)
                });
            } 
        }
        
        loadChat()    
    },[])


    useEffect(() => {
        chatScroll();
    }, [loading, response]);
    console.log('test');
    
    async function handleSubmit(e) {
        e.preventDefault();
        welcomeDisplay()
        appendMsg(prompt);
        setPrompt('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const json = await response.json();

            if(response.ok){
                setResponse(json.response);
                setLoading(false);
                appendRes(json.response);
            }
            if(!response.ok){
                setError(json.error);
                setLoading(false);    
            }

        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const appendMsg = (content) => {
        const chatBox = document.querySelector('.chat-box');
        let msg = document.createElement('div');
        msg.classList.add('msg');
        msg.textContent = content;
        chatBox.appendChild(msg);
    };

    const appendRes = (content) => {
        const chatBox = document.querySelector('.chat-box');
        let res = document.createElement('div');
        res.classList.add('res');
        let markedText = marked(content);
        res.innerHTML = markedText;
        chatBox.appendChild(res);
        updateLocalStorage()
    };

    const updateLocalStorage = () => {
        const mssgs = document.querySelectorAll('.chat-box div');
    
        // Convert NodeList to an array, filter out elements with class "loading", and map to serializable objects
        let mssgsArray = Array.from(mssgs)
            .filter(mssg => !mssg.classList.contains('loading')) // Filter out elements with class "loading"
            .map(mssg => ({
                text: mssg.innerHTML, // Store the text content
                type: Array.from(mssg.classList).join(' ') // Convert classList to a space-separated string
            }));
    
        // Convert the array of objects to a JSON string
        let string = JSON.stringify(mssgsArray);
        
        // Store the JSON string in localStorage
        window.localStorage.setItem('chat', string);
    }
            

    const chatScroll = () => {
        const container = document.querySelector('.container');
        container.scrollTop = container.scrollHeight;
    };

    const suggestion = (e) => {
        setPrompt(e.target.textContent)
    }
    

    return (
        <>
        <div className="chat">

            <div className="container">
                <div className="chat-box">
                    <div className="welcome">
                        <img src="./logo.png" alt="" />
                        <div className="sugs">
                            <div className="sugg" onClick={suggestion}><i class="fa-solid fa-code"></i> <p>Explain the following code in detail</p></div>
                            <div className="sugg" onClick={suggestion}><i class="fa-solid fa-face-laugh-squint"></i> <p>Tell me a good joke</p></div>
                            <div className="sugg" onClick={suggestion}><i class="fa-solid fa-book-open"></i> <p>Help me study</p></div>
                            <div className="sugg" onClick={suggestion}><i class="fa-solid fa-magnifying-glass"></i> <p>Give me search results for</p></div>
                        </div>
                    </div>
                    {loading && <Loading />}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    required
                    className="inputBox"
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt} 
                    type="text"
                    placeholder="Talk to Wave..."
                />
                <button type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>

            {error && <Err error={error} setError={setError}/>}

        </div>
        </>
    );
}

export default Chat;
