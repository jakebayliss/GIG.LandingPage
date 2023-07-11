import { useEffect, useState } from 'react';
import { CreateUserCommand, UsersClient } from '@/api-client';
import Image from 'next/image';

import { BASE_API_URL } from '../config';

const Index = () => {

  const [usersClient, setUsersClient] = useState<UsersClient | undefined>(undefined);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  
  useEffect(() => {
    (async () => {
      setUsersClient(new UsersClient(BASE_API_URL));
    })();
  }, []);

  const handleScroll = (tag: string) => {
    const element = document.getElementById(tag);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleRegistration = async () => {
    if (usersClient) {
      const user = await usersClient.createUser(new CreateUserCommand({ name, email }));
      console.log(user);
    }
  }

  return (
    <main>
      <div className='flex justify-center p-3'>
        <h1 className="launch-title val text-transparent text-3xl md:text-4xl lg:text-5xl">GOLDEN ISLAND GANG</h1>
      </div>
      <div className='banner flex justify-center items-center h-[100px] md:h-[200px] lg:h-[300px]'>
        <h3 className="text-center p-5 text-white font-bold text-2xl md:text-5xl lg:text-7xl">LAUNCH DAY COMING SOON</h3>
      </div>
      <div className="flex flex-col text-center py-10 md:py-14 px-10 max-w-screen-md m-auto">
        <h4 className='m-8 font-bold'>Hey Gorgeous!</h4>
        <p>Make a splash with the debut of our exciting new bikini range. Get ready to be part of our special journey as we unveil our first ever collection. Sign up now for VIP access to all the juicy details and launch information.</p>
        <p> See you on the beach, babe!</p>
        <button className="bg-pink-300 rounded-md py-2 px-5 text-center flex self-center m-8 shadow-md text-white hover:bg-pink-400" onClick={() => handleScroll('signup')}>Hell yes to VIP access</button>
      </div>
      <div className='flex flex-col justify-center items-center m-8 text-slate-800 hover:underline hover:text-slate-900'>
        <a href='https://instagram.com/goldenislandswim' target='_blank'>Visit us on Instagram!</a>
      </div>
      <Image src='/goldenislandgangpink.png' alt="GIG BABY" width={2000} height={350} className='h-[200px] lg:h-[350px]'style={{objectFit: 'cover', zIndex: -10}}/>
      <div id="signup" className="flex flex-col justify-center py-5 px-10 gap-3 h-[80vh] md">
        <h4 className='text-center font-bold text-xl m-6'>Golden Island Gang VIP Signup</h4>
        <div className="flex flex-col justify-center w-full self-center max-w-[468px]">
          <label>Name</label>
          <input type="text" className="p-2 shadow-lg rounded-sm outline-none" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="flex flex-col justify-center w-full self-center max-w-[468px]">
          <label>Email</label>
          <input type="text" className="p-2 shadow-lg rounded-sm outline-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button className="bg-pink-300 rounded-md py-2 px-5 text-center flex self-center m-5 shadow-md text-white hover:bg-pink-400" 
          onClick={() => handleRegistration()}>
            Sign Up
        </button>
      </div>
      <div className='text-center py-10 '>
        <p className='launch-title val text-transparent'>Chat soon x</p>
      </div>
      <div>
        <p className='text-center'>Made by Jake</p>
      </div>
    </main>
  )
}

export default Index;