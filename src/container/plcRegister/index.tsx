import { useDispatch, useSelector } from "react-redux";
import circleImg from "../../assets/images/lcoRegister/tactv_logo_circle.svg";
import BasicInformation from "../plcRegister/BasicInformation";
import Declaration from "../plcRegister/Declaration";
import BankDetails from "../plcRegister/BankDetails";
import Documents from "../plcRegister/Documents";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../../api-service/api/authApi";
import { FaCheck } from "react-icons/fa";
import { getFormDetails } from "../../api-service/api/PlcApi";
import { resetFormData, setCurrentPage } from "../../redux/slices/plcRegister";

const PlcRegistration = () => {

    const dispatch = useDispatch()

    const profile = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfileApi()
    })
    const profileData = profile?.data?.data?.result

    const formDetails = useQuery({
        queryKey: ["getFormDetails"],
        queryFn: () => getFormDetails(),
    });

    const steps = [
        "Basic Information",
        "Bank Details",
        "Documents",
        "Declaration",
    ];

    const navigate = useNavigate();

    const currentPage = useSelector(
        (store: any) => store.plcRegister.currentPage
    );



    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentDate(new Date());
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    const formattedDate = currentDate
        ? format(currentDate, "eeee, d MMMM yyyy h:mm:ss a")
        : "";

    const renderPageContent = (step: any) => {
        try {
            switch (step) {
                case 1:
                    return <BasicInformation />;
                case 2:
                    return <BankDetails />;
                case 3:
                    return <Documents />;
                case 4:
                    return <Declaration />;
                default:
                    return null;
            }
        } catch (error) {
            console.error("Error rendering content:", error);
            return <div>Error loading content.</div>;
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("mobile");
        navigate("/");
        dispatch(resetFormData())
    dispatch(setCurrentPage(1))
    };

    return (
        <>
          <div className="h-[10vh] md:h-[20vh] relative font-poppins  z-50 w-full bg-gradient-to-r  from-[#F2FDF7] to-[#f2fdf7]">
        
        <div className="bg-formBgTop h-full w-full bg-center bg-cover absolute top-0 left-0">
        </div>
        <div className='absolute top-[50%] left-4  translate-y-[-50%] '>
    <div className=" flex items-center w-full">
      <img src={circleImg} className="w-16 md:w-24" alt="No Image" />
      <div className="flex flex-col ms-2 ">
        <p className="uppercase text-primaryColor text-lg md:text-4xl font-bold">
          Tamil nadu Arasu
        </p>
        <p className="text-sm md:text-lg font-bold">
          {" "}
          CABLE TV CORPORATION LIMITED (TACTV)
        </p>
      </div>
    </div>
    </div>
</div>

            <div className="flex justify-center my-3 xxl:my-5">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`relative flex flex-col justify-center items-center w-64 
        ${currentPage === i + 1 ? "text-white" : "text-gray-500"} 
        ${i + 1 < currentPage ? "text-white" : "text-gray-500"}`}
                    >
                        <div
                            className={`w-8 h-8 xxl:w-10 xxl:h-10  flex items-center justify-center z-10 relative rounded-full font-semibold ${i + 1 < currentPage
                                ? "bg-green-400"
                                : currentPage === i + 1
                                    ? "bg-sky-600"
                                    : "bg-slate-700"
                                }`}
                        >
                            {i + 1 < currentPage ? (
                                <FaCheck className='w-5 h-5' />
                            ) : (
                                i + 1
                            )}
                        </div>
                        <p className="text-gray-500">{step}</p>
                        {i !== 0 && (
                            <div
                                className={`absolute w-full h-[3px] right-2/4 top-1/3 -translate-y-2/4 ${i + 1 <= currentPage ? "bg-green-400" : "bg-slate-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="font-poppins bg-[#914d1c26] flex items-center justify-between px-[4%] py-2">
                <div className="md:flex md:items-center">
                    <h2 className="uppercase text-sm xl:text-xl font-bold ">PLC Application form</h2>
                    <h2 className="md:ms-2 text-xs md:text-sm text-[#914D1C]">{formattedDate}</h2>
                </div>
                <div className="flex items-center">
                    <p className="text-xs md:text-sm">வணக்கம்/welcome:</p>
                    <p className="bg-[#914d1c3d] text-[#914D1C] font-bold p-2 rounded-md ms-2">
                        {profileData?.mobile}
                    </p>
                    <div className="flex items-center  ms-2 cursor-pointer gap-1">
                        <p>Logout</p>
                    <MdOutlineLogout onClick={handleLogout} className="w-4 h-4" />
                    </div>
                    {/* <Dropdown color="primary" className='bg-white rounded-md ms-1'  label={<div className='flex items-center'><Lucide icon='Globe2Icon' className='w-6'/>{selectedLanguage}</div>} dismissOnClick={false}>
    <Dropdown.Item onClick={() => {handleSelect('English')}}>English</Dropdown.Item>
    <Dropdown.Item onClick={() => handleSelect('Tamil')}>Tamil</Dropdown.Item>
    </Dropdown> */}
                </div>
            </div>

            <div>
        {profileData?.formStatus === 'rejected' && (
          <div className="mx-[8%] mt-2 gap-2 lg:gap-0 lg:flex justify-between  bg-red/10 px-2 py-2 rounded-md">
            <p className="text-red   font-bold">Note : Registration Form Rejected</p>
            <p className="">Reason : <span className="font-bold flex flex-wrap max-w-sm xl:max-w-md whitespace-normal break-words text-red">{formDetails?.data?.data?.result?.rejectReason}</span></p>
          </div>
                )}
                {renderPageContent(currentPage)}
            </div>

        </>
    );
}


export default PlcRegistration