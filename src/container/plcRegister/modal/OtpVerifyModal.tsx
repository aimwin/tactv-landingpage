import { Button } from "flowbite-react";
import OTPInput from "react-otp-input";
import { useEffect, useState } from "react";
import {
    getProfileApi,
    mobileOTPSignup,
    mobileOTPSignUpVerify,
} from "../../../api-service/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import tactvLogo from "../../../assets/images/home/headerTop/tactv_logo.png";
import approvalImg from "../../../assets/images/lcoRegister/approval_icon.svg";
import { FaCircleXmark } from "react-icons/fa6";

function OtpVerifyModal({
    isOpenverify,
    toggleModal,
    mobile,
    toggleOtpSend,
    setMobile,
    roleData
}: any) {

    if(!isOpenverify) return null

    const [otp, setOtp] = useState<string>("");
    const navigate = useNavigate();
    const [openApporval ,setOpenApporval] = useState(false)
    const [otpError ,setOtpError] = useState('')
    const [roleName ,setRoleName] = useState('')
    const [roleId ,setRoleId] = useState('')
    const [roleIdError ,setRoleIdError] = useState('')

    console.log(roleData);
    

    const [timer, setTimer] = useState(30); // Start with 30 seconds
    const [isDisabled, setIsDisabled] = useState(true); // Disable initially

    const otpTrigger = async () => {
        if (mobile && mobile.length === 10) {
            const mobileStatus = await mobileOTPSignup({ mobile });
            if (mobileStatus) {
                toast.success("OTP Resent Successfully!");
            }
        }
    };

    const otpVerify = async () => {

        let hasError = false;
        if(roleData?.result?.length > 0){
            console.log(roleId);
            
            if(roleId === ''){
                setRoleIdError('This Field is required.')
                hasError = true;
            }else setRoleIdError('')
        }

        console.log(otp);
        
        if(!otp || otp.length !== 6){
            setOtpError('Please Enter a valid 6-digit OTP.')
            hasError = true;
        } setOtpError('')

        if(hasError){
            return
        }

        const payload = {
             mobile,
              otp,
              role: roleData?.result?.length > 0 ? roleId : roleData.result[0]
             };

             console.log(payload);
             
        try {
            const updateApi = await mobileOTPSignUpVerify(payload);

            if (updateApi?.status === 200) {

                toast.success("OTP Verified Successfully");
                const data = updateApi.data.result;
                localStorage.setItem("access-token", data.tokens.accessToken);
                localStorage.setItem("refreshToken", data.tokens.refreshToken);
                localStorage.setItem("role", btoa(data.userDetails.role.name));
                localStorage.setItem("userId", data.userDetails.role._id);
                localStorage.setItem("mobile", mobile);


            const { accessToken, refreshToken } = updateApi?.data?.result?.tokens;
            const roleName = updateApi?.data?.result?.userDetails?.role?.name;

                // Fetch profile data after OTP verification
                const profile = await getProfileApi();
                const profileData = profile?.data?.result;

                if (data) {
                    if (data?.userDetails?.role?.name === "PLC") {
                        if (
                            profileData.formCompleted === false 
                        ) {
                            navigate(`/plcRegistration`);
                            toggleModal();
                           toggleOtpSend();
                        } else if (
                            profileData.formCompleted === true && profileData?.formStatus === 'pending'
                        ) {
                            setOpenApporval(true);
                            setRoleName(data?.userDetails?.role?.name)
                        } else if (
                            profileData.formCompleted === true &&
                            profileData.formStatus === "rejected"
                        ) {
                            navigate(`/plcRegistration`);
                            toggleModal();
                           toggleOtpSend();
                        }
                        //  else if (
                        //     profileData.formCompleted === true &&
                        //     profileData.formStatus === "approved"
                        // ) {
                        //     window.open("https://appicms.aimwindow.in/login", "_blank");
                        // localStorage.removeItem("access-token");
                        // localStorage.removeItem("refreshToken");
                        // localStorage.removeItem("role");
                        // localStorage.removeItem("userId");
                        // localStorage.removeItem("mobile");
                        // toggleModal();
                        //    toggleOtpSend();
                        // }
                        else {

                            toggleModal();
                            toggleOtpSend();
                            localStorage.removeItem("access-token");
                            localStorage.removeItem("refreshToken");
                            localStorage.removeItem("role");
                            localStorage.removeItem("userId");
                            localStorage.removeItem("mobile");
                            
                            const newUrl = `https://partner.tactv.in/app/reconnect/?accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&roleName=${encodeURIComponent(roleName)}`;
                            window.open(newUrl,"_blank");
                           
                        }
                    }
                    else if (data?.userDetails?.role?.name === "LCO") {
                        if (profileData.formCompleted === false && profileData.formStatus === "pending") {
                            navigate(`/lcoregistration`);
                            toggleModal();
                           toggleOtpSend();
                        } else if (profileData.formCompleted === true && profileData.formStatus === "pending") {
                            setOpenApporval(true);
                            setRoleName(data?.userDetails?.role?.name)
                        } else if ( profileData.formCompleted === true && profileData.formStatus === "rejected") {
                            navigate(`/lcoregistration`);
                            toggleModal();
                           toggleOtpSend();
                        }
                        //  else if ( profileData.formCompleted === true && profileData.formStatus === "approved") {
                        //     window.open("https://partner.tactv.in/app/login", "_blank");
                        // localStorage.removeItem("access-token");
                        // localStorage.removeItem("refreshToken");
                        // localStorage.removeItem("role");
                        // localStorage.removeItem("userId");
                        // localStorage.removeItem("mobile");
                        // toggleModal();
                        //    toggleOtpSend();
                        // }
                        else {

                            toggleModal();
                            toggleOtpSend();
                            localStorage.removeItem("access-token");
                            localStorage.removeItem("refreshToken");
                            localStorage.removeItem("role");
                            localStorage.removeItem("userId");
                            localStorage.removeItem("mobile");
                            
                            const newUrl = `https://partner.tactv.in/app/reconnect/?accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&roleName=${encodeURIComponent(roleName)}`;
                            window.open(newUrl,"_blank");
                           
                        }
                    }else if (data?.userDetails?.role?.name === "FTA") {
                        if (
                            profileData.formCompleted === false 
                        ) {
                            navigate(`/ftaRegistration`);
                            toggleModal();
                           toggleOtpSend();
                        } else if (
                            profileData.formCompleted === true && profileData?.formStatus === 'pending'
                        ) {
                            setOpenApporval(true);
                            setRoleName(data?.userDetails?.role?.name)
                        } else if (
                            profileData.formCompleted === true &&
                            profileData.formStatus === "rejected"
                        ) {
                            navigate(`/ftaRegistration`);
                            toggleModal();
                           toggleOtpSend();
                        }
                        //  else if (
                        //     profileData.formCompleted === true &&
                        //     profileData.formStatus === "approved"
                        // ) {
                        //     window.open("https://partner.tactv.in/app/login", "_blank");
                        // localStorage.removeItem("access-token");
                        // localStorage.removeItem("refreshToken");
                        // localStorage.removeItem("role");
                        // localStorage.removeItem("userId");
                        // localStorage.removeItem("mobile");
                        // toggleModal();
                        //    toggleOtpSend();
                        // }
                        else {

                            toggleModal();
                            toggleOtpSend();
                            localStorage.removeItem("access-token");
                            localStorage.removeItem("refreshToken");
                            localStorage.removeItem("role");
                            localStorage.removeItem("userId");
                            localStorage.removeItem("mobile");
                            
                            const newUrl = `https://partner.tactv.in/app/reconnect/?accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&roleName=${encodeURIComponent(roleName)}`;
                            window.open(newUrl,"_blank");
                           
                        }
                    }else{
                        toggleModal();
                        toggleOtpSend();
                        localStorage.removeItem("access-token");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("role");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("mobile");
                        
                        const newUrl = `https://partner.tactv.in/app/reconnect/?accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&roleName=${encodeURIComponent(roleName)}`;
                        window.open(newUrl,"_blank");
                    }
                }

                

                setOtp("");
                setMobile("");
            } 
        } catch (error) {
            toast.error("Verification Failed");
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("mobile");
        navigate("/");
        toggleModal()
        toggleOtpSend()
      };

      useEffect(() => {
        if (timer > 0) {
          const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
    
          return () => clearInterval(intervalId); 
        } else {
          setIsDisabled(false); 
        }
      }, [timer]);

      const handleResend = () => {
        otpTrigger(); 
        setIsDisabled(true); 
        setTimer(30); 
      };


      const handleSelectChange = (event:any) => {
        const selectedValue = event.target.value;
        if(selectedValue === 'default'){
            setRoleIdError('This Field is required.')
        }else{
            setRoleIdError('')
            setRoleId(selectedValue)
        }
      };


    return (
        <>
           <div className='bg-[#11304e] fixed inset-0 z-50 flex  justify-center bg-opacity-50'>
           <div className='bg-white p-4 rounded-lg max-w-sm w-full flex flex-col max-h-[90%] h-fit overflow-y-scroll hide-scrollbar animate-slideTop'>
                        <div className="flex justify-center items-center flex-col">
                            <img src={tactvLogo} className="w-20" alt="No Image" />
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-[#914D1C]">
                                TACTV
                            </h1>
                            <h2 className="font-bold text-sm text-secondaryColor">
                                தமிழ் நாடு அரசு கேபிள் டிவி நிறுவனம்
                            </h2>
                        </div>
                        {roleData?.result?.length > 0 && (
                            <div className="mt-2 flex flex-col">
                            <label htmlFor="" className="form-label font-medium">Select Role</label>
                            <select className="form-control border-[1px] !border-black/30 p-2 rounded-md mt-1" onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {roleData?.result?.map((item:any,index:number) => (
                                        <option key={index} value={item?._id}>{item?.name}</option>
                                    ))}
                                </select>
                                {roleIdError && <p className="text-red-400 mt-1 text-xs">{roleIdError}</p>}
                               
                            </div>
                        )}
                        <h3 className="text-sm font-normal text-[#333333] mt-3 mb-1">
                            Enter the OTP you received at
                        </h3>
                        <p className="text-[#666666] font-bold mb-3 flex items-center">
                            +91 {mobile}
                            <FaEdit  onClick={toggleModal} className='w-4 ms-2' />
                        </p>
                        <div className="flex justify-center flex-col ">
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                inputType="tel"
                                numInputs={6}
                                inputStyle="custom-otp-field"
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        {otpError && <p className="text-red mt-1 text-xs">{otpError}</p>}
                        <div className="flex justify-center mt-5">
                            <button
                                className={`bg-primaryColor w-full text-white py-2 rounded-md `}
                                onClick={otpVerify}
                            >
                                Verify & Continue
                            </button>
                        </div>
                        <p className="text-sm mt-3 text-gray-500">
                            Didn&apos;t receive code?{" "}
                            <span
                                className={`  ${
                                isDisabled ? "text-primaryColor/60 cursor-not-allowed" : "text-primaryColor underline cursor-pointer"
                                }`}
                                onClick={isDisabled ? undefined : handleResend}
                            >
                                Request again {isDisabled && `(${timer}s)`}
                            </span>
                            </p>
                    <MdCancel className='w-5 h-5 absolute top-0 right-0 mr-4 mt-4 cursor-pointer hover:scale-105 duration-300 transition-all ease-in' onClick={() => {
                toggleModal();
                setOtp("");
            }} />
                </div>
            </div>

            
            {/* waitinf for approval */}
            {openApporval && (
                <div className='bg-[#11304e] fixed inset-0 z-50 flex  justify-center bg-opacity-50'>
                <div className='bg-white p-4 rounded-lg max-w-sm w-full flex flex-col max-h-[90%] h-fit overflow-y-scroll animate-slideTop'>
               <div className="flex flex-col  justify-center ">
                 <div className="flex justify-center items-center flex-col">
                   <img src={tactvLogo} className="w-20" alt="No Image" />
                   <h1 className="text-2xl   font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-[#914D1C]">
                     TACTV
                   </h1>
                   <h2 className="font-bold text-sm text-secondaryColor">
                     தமிழ் நாடு அரசு கேபிள் டிவி நிறுவனம்
                   </h2>
                 </div>
                 <img
                   src={approvalImg}
                   className="w-28 mx-auto my-3"
                   alt="No Image"
                 />
                 <h3 className=" text-xl font-bold capitalize">
                   Waiting for DM approvel
                 </h3>
     
                 <p className="text-[#444444] text-xs mt-2">
                 {roleName === 'LCO' ? 
                      `Your Local Cable Operator application form has been completed.
                   Once Approved we will send userName & password via sms or email.` 
                   : roleName === 'PLC' ? 
                 `Your Private Local Channel application form has been completed.
               Once Approved we will send userName & password via sms or email.` :
               ` Your Free To Access application form has been completed.
               Once Approved we will send userName & password via sms or email.`}
                 </p>
                 <a href="https://appicms.aimwindow.in/login" target="_blank">
                   <Button   
                     onClick={() => {
                       handleLogout();
                       toggleModal();
                       toggleOtpSend();
                     }}
                     color=""
                     className="bg-primaryColor text-white w-full mt-4"
                   >
                     Go To Dashboard
                   </Button>
                 </a>
               </div>
               <FaCircleXmark className='absolute top-3 right-3 w-5 h-5'
               onClick={handleLogout} />
             </div>
           </div>
            )}
            

        </>
    );
}

export default OtpVerifyModal;
