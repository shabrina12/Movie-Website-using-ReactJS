import { FaXTwitter, FaTiktok, FaInstagram, FaDiscord } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='px-10 py-8 mx-auto w-full text-white flex flex-col justify-between items-center gap-10'>
        <h2 className='text-red-500'>HYPER</h2>

        <div className="text-white opacity-50">
            <ul className="flex flex-wrap justify-center gap-4">
                <li className='mx-4'>
                    Horor
                </li>
                <li className='mx-4'>
                    Action
                </li>
                <li className='mx-4'>
                    Adventure
                </li>
                <li className='mx-4'>
                    Sci-Fi
                </li>
                <li className='mx-4'>
                    Comedy
                </li>
                <li className='mx-4'>
                    Romance
                </li>
                <li className='mx-4'>
                    Animation
                </li>
            </ul>            
        </div>

        <div className='social flex gap-5'>
            <div className="bg-gray-800 rounded-full p-3">
                <FaXTwitter className="size-6 cursor-pointer" />
            </div>
            <div className="bg-gray-800 rounded-full p-3">
                <FaInstagram className="size-6 cursor-pointer"/>
            </div>
            <div className="bg-gray-800 rounded-full p-3">
                <FaTiktok className="size-6 cursor-pointer"/>
            </div>
            <div className="bg-gray-800 rounded-full p-3">
                <FaDiscord className="size-6 cursor-pointer"/>
            </div>
        </div>

        <p className="text-white opacity-50 text-center">HyperFlix 2024 Designed By Faruk Yurtseven. Code by Shabrina12 on github. All Rights Reserved</p>
    </div>
  )
}

export default Footer