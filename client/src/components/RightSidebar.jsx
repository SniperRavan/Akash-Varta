import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const RightSidebar = ({selectedUser}) => {
  const { logout } = useContext(AuthContext);
  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white relative w-full overflow-y-scroll ${
      selectedUser ? "max-md:hidden":""}`}>

      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light 
      mx-auto'>
        <img src={selectedUser?.profilePicture || assets.avatar_icon} alt=""
        className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center 
        gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4' />
      
      <div className='px-5 text-sm'>
        <p>Media</p>

      <div className='mt-2 max-h-[500px] overflow-y-scroll grid grid-cols-2 
      gap-4 opacity-80'>
        {imagesDummyData.map((url, index) => (
          <div key={index} onClick={()=> window.open(url)}
          className='cursor-pointer rounded'>
            <img src={url} alt="" className='h-full rounded-md' />
      </div>
        ))}
      </div>
      </div>

        <button className='absolute bottom-5 left-1/2 -translate-x-1/2
    bg-gradient-to-r from-purple-500 to-violet-600
    px-20 py-2 rounded-full font-light text-white text-medium
    shadow-[0_0_20px_rgba(139,92,246,0.6)]
    hover:shadow-[0_0_35px_rgba(139,92,246,0.9)]
    active:scale-95 active:shadow-[0_0_12px_rgba(139,92,246,0.5)]
    transition-all duration-150 ease-out cursor-pointer'
    onClick={logout}
    >
          LogOut
        </button>

    </div>
  )
}

export default RightSidebar;
