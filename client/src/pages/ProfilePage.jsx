import React,{ useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = React.useState(null)
  const navigate = useNavigate();
  const [name, setName] =useState('Martin Jhonson')
  const [bio, setBio] = useState('Hi Everyone! I am using QuickChat.')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio});
    // Handle profile update logic here
    navigate('/');
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(selectedImg);
  reader.onloadend = async () => {
    const base64data = reader.result;
    await updateProfile({profilePic: base64data, fullName: name, bio});
    navigate('/');
  }
}
  return (
    <div className='min-h-screen bg-cover bg-no-repeat 
    flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-sm:flex-col-reverse
      rounded-lg'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
{/* Upload Profile image if this is going to be implemented then it is going to be first and then the image is going to show */}
            <input onChange={(e)=>setSelectedImg(e.target.files[0])} type='file' id='avatar' accept='.png, .jpg, .jpeg, .gif'
             className='p-2 rounded-md bg-gray-700' hidden />
             <img src= {selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=''
             className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
             Upload Profile image
          </label>
          <input type='text' value={name} onChange={(e)=>setName(e.target.value)}
           className='p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2
           focus:ring-violet-500' />
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} rows={4}
           className='p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2
           focus:ring-violet-500' />
          <button type='submit' className="bg-gradient-to-r from-purple-500 to-violet-900 text-white
              font-semibold py-3 px-4 rounded-md
              shadow-[0_4px_24px_0_rgba(111,78,124,0.17),0_1.5px_7px_0_rgba(185,124,255,0.19)]
              hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28),0_2.5px_15px_0_rgba(185,124,255,0.33)]
              active:scale-95 active:shadow-[0_2px_8px_0_rgba(111,78,124,0.13),0_1px_4px_0_rgba(185,124,255,0.11)]
              transition-all duration-150 ease-out cursor-pointer">Save Changes</button>
        </form>
        <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' src={assets.logo_icon} alt='' />
       
      </div>
    </div>
  )
}

export default ProfilePage
