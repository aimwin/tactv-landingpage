import tactvLogo from "../../../assets/images/home/headerTop/tactv_logo.png"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useState } from "react";
import "./OtpModal.css"
import { mobileOTPSignupLco } from "../../../api-service/api/authApi";
import toast from "react-hot-toast";
import OtpVerifyModal from "./OtpVerifyModal";
import { MdCancel } from "react-icons/md";


function LcoOtpSendModal({ isOpenModal, toggle }: any) {

  if(!isOpenModal) return null;

  const [mobile, setMobile] = useState<string>('')
  const [isModalVerify, setIsModalVerify] = useState(false)
  const [roleData , setRoleData] = useState('')

  const schema = yup.object().shape({
    mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number should be 10 digits"),
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const mobileSend = async (data: any) => {

    setMobile(data.mobile)

    const payload = {
      mobile: data.mobile,
      name: data.name
    }
    const mobileStatus = await mobileOTPSignupLco(payload);
    console.log(mobileStatus);
    
    if (mobileStatus?.status === 200) {
      toast.success('OTP Send Successfully!');
      setRoleData(mobileStatus?.data)
      setIsModalVerify(true)
      // toggle()
    }
  }

  return (
    <>
      <div className='bg-[#11304e] fixed inset-0 z-50 flex  justify-center bg-opacity-50' >
        <div className='bg-white p-4 rounded-lg max-w-sm w-full flex flex-col max-h-[90%] h-fit overflow-y-scroll animate-slideTop hide-scrollbar'>
          <div className="flex flex-col  justify-center ">
            <div className='flex justify-center items-center flex-col'>
              <img src={tactvLogo} className="w-20" alt="No Image" />
              <h1 className='text-2xl   font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-[#914D1C]'>TACTV</h1>
              <h2 className='font-bold text-sm text-secondaryColor'>தமிழ் நாடு அரசு கேபிள் டிவி நிறுவனம்</h2>
            </div>
            <p className="  font-bold mt-3">
              LCO Application Registration
            </p>
            <form onSubmit={handleSubmit(mobileSend)}>
              <div className=' mt-[6px]'>
                {/* <h2 className='text-[#333333] text-sm'>Application Name</h2>
                <input
                  {...register("name")} 
                  className='mt-[2px] w-full rounded-md placeholder:text-xs p-2 flex items-center bg-[#F1F1F1] focus:outline-primaryColor' type="text" placeholder='Enter Your Name' />
                {errors.name && <p className='text-red-500 text-xs mt-1 font-medium'>{errors.name.message}</p>} */}

                <h2 className='mt-2 text-[#333333] text-sm'>Mobile No</h2>
                <input
                  {...register("mobile")}
                  className='custom-number-input  mt-[2px] w-full rounded-md placeholder:text-xs p-2  flex items-center bg-[#F1F1F1] focus:outline-primaryColor' type="number" placeholder='Enter Your Number'
                  onInput={(e) => {
                    const input = e.currentTarget.value;
                    const cleanedInput = input.replace(/\D/g, '');
                    if (/^[6-9][0-9]{0,9}$/.test(cleanedInput)) {
                      e.currentTarget.value = cleanedInput;
                    } else {
                      e.currentTarget.value = cleanedInput.slice(0, -1);
                    }
                  }}
                  maxLength={10} />
                {errors.mobile && <p className='text-red-400 text-xs mt-1 font-medium'>{errors.mobile.message}</p>}

                </div>
                
                    <button  type='submit'  className='bg-primaryColor text-white mt-4 w-full py-2 rounded-md'  >
                        Send OTP
                    </button>
                
                </form>
                {/* <h2 className='text-center text-sm mt-3'>Already have an account? <a href="https://appicms.aimwindow.in/login" target='_blank' className='text-primaryColor underline font-semibold'>Log in</a></h2> */}
            </div>
            <MdCancel className='w-5 h-5 absolute top-0 right-0 mr-4 mt-4 cursor-pointer hover:scale-105 duration-300 transition-all ease-in' onClick={() => {
          toggle()
          setMobile("")
        }} />
        </div>
       
      </div >

      <OtpVerifyModal isOpenverify={isModalVerify} toggleModal={() => setIsModalVerify(!isModalVerify)} mobile={mobile} toggleOtpSend={toggle} setMobile={setMobile}  roleData={roleData}/>
    </>
  )
}

export default LcoOtpSendModal