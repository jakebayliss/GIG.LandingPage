import Image from 'next/image';

const Index = () => {
  return (
    <main className="py-32 px-40">
      <Image src='/stanley-dai-ovanKMhLYec-unsplash.jpg' alt="GIG BABY" width={1440} height={380} style={{position: 'absolute', left: 0, top: 0, height: '380px', objectFit: 'cover', zIndex: -10}}/>
      <div className="flex flex-col items-center justify-center bg-pink-300 p-10 border-orange-600 border-2" >
        <Image src='/logo.png' alt="GIG BABY" width={300} height={300} className='mb-10' />
        <h1 className="launch-title">LAUNCH DAY COMING SOON</h1>
      </div>
      <div className="text-center py-10">
        <p>Hey Gorgeous!</p>
        <p>Make a splash with the debut of our exciting new bikini range. Get ready to be part of our special journey as we unveil our first ever collection. Sign up now for VIP access to all the juicy details and launch information. See you on the beach, babe!</p>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center gap-3 mb-3">
          <div className="flex flex-col">
            <label>FIRST NAME</label>
            <input type="text" className="w-[250px] p-2" />
          </div>
          <div className="flex flex-col">
            <label>LAST NAME</label>
            <input type="text" className="w-[250px] p-2" />
          </div>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          <div className="flex flex-col justify-center align-middle">
            <label>EMAIL ADDRESS</label>
            <input type="text" className="w-[512px] p-2" />
          </div>
        </div>
        <button className="bg-pink-300 rounded-md py-2 px-5 text-center flex self-center m-5s">Sign Up</button>
      </div>
      <div className='text-center py-10 '>
        <p>Let's link up!</p>
      </div>
      <Image src='/footerimg.png' alt="GIG BABY" width={1440} height={380} style={{position: 'absolute', left: 0, bottom: -500, height: '380px', objectFit: 'cover', zIndex: -10}}/>
    </main>
  )
}

export default Index;