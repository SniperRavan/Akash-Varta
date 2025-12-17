import React, { useEffect } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {


  const scrollEnd = React.useRef(null);
  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: 'smooth' });
  },[])
  /*useEffect(() => {
  if (scrollEnd.current) {
    scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
  }
}, []);*/

// This also can be done using scrollIntoView API but above is fine too cause of better browser support and also this version is shorter.

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat content */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              message.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'
            }`}
          >
            {message.image ? (
              <img
                src={message.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`max-w-[200px] p-2 md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  message.senderId === '680f50e4f10f3cd28382ecf9'
                    ? 'rounded-br-none'
                    : 'rounded-bl-none'
                }`}
              >
                {message.text}
              </p>
            )}

            <div className="text-xs text-center">
              <img
                src={
                  message.senderId === '680f50e4f10f3cd28382ecf9'
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">{formatMessageTime(message.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

        {/* bottom area */}

      <div className="absolute bottom-0 left-0 flex items-center gap-3 p-3 w-full"> {/*need to add i guess w-full this is going to get the lefted area in the wide of the 2nd grid*/}
      {/* <div className="absolute bottom-0 left-0 w-full p-4 bg-black/50 backdrop-blur-lg border-t border-stone-500"> */}
          <div className='flex flex-1 items-center bg-gray-100/12 px-3 rounded-full'>  
            <input type='text' placeholder='Send a messege'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
            {/* <input type='file' id='image' accept='image/png, image/jpeg' hidden /> */}
            <input type='file' hidden id='fileInput'/>
            {/* <label htmlFor='image'> */}
            <label htmlFor='fileInput'>
              <img src={assets.gallery_icon} alt='' className='w-5 mr-2 cursor-pointer'/>
            </label>
          </div>
          <img src={assets.send_button} alt='' className='w-7 cursor-pointer'/> 
          {/* can be change the className='w-7 cursor pointer' or this className='w-7 cursor-pointer absolute right-6 bottom-6' in further*/}
    </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere.</p>
    </div>
  );
};

export default ChatContainer;