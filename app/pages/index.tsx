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

  const handleRegistration = async () => {
    if (usersClient) {
      const user = await usersClient.createUser(new CreateUserCommand({ name, email }));
      console.log(user);
    }
  }

  return (
    <main className="py-32 md:p-32 lg:p-40">
      <Image src='/stanley-dai-ovanKMhLYec-unsplash.jpg' alt="GIG BABY" width={2000} height={350} className='h-[200px] lg:h-[350px]'style={{position: 'absolute', left: 0, top: 0, objectFit: 'cover', zIndex: -10}}/>
      <div className="flex flex-col items-center justify-center bg-pink-300 py-10 lg:py-20" >
        {/* <Image src='/logo.png' alt="GIG BABY" width={300} height={300} className='mb-10' /> */}
        <h1 className="launch-title val text-transparent text-3xl md:text-4xl lg:text-7xl">GOLDEN ISLAND GANG</h1>
      </div>
      <h3 className="val text-center p-5 text-pink-300 text-xl md:text-3xl">LAUNCH DAY COMING SOON</h3>
      <div className="text-center py-5 px-10 max-w-screen-md m-auto">
        <p>Hey Gorgeous!</p>
        <p>Make a splash with the debut of our exciting new bikini range. Get ready to be part of our special journey as we unveil our first ever collection. Sign up now for VIP access to all the juicy details and launch information. See you on the beach, babe!</p>
      </div>
      <div className="flex flex-col align-middle py-5 px-10 gap-3">
        <div className="flex flex-col justify-center w-full self-center lg:max-w-[468px]">
          <label>Name</label>
          <input type="text" className="p-2 shadow-lg rounded-sm outline-none" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="flex flex-col justify-center w-full self-center lg:max-w-[468px]">
          <label>Email</label>
          <input type="text" className="p-2 shadow-lg rounded-sm outline-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button className="bg-pink-300 rounded-md py-2 px-5 text-center flex self-center m-5 shadow-md hover:bg-pink-400"
          onClick={() => handleRegistration()}>Sign Up</button>
      </div>
      <div className='text-center py-10 '>
        <p>Let's link up!</p>
      </div>
      <Image src='/footerimg.png' alt="GIG BABY" width={1440} height={100} style={{position: 'absolute', left: 0, bottom: -200, height: '100px', objectFit: 'cover', zIndex: -10}}/>
    </main>
  )
}

export default Index;