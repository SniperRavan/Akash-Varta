{/*
import React,{ useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = React.useState(null)
  const navigate = useNavigate();
  const [name, setName] =useState(authUser?.fullName || ''); //WE CHANGE THIS FROM CONST [NAME, SETNAME] = USESTATE(AUTHUSER.FULLNAME); CAUSE WE WANT TO BE ABLE TO EDIT IT AND UPDATE IT ALSO WITHOUT GETTING AN ERROR IN CONSOLE LIKE "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. If the input is meant to be controlled, make sure to provide an initial value."
  const [bio, setBio] = useState(authUser?.bio || '');

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
        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={assets.logo_icon} alt='' />
       
      </div>
    </div>
  )
}

export default ProfilePage
*/}


{/* 1️⃣ Biggest Difference (VERY IMPORTANT)
❌ Second version has a broken function body

In your second code, this is the problem:

const handleSubmit = async (e) => {
  e.preventDefault();
  if(!selectedImg){
    await updateProfile({fullName: name, bio});
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

Then after this, you have:

}
  return (

🔴 What’s wrong?
There is one extra }
That closes the component before JSX
This causes:
unpredictable behavior
hooks / handlers not wired properly
potential runtime crashes

✅ First version is correct
In the first code, the braces are perfectly aligned and the component returns JSX properly.

2️⃣ React Import Style (Minor but cleaner)
First version
import React, { useContext, useState } from 'react'

Second version
import React,{ useContext, useState } from 'react'
const [selectedImg, setSelectedImg] = React.useState(null)

Difference
First version uses useState directly → cleaner
Second version mixes useState and React.useState → unnecessary

✅ First version is cleaner and preferred
3️⃣ Controlled Input Fix (Both are correct)

Both versions correctly do this:

const [name, setName] = useState(authUser?.fullName || "");
const [bio, setBio] = useState(authUser?.bio || "");

Why this matters
Prevents:
uncontrolled → controlled input warning
Handles first render when authUser is null

✅ Both versions are correct here

4️⃣ FileReader Logic (Cleaner in first version)
First version
reader.onloadend = async () => {
  await updateProfile({
    profilePic: reader.result,
    fullName: name,
    bio
  })
  navigate('/')
}

Second version
const base64data = reader.result;
await updateProfile({profilePic: base64data, fullName: name, bio});

Difference
Functionally identical
First version is slightly cleaner (no extra variable)
✅ Not a bug — just cleaner code

5️⃣ JSX & Styling Differences (Cosmetic only)
First version:
simpler Tailwind classes
fewer conditional classes

Second version:
more styling
more comments

🎨 This does NOT affect logic

6️⃣ Final Verdict (IMPORTANT)
✅ USE THIS VERSION (FIRST ONE)
Why?
No syntax errors
Proper component structure
Cleaner hooks usage
Safer async handling
Easier to maintain

❌ Avoid the second version because:
Extra closing brace }
Component can break silently
Harder to debug later

✅ One-Line Summary
First file = correct & production-safe
Second file = visually similar but structurally broken */}


import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)
  const navigate = useNavigate()

  // ✅ FIX 1: controlled inputs with fallback
  const [name, setName] = useState(authUser?.fullName || "")
  const [bio, setBio] = useState(authUser?.bio || "")
  const [selectedImg, setSelectedImg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ No image selected → update text only
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio })
      navigate('/')
      return
    }

    // ✅ Image selected → convert to base64
    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)

    reader.onloadend = async () => {
      await updateProfile({
        profilePic: reader.result,
        fullName: name,
        bio
      })
      navigate('/')
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
