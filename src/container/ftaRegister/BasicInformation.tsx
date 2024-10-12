import { formatYYMMDD, getErrorMessage } from "../../utils/helper";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import NavButtons from "../ftaRegister/NavButtons";
import {
    setCurrentPage,
    updateFormData,
} from "../../redux/slices/ftaRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Modal } from "flowbite-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
    getCitys,
    getDistricts,
    getPincodeApi,
    getProfileApi,
    getState,
    postEmailValidationApi,
} from "../../api-service/api/authApi";

import { IoIosInformationCircleOutline } from "react-icons/io";
import approvalImg from "../../assets/images/lcoRegister/approval_icon.svg";
import tactvLogo from "../../assets/images/home/headerTop/tactv_logo.png";
import { FaXRay } from "react-icons/fa";
import { getFormDetails } from "../../api-service/api/ftaApi";

type Props = {};

type DropdownOption = {
    value: string;
    label: string;
    fullData: {
        areaName: string;
        district: string;
        state: string;
        pincode: string;
    };
};

function BasicInformation({ }: Props) {
    const [openApporval, setOpenApporval] = useState(false);

    const [emailError, setEmailError] = useState('')

    const router = useNavigate();

    const toggleApproval = () => {
        setOpenApporval(!openApporval);
    };

    const profile = useQuery({
        queryKey: ["getDemoTime"],
        queryFn: () => getProfileApi(),
    });

    const formDetails = useQuery({
        queryKey: ["getFormDetails"],
        queryFn: () => getFormDetails(),
    });

    const schema = yup.object().shape({
        // basic details

        contactPersonName: yup
            .string()
            .required("This field is required. Please enter a value"),
        phoneNumber: yup
            .string()
            .required("Mobile number is required")
            .matches(/^[6-9][0-9]{9}$/, "Mobile number should be 10 digits"),
        email: yup.string().required("Email is required").email("Email is invalid"),
        address: yup
            .string()
            .required("This field is required. Please enter a value"),
        companyName: yup
            .string()
            .required("This field is required. Please enter a value"),
        startYear: yup
            .string()
            .required("This field is required. Please enter a value"),
        postalLicenseNo: yup
            .string()
            .required("This field is required. Please enter a value"),
        postalLicenseDate: yup
            .string()
            .required("This field is required. Please enter a value"),
        district: yup
            .string()
            .required("This field is required. Please enter a value"),
        taluk: yup
            .string()
            .required("This field is required. Please enter a value"),
        pincode: yup
            .string()
            .required("This Field is required"),
        state: yup
            .string()
            .required("This field is required. Please enter a value"),
    });

    const currentPage = useSelector(
        (store: any) => store.ftaRegister.currentPage
    );

    const formData = useSelector((store: any) => store.ftaRegister.formData);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...formData,
        },
        resolver: yupResolver(schema),
    });

    const watchState = watch("state");
    const watchDistrict = watch("district");

    const allStates = useQuery({
        queryKey: ["allStates"],
        queryFn: () => getState(),
      });
    
      const allDistrict = useQuery({
        queryKey: ["allDistrict", watchState],
        queryFn: () => getDistricts(`?state_id=${watchState}`),
          enabled: !!watch('state'), // Enable fetching only when district is selected
      });
    
      const allSubDistrict = useQuery({
        queryKey: ["allSubDistrict", watchState, watchDistrict],
        queryFn: () => getCitys(`?state_id=${watchState}&district_id=${watchDistrict}`),
        enabled: !!watch('district'), 
      });


    const stateData = allStates?.data?.data?.result || [];
    const districtData = allDistrict?.data?.data?.result || [];
    const subDistrictData = allSubDistrict?.data?.data?.result || [];

    const [searchTerm, setSearchTerm] = useState<any>("");

    const [inputValue, setInputValue] = useState("");
    const [setSearchData, setSetsearchData] = useState<any>();
    const [selectedPincode, setSelectedPincode] = useState("");
  
    const handleSearch = (inputValue: any) => {
      setInputValue(inputValue); // Update the input value state
      setSearchTerm(inputValue); // Call your API search function
    };

    useEffect(()=>{
        setSelectedPincode(formData?.pincode)
        },[formData?.pincode])
            
        useEffect(() => {
            // Set searchData from Redux store on reload
            setSetsearchData(formData?.searchData || '');
        }, [formData?.searchData]);
            
  
    const getPincodeQueryData = useQuery({
      queryKey: ["getPincodeQueryData", searchTerm],
      queryFn: () => getPincodeApi(`?search=${searchTerm}`),
    });
  
    const pincodeDropdown: any[] =
    getPincodeQueryData?.data?.data?.result?.map((pin: any) => ({
      value: pin?._id,
      label: `${pin?.areaName},${pin?.district}-${pin?.pincode}`,
      fullData: pin,
    })) || [];

    useEffect(() => {
        setValue("phoneNumber", profile?.data?.data?.result?.mobile);
    }, [profile?.data?.data?.result, setValue]);

    const isDate = formDetails?.data?.data?.result?.basicDetails?.postalLicenseValidityDate;
    const postalLicensceDateFormat = isDate ? formatYYMMDD(isDate) : '';


    useEffect(() => {
        const allFormDetails = formDetails?.data?.data?.result?.basicDetails;

        if (allFormDetails) {

            setValue("contactPersonName", allFormDetails?.contactPersonName);
            setValue("address", allFormDetails?.address);
            setValue("email", allFormDetails?.email);
            setValue("companyName", allFormDetails?.companyName);
            setValue("startYear", allFormDetails?.activationYear);
            setValue("postalLicenseNo", allFormDetails?.postalLicenseNumber);
            setValue("postalLicenseDate", postalLicensceDateFormat);

        }
    }, [formDetails?.data?.data?.result?.basicDetails, postalLicensceDateFormat, setValue]);

    useEffect(()=>{
        if (allStates?.isFetched && formDetails?.data?.data?.result?.basicDetails) {
            const allFormDetails = formDetails.data.data.result.basicDetails;
        setValue("state", allFormDetails?.state);
        setTimeout(() => {
          setValue("district", allFormDetails?.district);
        }, 1500);
      
        setTimeout(() => {
          setValue("taluk", allFormDetails?.taluk);
        }, 3000); 
    }
      },[allStates?.isFetched])

      useEffect(() => {
        const apiPincode = formDetails?.data?.data?.result?.basicDetails?.pincode;
        if (apiPincode) {
          setSelectedPincode(apiPincode?.pincode);
          setValue('pincode', apiPincode?.pincode);
      
          dispatch(updateFormData({ searchData: apiPincode }));
        }
      }, [formDetails?.data?.data?.result?.basicDetails?.pincode?.pincode, setValue]);

    useEffect(() => {
        const profileData = profile?.data?.data?.result;

        if (
            profileData?.formCompleted === true &&
            profileData?.formStatus === "pending"
        ) {
            setOpenApporval(true);
        } else if (
            profileData?.formCompleted === true &&
            profileData?.formStatus === "rejected"
        ) {
            setOpenApporval(false);
        }
    }, []);

    function validateEmail(email: string) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email against the regex
        console.log('validate----------', emailRegex.test(email));

        return emailRegex.test(email);
    }

    // email validation
    const handleEmail = async (val: any) => {
        const validEmail = validateEmail(val);
        const payload = {
            email: val
        }
        if (validEmail) {
            const response = await postEmailValidationApi(payload)
            if (response.data.msg === 'Email Already Exists') {
                setEmailError('Email Already Exists');
            } else {
                setEmailError('');
            }
        } else {
            setEmailError('Please Enter Valid Email');
        }
    };

    const dispatch = useDispatch();

    // submit
    const onSubmit = async (data: any) => {
        console.log(data);
        dispatch(updateFormData({ ...data, searchData: setSearchData }));
        dispatch(setCurrentPage(currentPage + 1));
    };

  

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5 mx-[8%]">
                {/* {JSON.stringify(errors)} */}
                <div className="font-poppins">
                    <div className="border-[1px] border-[#DFDFDF] rounded-sm">
                        <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
                            <p className="flex items-center font-bold text-xl">
                                <IoIosInformationCircleOutline className="w-4 h-4 me-1" />
                                Basic Information
                            </p>
                        </div>
                        <div className="grid-cols-12 grid gap-5 p-4">
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Contact Person Name
                                    <span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="contactPersonName"
                                        type="text"
                                        placeholder="Enter Your Name"
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                        {...register("contactPersonName")}
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(
                                                /[^a-zA-Z\s]/g,
                                                ""
                                            );
                                        }}
                                    />
                                    {errors.contactPersonName && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.contactPersonName)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">Phone Number</div>
                                <div className="mt-1">
                                    <input
                                        id="phoneNumber"
                                        type="text"
                                        placeholder="Enter Phone Number"
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                        {...register("phoneNumber")}
                                    readOnly
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.phoneNumber)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Email<span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder="Enter Address"
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                        {...register("email")}
                                        onChange={(e) => handleEmail(e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.email)}
                                        </p>
                                    )}
                                    {emailError && (<p className="text-red-400 text-xs mt-1 font-medium">{emailError}</p>)}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Address<span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="address"
                                        type="text"
                                        placeholder="Enter Address"
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                        {...register("address")}
                                    />
                                    {errors.address && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.address)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-[1px] border-[#DFDFDF] rounded-sm mt-5 ">
                        <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
                            <p className="flex items-center font-bold text-xl">
                                <IoIosInformationCircleOutline className="w-4 h-4 me-1" />
                                Company Details
                            </p>
                        </div>
                        <div className="grid-cols-12 grid gap-5 p-4">
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Company Name<span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="companyName"
                                        type="text"
                                        placeholder="Enter CompanyName"
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                        {...register("companyName")}
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(
                                                /[^a-zA-Z\s]/g,
                                                ""
                                            );
                                        }}
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.companyName)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Company Start Year
                                    <span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className='flex justify-between items-center w-full'>
                                        <input
                                            id='startYear'
                                            type="date"
                                            placeholder='DD-MM-YYYY'
                                            className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs placeholder:uppercase'
                                            {...register('startYear')}
                                            max={new Date().toISOString().split('T')[0]} // Sets the max date to today
                                        />
                                        </div>

                                {errors.startYear && (
                                    <p className="text-red-400 text-xs mt-1 font-medium">
                                        {getErrorMessage(errors.startYear)}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Postal License No
                                    <span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="postalLicenseNo"
                                        type="text"
                                        placeholder="Enter Postal License No"
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                        {...register("postalLicenseNo")}
                                    />
                                    {errors.postalLicenseNo && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.postalLicenseNo)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Postal License Validity Date
                                    <span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                <div className='flex justify-between items-center w-full'>
                                        <input
                                            id='startYear'
                                            type="date"
                                            placeholder='DD-MM-YYYY'
                                            className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs placeholder:uppercase'
                                            {...register('postalLicenseDate')}
                                            min={new Date().toISOString().split('T')[0]} // Sets the max date to today
                                        />
                                        </div>
                                    {errors.postalLicenseDate && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.postalLicenseDate)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    State<span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <select
                                        {...register("state")}
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                    >
                                        <option value="" className="bg-slate-200 ">
                                            Select State
                                        </option>
                                        {stateData.map((state: any) => (
                                            <option
                                                className="mb-2 "
                                                key={state.id}
                                                value={state.id}
                                            >
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && (<p className="text-red-400 text-xs mt-1 font-medium">{getErrorMessage(errors.state)}</p>)}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    District<span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <select
                                        {...register("district")}
                                        disabled={!watchState}
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                    >
                                        <option value="" className="bg-slate-200 ">
                                            Select District
                                        </option>
                                        {districtData.map((district: any) => (
                                            <option
                                                className="mb-2 "
                                                key={district.id}
                                                value={district.id}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district && (<p className="text-red-400 text-xs mt-1 font-medium">{getErrorMessage(errors.district)}</p>)}
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 ">
                                <div className="font-medium text-sm">
                                    Taluk<span className="text-red-400 ms-1">*</span>
                                </div>
                                <div className="mt-1">
                                    <select
                                        {...register("taluk")}
                                        disabled={!watchDistrict}
                                        className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                                    >
                                        <option value="" className="bg-slate-200 ">
                                            Select Taluk
                                        </option>
                                        {subDistrictData.map((subdistrict: any) => (
                                            <option
                                                className="mb-2"
                                                key={subdistrict.id}
                                                value={subdistrict.id}
                                            >
                                                {subdistrict.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.taluk && (
                                        <p className="text-red-400 text-xs mt-1 font-medium">
                                            {getErrorMessage(errors.taluk)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="" className="form-label">
                                    Pincode<span className="ms-[2px] text-red-400">*</span>
                                </label>
                                <Controller
                                    control={control}
                                    name="pincode"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={pincodeDropdown}
                                            classNamePrefix="react-select"
                                            id="react-select-3-live-region"
                                            placeholder="Select PinCode"
                                            onInputChange={handleSearch} // Handle input change
                                            inputValue={inputValue} // Control the input value
                                            isClearable
                                            onChange={(selectedOption) => {
                                                if (selectedOption) {
                                                    const option = selectedOption as DropdownOption;
                                                    const pincode = option.fullData?.pincode ?? ""; // Get pincode from the fullData object
                                                    setSelectedPincode(pincode); // Set the pincode as the selected value
                                                    field.onChange(pincode); // Update form value with pincode only
                                                    setSetsearchData(option.fullData); // Set the entire object in setSearchData for later use
                                                } else {
                                                    // Clear the values if the clear icon is clicked
                                                    setSelectedPincode(""); // Clear the selected pincode
                                                    setSetsearchData(null); // Clear the stored data
                                                    field.onChange(""); // Clear the form value for pincode
                                                }
                                                setInputValue(""); // Clear input after selection or clearing
                                            }}
                                            value={
                                                selectedPincode
                                                    ? {
                                                        label: selectedPincode,
                                                        value: selectedPincode,
                                                    }
                                                    : null
                                            } // Map value to the correct option
                                        />
                                    )}
                                />
                                {errors.pincode && (
                                    <p className="text-red-400 text-xs mt-1 font-medium">
                                        {getErrorMessage(errors.pincode)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <NavButtons isSubmitEnabled={null} />
            </form>

            <Modal
                className="bg-[#207478] font-poppins"
                show={openApporval}
                size="md"
                popup
                onClose={toggleApproval}
            >
                <Modal.Body className="bg-white rounded-lg py-5 relative text-center">
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
                            Complete the Local Cable Operator application form to enjoy an
                            extensive channel lineup, high-definition quality.
                        </p>
                        <Button
                            onClick={() => {
                                toggleApproval();
                                router("/");
                            }}
                            color=""
                            className="bg-primaryColor text-white w-full mt-4"
                        >
                            Back To Home
                        </Button>
                    </div>
                </Modal.Body>
                <FaXRay
                    className="w-5 absolute top-0 right-0 mr-4 mt-4 cursor-pointer hover:scale-105 duration-300 transition-all ease-in"
                    onClick={() => {
                        toggleApproval();
                    }}
                />
            </Modal>
        </>
    );
}

export default BasicInformation;

