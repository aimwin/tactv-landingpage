import { formatYYMMDD, getErrorMessage } from "../../utils/helper";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import NavButtons from "./NavButtons";
import {
  setCurrentPage,
  updateFormData,
} from "../../redux/slices/basicInformationSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "flowbite-react";
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
import { getFormDetails } from "../../api-service/api/lcoApi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import approvalImg from "../../assets/images/lcoRegister/approval_icon.svg";
import tactvLogo from "../../assets/images/home/headerTop/tactv_logo.png";
import { FaCircleXmark } from "react-icons/fa6";

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

type Props = {}; 
function BasicInformation({ }: Props) {
  const [openApporval, setOpenApporval] = useState(false);

  const [emailError, setEmailError] = useState('')

  const router = useNavigate();

  const handleLogout = () => {
    console.log('clikced...........');
    
    localStorage.removeItem("access-token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("mobile");
    setOpenApporval(false)
    router("/");
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
    alternateMobile: yup
      .string().optional(),
    email: yup.string().required("Email is required").email("Email is invalid"),
    address: yup
      .string()
      .required("This field is required. Please enter a value"),
      panNo: yup
  .string()
  .optional() // Field is optional
  .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: "PAN No is not matching", // Error message when PAN No does not match
    excludeEmptyString: true // Ensure empty strings are not checked
  }),
    companyName: yup
      .string()
      .required("This field is required. Please enter a value"),
    operatorName: yup
      .string()
      .required("This field is required. Please enter a value"),
      operatorNameTamil: yup
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
    state: yup
      .string()
      .required("This field is required. Please enter a value"),
    district: yup
      .string()
      .required("This field is required. Please enter a value"),
    taluk: yup
      .string()
      .required("This field is required. Please enter a value"),
    location: yup.string().optional(),
    pincode: yup
      .string()
      .required("This field is required. Please enter a value"),
    serviceAreas: yup
      .array()
      .of(yup.object().required())
      .min(1, "At least one areaname must be selected")
      .required("This Field is required"),
    GST: yup.string().required("This field is required. Please select a value"),
    pendingDues: yup
      .string()
      .required("This field is required. Please select a value"),
    GSTNo: yup.string(),
    pendingDuesDesc: yup.string(),
     noOfSubscribers: yup.string().required('This field is required. Please enter a value'),
    advanceAmount: yup.string().required('This field is required. Please select a value'),
    totalAmount: yup.string().required('This field is required. Please select a value'),
  });

  const currentPage = useSelector(
    (store: any) => store.basicInformation.currentPage
  );

  const formData = useSelector((store: any) => store.basicInformation.formData);  

  const {
    register,
    setValue,
    getValues,
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

  const selectedGST = watch("GST");
  const selectedPendingDues = watch("pendingDues");
  const watchGSTNo = watch("GSTNo");
  const watchPendingDesc = watch("pendingDuesDesc");
  const watchState = watch("state");
  const watchDistrict = watch("district");
  const enteringSubscribers = watch('noOfSubscribers')
  const registrationFee = 1000


  const [pendingDuesDescError, setPendingDuesDescError] = useState("");
  const [GSTNoError, setGSTNoError] = useState("");

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

  useEffect(() => {
    if (selectedGST === "false") {
      setValue("GSTNo", "");
    }
    if (selectedPendingDues === "false") {
      setValue("pendingDuesDesc", "");
    }
  }, [selectedPendingDues, selectedGST, setValue]);

  useEffect(() => {
    setValue("phoneNumber", profile?.data?.data?.result?.mobile);
  }, [profile?.data?.data?.result, setValue]);

  const isDate = formDetails?.data?.data?.result?.basicDetails?.postalLicenseValidityDate;
  const postalLicensceDateFormat = isDate ? formatYYMMDD(isDate) : '';

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


  //   for multiple pincodes select
  const [searchTerm, setSearchTerm] = useState<any>("");

  const handleChange = (e: any) => {
    setSearchTerm(e);
  };

  const getPincodeQueryData = useQuery({
    queryKey: ["getPincodeQueryData", searchTerm],
    queryFn: () =>
      getPincodeApi(
        `?search=${searchTerm}`
      ),
  });

  

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

// for payment 
useEffect(() => {
        const advanceAmount = enteringSubscribers * 25 * 3
        const totalAmount = enteringSubscribers * 25 * 3 + registrationFee

        setValue('advanceAmount', advanceAmount || "")

        if (enteringSubscribers) {
            setValue('totalAmount', totalAmount)
        } else setValue('totalAmount', "")
    }, [enteringSubscribers])

    // for setValue
useEffect(() => {
  const allFormDetails = formDetails?.data?.data?.result?.basicDetails;
  const serviceAreas = formDetails?.data?.data?.result?.serviceAreas;

  if (allFormDetails) {
    setValue("contactPersonName", allFormDetails?.contactPersonName);
    setValue("operatorNameTamil", allFormDetails?.personTamilName);
    setValue("address", allFormDetails?.address);
    setValue("email", allFormDetails?.email);
    setValue("operatorName", allFormDetails?.operatorName);
    setValue("companyName", allFormDetails?.companyName);
    setValue("startYear", allFormDetails?.activationYear);
    setValue("postalLicenseNo", allFormDetails?.postalLicenseNumber);
    setValue("postalLicenseDate", postalLicensceDateFormat);
    setValue("GST", allFormDetails?.isGst === true ? "true" : "false");
    setValue("GSTNo", allFormDetails?.gstNo);
    setValue("location", allFormDetails?.location ? allFormDetails?.location : "");
    setValue("pendingDues", allFormDetails?.isPendingBillPresent === true ? "true" : "false");
    setValue("pendingDuesDesc", allFormDetails?.pendingDescription);

    if (serviceAreas?.length > 0) {
      const pincodeCodeOptions = serviceAreas?.map((item: any) => ({
        value: item?._id,
        label: `${item?.officeName} - ${item?.pincode}`,
        fullData: item
      }))
      setValue("serviceAreas", pincodeCodeOptions);
    }

  }
}, [formDetails?.data?.data?.result?.basicDetails, postalLicensceDateFormat, setValue]);

useEffect(()=>{
  const allFormDetails = formDetails?.data?.data?.result;
  if (allFormDetails) {
  setValue("noOfSubscribers", allFormDetails?.numberOfSubscribers)
  setValue("registrationFee", allFormDetails?.registrationFee)
  setValue("advanceAmount", allFormDetails?.advanceAmount)
  setValue("totalAmount", allFormDetails?.totalAmount)
  }
},[formDetails?.data?.data?.result, setValue])

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
  // Check if the pincode is available from API response and set it
  const apiPincode = formDetails?.data?.data?.result?.basicDetails?.pincode;
  if (apiPincode) {
    setSelectedPincode(apiPincode?.pincode);
    setValue('pincode', apiPincode?.pincode); // Ensure the form has this value as well

    dispatch(updateFormData({ searchData: apiPincode }));
  }
}, [formDetails?.data?.data?.result?.basicDetails?.pincode?.pincode, setValue]);

  const materialDropdown: any[] =
    getPincodeQueryData?.data?.data?.result?.map((material: any) => ({
      value: material?._id,
      label: `${material?.areaName}-${material?.pincode}`,
      fullData: {
        ...material,
        areaName: material?.officeName
      },
    })) || [];

  const filteredOptions = materialDropdown.filter((option: any) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const combinedOptions = [...filteredOptions];

  //   console.log(watch("pincode"));

  const dispatch = useDispatch();

  // submit
  const onSubmit = async (data: any) => {
    let hasErrors = false;

    setGSTNoError("");
    setPendingDuesDescError("");

    if (selectedPendingDues === "true" && watchPendingDesc === "") {
      setPendingDuesDescError("This field is required. Please select a value");
      hasErrors = true;
    } else setPendingDuesDescError("");

    if (selectedGST === "true") {
      if (watchGSTNo === "") {
        setGSTNoError("This field is required. Please enter a GST number.");
        hasErrors = true;
      } else {
        const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    
        // Validate GST Number against the regex
        if (!GST_REGEX.test(getValues('GSTNo'))) {
          setGSTNoError("GST No is not matching the required format.");
          hasErrors = true;
        } else {
          setGSTNoError(""); // Clear the error if the GST is valid
        }
      }
    } else {
      setGSTNoError(""); // Clear the error if GST is not selected
    }
    
    if (hasErrors) {
      return;
    }

    console.log(data);
  dispatch(updateFormData({ ...data, searchData: setSearchData }));
    dispatch(setCurrentPage(currentPage + 1));
  };

  // for payment redirecturl page
  useEffect(() => {
    const profileData = profile?.data?.data?.result

    if (profileData?.formCompleted === true && profileData?.formStatus === "pending") {
        setOpenApporval(true)
    } else if (profileData?.formCompleted === true && profileData?.formStatus === "rejected") {
        setOpenApporval(false)
    }
}, [profile])

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
            <div className="grid-cols-12 grid gap-3 xxl:gap-5 p-4">
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
                    //   defaultValue={getdata?.mobile}
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
            <div className="grid-cols-12 grid gap-3 xxl:gap-5 p-4">
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
                  Operator Name<span className="text-red-400 ms-1">*</span>
                </div>
                <div className="mt-1">
                  <input
                    id="operatorName"
                    type="text"
                    placeholder="Enter OperatorName"
                    className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                    {...register("operatorName")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                    }}
                  />
                  {errors.operatorName && (
                    <p className="text-red-400 text-xs mt-1 font-medium">
                      {getErrorMessage(errors.operatorName)}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-12  md:col-span-6 ">
                <div className="font-medium text-sm">
                Operator Name(in Tamil)
                  <span className="text-red-400 ms-1">*</span>
                </div>
                <div className="mt-1">
                  <input
                    id="operatorNameTamil"
                    type="text"
                    placeholder="Enter Your Name in Tamil"
                    className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                    {...register("operatorNameTamil")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^\u0B80-\u0BFF\s]/g, // This regex matches only Tamil characters
                        ""
                      );
                    }}
                  />
                  {errors.operatorNameTamil && (
                    <p className="text-red-400 text-xs mt-1 font-medium">
                      {getErrorMessage(errors.operatorNameTamil)}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-12  md:col-span-6 ">
                <div className="font-medium text-sm">Alternate Number</div>
                <div className="mt-1">
                  <input
                    id="alternateNumber"
                    type="text"
                    placeholder="Enter Alternate Number"
                    className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                    {...register("alternateNumber")}
                    onInput={(e) => {
                      const input = e.currentTarget.value;
                      const cleanedInput = input.replace(/\D/g, '');
                      if (/^[6-9][0-9]{0,9}$/.test(cleanedInput)) {
                        e.currentTarget.value = cleanedInput;
                      } else {
                        e.currentTarget.value = cleanedInput.slice(0, -1);
                      }
                    }}
                    maxLength={10}
                  />
                  {errors.alternateNumber && (
                    <p className="text-red-400 text-xs mt-1 font-medium">
                      {getErrorMessage(errors.alternateNumber)}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-12  md:col-span-6 ">
                <div className="font-medium text-sm">
                  PAN No
                </div>
                <div className="mt-1">
                  <input
                    id="postalLicenseNo"
                    type="text"
                    placeholder="Enter PAN No"
                    className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                    {...register("panNo")}
                    maxLength={10}
                  />
                  {errors.panNo && (
                    <p className="text-red-400 text-xs mt-1 font-medium">
                      {getErrorMessage(errors.panNo)}
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
              <div className="col-span-12  md:col-span-6 ">
                <div className="font-medium text-sm">Location</div>
                <div className="mt-1">
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter Location"
                    className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                    {...register("location")}
                  />
                  {/* {errors.location && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.location)}</p>} */}
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
                            options={materialDropdown}
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
              <div className="col-span-6">
                <label htmlFor="" className="form-label">
                  Service Areas<span className="text-red-400 ms-1">*</span>
                </label>
                <Controller
                  control={control}
                  name="serviceAreas"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={combinedOptions}
                      isMulti
                      isClearable
                      isDisabled={!watchDistrict}
                      onInputChange={handleChange}
                      classNamePrefix="react-select"
                      placeholder="Open this select menu"
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      onChange={(selectedOptions: any) => {
                        field.onChange(selectedOptions || []);
                      }}
                      value={field.value}
                    />

                  )}
                />
                {errors.serviceAreas && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {getErrorMessage(errors.serviceAreas)}
                  </p>
                )}
              </div>
                       <div className='col-span-12  md:col-span-6 '>
                                <div className='font-medium text-sm'>
                                    No.Of.Subscribers <span className='text-red-400 ms-[2px]'>*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id='noOfSubscribers'
                                        type="text"
                                        placeholder='Enter Your Subscribers'
                                        className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                                        {...register('noOfSubscribers')}
                                    />
                                    {errors.noOfSubscribers && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.noOfSubscribers)}</p>}
                                </div>
                            </div>
                            <div className='col-span-12  md:col-span-6 '>
                                <div className='font-medium text-sm'>
                                    Registration Fee<span className='text-red-400 ms-1'>*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id='registrationFee'
                                        type="text"
                                        className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                                        {...register('registrationFee')}
                                        defaultValue={registrationFee}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='col-span-12  md:col-span-6 '>
                                <div className='font-medium text-sm'>
                                    Advance Amount<span className='text-red-400 ms-1'>*</span><span className='text-primaryColor'> (No Of Subscribers * 25 * 3)</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id='advanceAmount'
                                        type="text"
                                        className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                                        {...register('advanceAmount')}
                                        defaultValue=""
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='col-span-12  md:col-span-6 '>
                                <div className='font-medium text-sm'>
                                    Total Amount<span className='text-red-400 ms-1'>*</span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id='totalAmount'
                                        type="text"
                                        className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                                        {...register('totalAmount')}
                                        defaultValue=""
                                        readOnly
                                    />
                                </div>
                            </div> 
              <div className="col-span-12  md:col-span-6 ">
                <div className="font-medium text-sm">
                  GST Available
                  <span className="text-red-400 ms-1">*</span>
                </div>
                <div className="flex items-center p-3 border rounded-lg bg-gray-100">
                  <label className="flex items-center mr-3">
                    <input
                      type="radio"
                      value="true"
                      className="form-radio h-4 w-4 text-green-500"
                      {...register("GST")}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="false"
                      className="form-radio h-4 w-4 text-gray-400"
                      {...register("GST")}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {errors.GST && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {getErrorMessage(errors.GST)}
                  </p>
                )}
              </div>

              {selectedGST && selectedGST === "true" && (
                <div className="col-span-12  md:col-span-6 ">
                  <div className="font-medium text-sm">
                    GST No<span className="text-red-400 ms-1">*</span>
                  </div>
                  <div className="mt-1">
                    <input
                      id="GSTNo"
                      type="text"
                      placeholder="Enter GST No"
                      className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                      {...register("GSTNo")}
                      maxLength={15}
                    />
                    {GSTNoError && (
                      <p className="text-red-400 text-xs mt-1 font-medium">
                        {GSTNoError}

                      </p>
                    )}
                     {errors.GSTNo && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {getErrorMessage(errors.GSTNo)}
                  </p>
                )}
                  </div>
                </div>
              )}

              <div className="col-span-12  md:col-span-6 ">
                <div className="font-medium text-sm">
                  Have Any Pending Dues in TACTV
                  <span className="text-red-400 ms-1">*</span>
                </div>
                <div className="flex items-center p-3 border rounded-lg bg-gray-100">
                  <label className="flex items-center mr-3">
                    <input
                      id="pendingDues"
                      type="radio"
                      value="true"
                      className="form-radio h-4 w-4 text-green-500"
                      {...register("pendingDues")}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      id="pendingDues"
                      type="radio"
                      value="false"
                      className="form-radio h-4 w-4 text-gray-400"
                      {...register("pendingDues")}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {errors.pendingDues && (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    {getErrorMessage(errors.pendingDues)}
                  </p>
                )}
              </div>
              {selectedPendingDues === "true" && (
                <div className="col-span-12  md:col-span-6 ">
                  <div className="font-medium text-sm">
                    Pending Description
                    <span className="text-red-400 ms-1">*</span>
                  </div>
                  <div className="mt-1">
                    <input
                      id="pendingDuesDesc"
                      type="text"
                      placeholder="Enter Pending Description"
                      className="bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs"
                      {...register("pendingDuesDesc")}
                    />
                    {pendingDuesDescError && (
                      <p className="text-red-400 text-xs mt-1 font-medium">
                        {pendingDuesDescError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <NavButtons isSubmitEnabled={null} />
      </form>

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
                    Your Local Cable Operator application form has been completed.
                 Once Approved we will send userName & password via sms or email.
               </p>
               <a href="https://appicms.aimwindow.in/login" target="_blank">
                 <Button   
                   onClick={() => {
                     handleLogout();
                   }}
                   color=""
                   className="bg-primaryColor text-white w-full mt-4"
                 >
                   Go To Dashboard
                 </Button>
               </a>
             </div>
             <FaCircleXmark className='absolute top-3 right-3 w-5 h-5 cursor-pointer'
             onClick={handleLogout} />
           </div>
         </div>
            )}
      
    </>
  );
}

export default BasicInformation;
