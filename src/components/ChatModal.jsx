import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function ChatModal({ setShowModal, receiver }) {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.addEventListener('open', () => {
      console.log('WebSocket connected');
      setSocket(ws);

      ws.send(JSON.stringify({
        uid1: user.uid,
        uid2: receiver.uid,
        chatMessage: 'openModal',
      }));

      ws.addEventListener('message', (event) => {
        console.log(event);
        const { uid1, chatMessage } = JSON.parse(event.data);
        console.log(uid1, chatMessage);
        const newData = { uid1: uid1, chatMessage: chatMessage };
        setChatMessages([...chatMessages, newData]);
      });
    });

    ws.addEventListener('close', () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    });

    ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      ws.close();
    };
  }, [user.uid, receiver.uid]);

  const handleSendMessage = (inputValue) => {
    if (!socket) {
      console.error('Socket is not connected');
      return;
    }

    socket.send(JSON.stringify({
      uid1: user.uid,
      uid2: receiver.uid,
      chatMessage: inputValue,
    }));

    const newData = { uid1: user.uid, chatMessage: inputValue };
    setInputValue('');
    setChatMessages([...chatMessages, newData]);
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="w-2/6 h-5/6 overflow-y-auto bg-white rounded-lg p-8 flex flex-col">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">{receiver.nick_name}</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-700">X</button>
        </div>
        <div className="flex-grow overflow-auto">
          {chatMessages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.uid1 === user.uid ? 'text-right' : 'text-left'}`}>
              <div>{message.chatMessage}</div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder=" 메세지를 입력하세요"
            className="ml-4 w-4/5 mr-3"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputValue);
              }
            }}
          />
          <button
            className='ml-6 bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded'
            onClick={() => handleSendMessage(inputValue)}>전송</button>
        </div>
      </div>
    </section>
  )
}