import { useEffect, useRef, useState } from 'react';
import { CreateUserCommand, UserDto, UsersClient } from '@/api-client';
import Image from 'next/image';

import { BASE_API_URL } from '../config';

const Index = () => {

  const [usersClient, setUsersClient] = useState<UsersClient | undefined>(undefined);
  const [user, setUser] = useState<UserDto>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showResponseMessage, setShowResponseMessage] = useState<boolean>(false);
  
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
      setLoading(true);
      setName('');
      setEmail('');
      const user = await usersClient.createUser(new CreateUserCommand({ name, email }));
      setUser(user);
      setLoading(false);
      setShowResponseMessage(true);
    }
  }

  return (
    <main>
      <div className='flex justify-center p-3'>
        <h1 className="launch-title val text-transparent text-xl md:text-2xl lg:text-3xl">GOLDEN ISLAND GANG</h1>
      </div>
      <div className='banner flex justify-center items-center h-[150px] md:h-[200px] lg:h-[300px]'>
        <h3 className="text-center p-5 text-white font-bold font-serif text-2xl md:text-5xl lg:text-7xl">LAUNCH DAY COMING SOON</h3>
      </div>
      <div className="flex flex-col text-center py-10 md:py-14 px-10 max-w-screen-md m-auto font-serif">
        <h4 className='m-5'>Hey Gorgeous!</h4>
        <p>Make a splash with the debut of our exciting new bikini range. Get ready to be part of our special journey as we unveil our first ever collection. Sign up now for VIP access to all the juicy details and launch information.</p>
        <p> See you on the beach, babe!</p>
        <button className="bg-pink-300 rounded-md py-2 px-5 text-center flex self-center m-8 shadow-md text-white hover:bg-pink-400" onClick={() => handleScroll('signup')}>Hell yes to VIP access</button>
      </div>
      <div className='flex flex-col justify-center items-center m-8 text-slate-800 hover:underline hover:text-slate-900'>
        <a className='text-slate-800 hover:underline hover:text-slate-900' href='https://instagram.com/goldenislandswim' target='_blank'>Visit us on Instagram!</a>
      </div>
      <Image src='/goldenislandgangpink.png' alt="GIG BABY" width={2000} height={350} className='h-[200px] lg:h-[350px]'style={{objectFit: 'cover', zIndex: -10}}/>
      <div id="signup" className="flex flex-col justify-center px-10 gap-3 h-[90vh]">
        <h4 className='launch-title val text-transparent text-center text-xl m-6'>Golden Island Gang VIP Signup</h4>
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
        {showResponseMessage && 
          <div className='text-center'>
            {user?.alreadyExists ?
                <h4>Looks like you're already on the list!</h4> :
                <h4>Thanks for signing up!</h4>
            }
          </div>
        }
      </div>
      <div>
        <p className='text-center'>Made by Jake</p>
      </div>
    </main>
  )
}

export default Index;