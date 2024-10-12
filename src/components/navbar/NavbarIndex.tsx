import { useState } from 'react'
import { IoChevronDownOutline } from "react-icons/io5";
import switchbutton from "../../assets/images/navbar/SwitchButton.png";
import { Link, useNavigate } from 'react-router-dom';
import LcoOtpSendModal from '../../container/lcoRegister/modal/LcoOtpSendModal';
import PlcOtpSendModal from '../../container/plcRegister/modal/PlcOtpSendModal';
import FtaOtpSendModal from '../../container/ftaRegister/modal/FtaOtpSendModal';

function NavbarIndex() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)
  const [openPlcModal, setOpenPlcModal] = useState(false)
  const [openFtaModal, setOpenFtaModal] = useState(false)


  const handleSelectChange = (event:any) => {
    const selectedValue = event.target.value;
    
    if (selectedValue === 'lco') {
      setOpenModal(true);
    } else if (selectedValue === 'plc') {
      setOpenPlcModal(true);
    } else if (selectedValue === 'fta') {
      setOpenFtaModal(true);
    }

    event.target.value = "";
  };
  

  return (
    <>

      <div className="relative bg-[#112F4E]">
        <div className="mx-auto px-[4%] ">
          <div className="flex justify-between items-center">
            <div className="lg:hidden  ml-auto py-3 ">
              <button
                className=" p-1 items-center justify-center text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setOpen(!open)}
              >
                <svg
                  className="w-8 h-8 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <nav className="hidden  lg:flex lg:justify-between  lg:items-center !text-sm  text-white px-[3%] py-[9px]">
          <div className='flex md:gap-x-6 xl:gap-x-7'>
            <Link
              to="/"
              className={`md:text-sm   xl:text-base 2xl:text-xl hover:underline flex items-center`}
            >
              Home
            </Link>

            <select name="" id="" className='border-none bg-[#112F4E] !w-fit'>
                <option value="">Services</option>
                {/* <option value="">LCO Application</option>
                <option value="">PLC Application</option>
                <option value="">FTA Application</option> */}
              </select>

              <select name="" id="" onChange={handleSelectChange} className='border-none bg-[#112F4E] !w-fit'>
                <option value="">Forms</option>
                <option value="lco" >LCO Application</option>
                <option value="plc" >PLC Application</option>
                <option value="fta">FTA Application</option>
              </select>
            {/* <p
            onClick={()=>{navigate('/forms')
              
            }}
              className="md:text-sm  xl:text-base flex items-center  2xl:text-xl hover:underline cursor-pointer"
            >
              Forms
            </p> */}
            <a
              href="#"
              className="md:text-sm  xl:text-base flex items-center  2xl:text-xl hover:text-gray-200"
            >
              Internet Services
              <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
            </a>
            <a
              href="#"
              className="md:text-sm  xl:text-base flex items-center  2xl:text-xl  hover:text-gray-200"
            >
              Public Information
              <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
            </a>

            <a
              href="#"
              className="md:text-sm  xl:text-base flex items-center  2xl:text-xl hover:text-gray-200"
            >
              Gallery
              <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
            </a>
            <a
              href="#"
              className="md:text-sm  xl:text-base flex items-center  2xl:text-xl hover:text-gray-200"
            >
              About Us
              <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
            </a>

            <a
              href="#"
              className="md:text-sm  xl:text-base flex items-center  2xl:text-xl hover:text-gray-200"
            >
              Contact Us
            </a>
          </div>
          <div className='flex  gap-x-1 '>
            <h1 className='md:text-sm xl:text-base xl:font-medium 2xl:text-xl'>English</h1>
            <span className=''> <img src={switchbutton} alt="NoImage" className='md:w-8 xl:w-10' /></span>
            <h1 className='md:text-sm xl:text-base xl:font-medium 2xl:text-xl'>தமிழ்</h1>
          </div>
        </nav>
        {/*
  Mobile menu, show/hide based on mobile menu state.

  Entering: "duration-200 ease-out"
    From: ""
    To: ""
  Leaving: "duration-100 ease-in"
    From: "opacity-100 scale-100"
    To: "opacity-0 scale-95"
*/}

        <div
          className={
            open
              ? "block scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2  transform origin-top-right z-50 "
              : "hidden scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right  "
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-missionColor text-black divide-y-2 divide-gray-50 rounded-t-lg ">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img height={20} width={20} className="h-10 w-auto" alt='WorkFlow' src="/src//assets//images//home/headerTop//tactv_logo.png" />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6 cursor-pointer ">
                <nav className='grid gap-y-4'>
                  <a
                    href="/"
                    className={`text-lg font-medium hover:text-gray-400 `}
                  >
                    Home
                  </a>

                  <a
                    href="/"
                    className="text-lg flex items-center font-medium  hover:text-gray-400 "
                  >
                    Services
                    <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
                  </a>


                  <p
                      onClick={()=>navigate('/forms')}
                    className="text-lg font-medium  hover:text-gray-400 "
                  >
                    Forms
                  </p>
                  <a
                    href="#"
                    className="text-lg flex items-center font-medium hover:text-gray-400 "
                  >
                    Internet Services
                    <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
                  </a>
                  <a
                    href="#"
                    className="text-lg flex items-center font-medium  hover:text-gray-400 "
                  >
                    Public Information
                    <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
                  </a>

                  <a
                    href="#"
                    className="text-lg flex items-center font-medium  hover:text-gray-400 "
                  >
                    Gallery
                    <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
                  </a>
                  <a
                    href="#"
                    className="text-lg flex items-center font-medium  hover:text-gray-400 "
                  >
                    About Us
                    <span className='pl-1'><IoChevronDownOutline className='w-4 h-5' /></span>
                  </a>

                  <a
                    href="#"
                    className="text-lg font-medium  hover:text-gray-400 "
                  >
                    Contact Us
                  </a>
                </nav>
              </div>
            </div>

          </div>
        </div>
      </div>

      {openModal && (
        <LcoOtpSendModal
          isOpenModal={openModal}
          toggle={() => setOpenModal(!openModal)} // Close modal without navigation
        />
      )}

      {/* PLC Application Modal */}
      {openPlcModal && (
        <PlcOtpSendModal
          isOpenModal={openPlcModal}
          toggle={() => setOpenPlcModal(!openPlcModal)} // Close modal without navigation
        />
      )}
      {/* FTA application form */}
      {openFtaModal && (
        <FtaOtpSendModal
          isOpenModal={openFtaModal}
          toggle={() => setOpenFtaModal(!openFtaModal)} // Close modal without navigation
        />
      )}
    </>
  )
}

export default NavbarIndex
