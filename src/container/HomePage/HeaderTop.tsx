import tamilnadulogo from "../../assets/images/home/headerTop/tamilnadu_logo.png"
import tactvlogo from "../../assets/images/home/headerTop/tactv_logo.png"
import mkstalinimg from "../../assets/images/home/headerTop/mkstalin_img.png"
import kalaingarimg from "../../assets/images/home/headerTop/kalaingar_img.png"
import newImg from "../../assets/images/home/headerTop/new_img.png"
import LcoOtpSendModal from "../lcoRegister/modal/LcoOtpSendModal"
import { MdOutlineCall } from "react-icons/md";
import { useState } from "react"

function HeaderTop() {

  const [openModal, setOpenModal] = useState(false)

  const handleSelectChange = (event:any) => {
    const selectedValue = event.target.value;
    
    if (selectedValue === 'admin' || selectedValue === 'dm' || selectedValue === 'lco' || selectedValue === 'plc' || selectedValue === 'fta') {
      window.open("https://partner.tactv.in/app/login","_blank")
    } 
    event.target.value = "";
  };

  return (
    <>
      <div className="font-Inter">
        <div className=" flex  items-center  justify-between gap-2 md:gap-0 px-[3%] pb-3 md:py-3 2xl:py-4">
          <div className=" flex justify-center items-center gap-2 md:gap-3 lg:gap-5 ">
            <img src={tamilnadulogo} className="w-14 md:w-20 lg:w-24 2xl:w-28" alt="" />
            <img src={tactvlogo} className="w-16 md:w-20  lg:w-24  2xl:w-[122px]" alt="" />
          </div>
          <div className="text-center text-[#333333] leading-8 mt-4 md:mt-0">
            <p className="font-medium md:font-bold text-[9px] md:text-lg 2xl:text-2xl">TAMIL NADU ARASU CABLE TV CORPORATION LIMITED (TACTV)</p>
            <p className="text-[6px] font-medium md:text-sm 2xl:text-lg md:mt-2 leading-5">(A Government of Tamil Nadu Undertaking) CIN NO: U64204TN2007SGC064958</p>
            <p className="font-bold text-[12px] md:text-[16px]  md:mt-[6px] 2xl:text-2xl">தமிழ்நாடு அரசு கேபிள் டிவி நிறுவனம்</p>
            <p className="font-semibold text-xs 2xl:text-lg">(தமிழ்நாடு அரசு நிறுவனம்)</p>
          </div>
          <div className="flex justify-center items-center gap-5 mt-3 md:mt-0 md:gap-3 lg:gap-5">
            <img src={mkstalinimg} className="w-14 md:w-20 xl:w-24 2xl:w-28" alt="" />
            <img src={kalaingarimg} className="w-14 md:w-20 xl:w-24 2xl:w-28" alt="" />
          </div>
        </div>
        <div className="bg-[#AEDEF836] px-[3%] py-2 md:flex md:justify-between md:items-center">
          <div className=" flex items-center ">
            <img src={newImg} className="w-14 me-1 2xl:me-2 " alt="" />
            <p className="text-[#111111] font-medium 2xl:text-xl">Tamil Nadu cable TV operators / Workers welfare board</p>
          </div>
          <div className="flex-row md:flex md:items-center md:space-x-1 xl:space-x-2  2xl:space-x-3 mt-2 md:mt-0">
            <button
              className=" me-6 md:me-0 xl:me-2 2xl:me-3 2xl:text-xl border-[#112F4E] border-[1px] px-2 py-2  rounded-md hover:bg-[#112F4E] hover:text-white"
              onClick={() => setOpenModal(true)}
            >
              LCO Online Application
            </button>
            {/* <button className="underline me-2 md:me-0 2xl:me-3 2xl:text-xl">Set-top box login</button> */}
            <div className="flex md:flex-none gap-3 mt-4 md:mt-0">
            <select name="" id="" onChange={handleSelectChange} className='border-primaryColor border-[1px] outline-primaryColor focus:stroke-primaryColor bg-primaryColor text-white rounded-md px-1  !w-fit'>
                <option value="">Login</option>
                <option value="admin" >ADMIN Login</option>
                <option value="dm" >DM Login</option>
                <option value="lco" >LCO Login</option>
                <option value="plc" >PLC Login</option>
                <option value="fta">FTA Login</option>
              </select>
              {/* <button className="bg-[#112F4E] text-white px-5  py-2 rounded-md me-5 2xl:me-3 2xl:text-xl"
                onClick={()=>window.open("https://partner.tactv.in/app/login","_blank")}>Login</button> */}
              <button className="flex items-center border-[#112F4E] border-[1px] text-[#112F4E] px-2 py-2  rounded-md text-md  2xl:text-xl"><MdOutlineCall className="size-6 " /><span>Toll free</span></button>
            </div>
          </div>
        </div>
      </div>



      {/* Modal */}
      {openModal && (
        <LcoOtpSendModal
          isOpenModal={openModal}
          toggle={() => setOpenModal(false)} // Close modal without navigation
        />
      )}


    </>
  )
}

export default HeaderTop
