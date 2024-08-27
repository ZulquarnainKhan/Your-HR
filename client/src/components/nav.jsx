// import {logo} from '../assets/images
import { useState } from "react";
import hamburger from "../assets/icons/hamburger.svg";
// import cross from "../assets/icons/cross.svg";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    // <header className='padding-x py-8 absolute z-10 w-full navbar'>
    <header className=' py-6 absolute z-10 w-full navbar'>
      <nav className='flex justify-between items-center max-container '>
        {!isOpen ? <a href='/'>
          {/* <img src="./../assets/images/logo.png" alt="Logo" width={130} height={29} > */}
          {/* <img src={logo} alt="Logo" width={130} height={29} />
           */}
          <h1 className='text-3xl font-bold'>YourHR</h1>
        </a> : <></>}
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden semi_bold'>
          {/* {navLinks.map((item) => ( */}
          <li>
            <a
              href="#home"
              className='font-montserrat leading-normal '
            >
              Home
            </a>
          </li>
          {/* <li >
            <a
              href="#about"
              className='font-montserrat leading-normal'
            >
              About
            </a>
          </li> */}
          <li>
            <a
              href="#service"
              className='font-montserrat leading-normal'
            >
              Service
            </a>
          </li>
          <li>
            <a
              href="#project"
              className='font-montserrat leading-normal'
            >
              Project
            </a>
          </li>
          {/* <li>
            <a
              href="#blog"
              className='font-montserrat leading-normal'
            >
              Blog
            </a>
          </li> */}
          <li>
            <a
              href="#contact"
              className='font-montserrat leading-normal'
            >
              Contact
            </a>
          </li>
          {/* ))} */}
        </ul>
        {!isOpen ?
        <div className='flex justify-between items-center gap-2 text-lg leading-normal font-medium font-montserrat max-md:hidden wide:mr-24'>
          {/* <a href='/'>Sign in</a> */}
          {/* <span>/</span> */}
          {/* <MdOutlineShoppingBag className='nav_cart nav_search' /> */}
          {/* <IoIosSearch className='nav_search' /> */}
          <Link to='/login' className="nav_btn">
              LOGIN
          </Link>
        </div>
        :<></>}
        <div className='hidden max-lg:block  mr-14 '>
          <button onClick={toggleMenu}>
            {isOpen ?
              <section className='flex-col justify-start w-[100vw]'>
                <div className='flex justify-between w-full px-8 max-sm:px-6'>

                  <a href='/'>
                    {/* <img src="./../assets/images/logo.png" alt="Logo" width={130} height={29} > */}
                    {/* <img src={logo} alt="Logo" width={130} height={29} />
                     */}
                     <h1 className='text-2xl font-bold'>YourHR</h1>
                  </a>
                  <IoClose className='text-3xl' />
                </div>
                <ul className={`flex-1 flex justify-evenly items-center gap-2 max-lg:pt-6 max-sm:flex-col max-sm:items-start max-sm:px-6 ${isOpen ? 'block' : 'hidden'}`}>
                  <li>
                    <a href="#home" className='font-montserrat leading-normal'>Home</a>
                  </li>
                  {/* <li>
                    <a href="#about" className='font-montserrat leading-normal'>About</a>
                  </li> */}
                  <li>
                    <a href="#service" className='font-montserrat leading-normal'>Service</a>
                  </li>
                  <li>
                    <a href="#project" className='font-montserrat leading-normal'>Project</a>
                  </li>
                  {/* <li>
                    <a href="#blog" className='font-montserrat leading-normal'>Blog</a>
                  </li> */}
                  <li>
                    <a href="#contact" className='font-montserrat leading-normal'>Contact</a>
                  </li>
                </ul>
              </section>


              : <img src={hamburger} alt="Hamburger" width={25} height={25} />}
          </button>
        </div>
      </nav>
      
    </header>
  )
}

export default Nav