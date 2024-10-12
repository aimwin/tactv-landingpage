import { useState } from "react";
import { useSelector } from "react-redux";
import NavButtons from "./NavButtons";
import { Modal } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import {  getCitys, getDistricts, getProfileApi, getState } from "../../api-service/api/authApi";
import {
  getFormDetails,
  postFormUpload,
  postPayment,
  putFormUpload,
} from "../../api-service/api/lcoApi";
import { MdInfoOutline, MdOutlineInfo } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Approval from "./Approval";
import toast from "react-hot-toast";
import DocumentViewer from "../../components/documentViewer";

type Props = {};

function Declaration({ }: Props) {

  const formData = useSelector((store: any) => store.basicInformation.formData);

  const [tamilEnglish, setTamilEnglish] = useState(true);

  
  const [documentItem , setDocumentItem] = useState({})
  const [documentModal , setDocumentModal] = useState(false)

  const [openApporval, setOpenApporval] = useState(false);

  const [termsModal, setTermsModal] = useState(false);
  const [termsRead, setTermsRead] = useState(false); // Whether the terms have been read



  const toggleTermsModal = () => {
    setTermsModal(!termsModal);
  };

  const handleImageClick = (imgUrl: string) => {
    setDocumentItem({
      val: imgUrl,
      key: imgUrl?.endsWith('.pdf') ? 'document' : 'image'
  }),
      setDocumentModal(true);
  };

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(),
  });

  const formDetails = useQuery({
    queryKey: ["formDetails"],
    queryFn: () => getFormDetails(),
  });

  const formId = formDetails?.data?.data?.result?._id;

  const profileData = profile?.data?.data?.result;


  const allStates = useQuery({
    queryKey: ["allStates"],
    queryFn: () => getState(),
});

const allDistrict = useQuery({
    queryKey: ["allDistrict",formData?.state],
    queryFn: () => getDistricts(`?state_id=${formData?.state}`),
});

const allSubDistrict = useQuery({
    queryKey: ["allSubDistrict",formData?.state,formData?.district],
    queryFn: () => getCitys(`?state_id=${formData?.state}&district_id=${formData?.district}`),
});


const stateData = allStates?.data?.data?.result || [];
const districtData = allDistrict?.data?.data?.result || [];
const subDistrictData = allSubDistrict?.data?.data?.result || [];
  
  const stateLabel = stateData?.find((item:any) => item?.id === Number(formData?.state))?.name
  const districtLabel = districtData?.find((item:any) => item?.id === Number(formData?.district))?.name
  const talukLabel = subDistrictData?.find((item:any) => item?.id === Number(formData?.taluk))?.name


  const Submit = async (e: any) => {
    e.preventDefault();
    const payload = {
      basicDetails: {
        contactPersonName: formData.contactPersonName,
        personTamilName: formData.operatorNameTamil,
        address: formData.address,
        mobile: formData.phoneNumber,
        alternativeMobile : formData?.alterNateMobile ? formData?.alterNateMobile : "",
        email: formData.email,
        operatorName: formData.operatorName,
        companyName: formData.companyName,
        activationYear: formData.startYear,
        postalLicenseNumber: formData.postalLicenseNo,
        postalLicenseValidityDate: formData.postalLicenseDate,
        isGst: formData.GST === "true" ? true : false,
        gstNo: formData.GSTNo,
        state: Number(formData?.state),
        stateLbl: stateLabel,
        district: Number(formData?.district),
        districtLbl: districtLabel,
        taluk: formData?.taluk,
        talukLbl: talukLabel,
        location: formData.location,
        isPendingBillPresent: formData.pendingDues === "true" ? true : false,
        pendingDescription: formData.pendingDuesDesc,
        pincode: {
          value : formData?.searchData?._id,
          label : formData?.searchData?.pincode
        },
      },
      technicalDetails: {
        noOfNode: formData.noOfNODE,
        noOfEDFA11550nm: formData.noOfEDFA,
        noOfTransmitter1310nm: formData.noOfTransmitter,
        cableLengthInKm: formData.cableLength,
        signalStrength: formData.signalStrength,
        isUPS1KVA2KVAPresent: formData.UPSPresent,
        distanceFromControlRoomToGovermentSignalArea: formData.distanceControl,
        isOFCCablePresent: formData.OFCCable,
        OFCSignalStrength: formData.OFCSignal,
      },
      bankDetails: {
        accountHolderName: formData.accountName,
        accountNumber: formData.accountNo,
        bankName: formData.bankName,
        IFSCCode: formData.IFSCcode,
      },
      documents: {
        postalLicence: formData.postalImgUrl,
        bankAccountProof: formData.bankImgUrl,
        passportSizePhoto: formData.licenseImgUrl,
        idProof: formData.IDProofImgUrl,
        adressProof: formData.addressProofImgUrl,
        gst: formData.GSTImgUrl,
      },
      serviceAreas : formData?.serviceAreas?.map((item:any) => (
        item?.value
      )),
      numberOfSubscribers: Number(formData.noOfSubscribers),
      registrationFee: Number(formData.registrationFee),
      advanceAmount: Number(formData.advanceAmount),
      totalAmount: Number(formData.totalAmount),
    };
    console.log(payload);

    const paymentPayload = {
      totalAmount : Number(formData?.totalAmount)
    }

    try {
       await postPayment(paymentPayload)
      if (profileData?.formCompleted === true && profileData?.formStatus === "rejected") {
        const updateApi = await putFormUpload(formId, payload);
        if (updateApi?.status === 200) {
          toast.success("LCO Application Updated Form Submitted");
          setOpenApporval(true); 
        }
      } else {
          const uploadApi = await postFormUpload(payload);
          console.log(uploadApi);
          
          if (uploadApi?.status === 200) {
            toast.success(uploadApi?.data?.msg);
            // setOpenApporval(true);  

            const payment = await postPayment(paymentPayload)
            console.log(payment);
            
            if (payment?.status === 200) {
                  const paymentUrl = payment?.data?.result?.paymentLink;
                  // toast.success(payment?.data?.result?.message)
                  window.location.href = paymentUrl;
           }
          }
      }
    } catch (error) {
      toast.error("Failed to submit the form");
      console.error(error);
    }
    
  };


  return (
    <div className="font-poppins px-[8%] my-5">
      {/* <code>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </code> */}

      <form onSubmit={Submit}>
        <div className="border-[1px] border-[#DFDFDF] rounded-sm">
          <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
            <p className="flex items-center font-bold">
              <MdInfoOutline className="w-4 h-4 me-1" />
              Basic Information
            </p>
          </div>

          <div className="px-5 py-3">
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Contact Person Name <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.contactPersonName}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Address <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.address}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Mobile <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.phoneNumber}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Email <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">{formData.email}</p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Operator Name <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.operatorName}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Operator Name in Tamil <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.operatorNameTamil}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Company Name <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.companyName}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span
                className="col-span-3 flex justify-be
            tween items-center text-[#666666] text-sm 2xl:text-base"
              >
                Activation Year <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.startYear}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Posal License No<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.postalLicenseNo}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Posal License Validity Date<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.postalLicenseDate}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Is GST No Available<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">{formData.GST}</p>
            </div>
            {formData.GST === "true" && (
              <div className="grid grid-cols-12 gap-5 mb-3 w-full">
                <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                  GST No<span>:</span>
                </span>
                <p className="font-bold w-full col-span-9">
                  {formData.GSTNo}
                </p>
              </div>
            )}

            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                State<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {stateLabel ? stateLabel : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                District<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {districtLabel ? districtLabel : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Taluk<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {talukLabel ? talukLabel : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Location<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.location ? formData.location : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Pincode<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9 flex ">
                    <p className="font-bold w-full col-span-9">{formData?.pincode}</p>
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Service Areas<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9 flex ">
                {formData?.serviceAreas?.map((item:any,index:any) => (
                  <p className=" flex gap-2 items-center me-2 bg-slate-200 rounded-sm py-1 px-2 text-sm" key={index}>{item?.label}</p>
                ))}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Is Pending Bills Present<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.pendingDues}
              </p>
            </div>

            {formData.pendingDues === "true" && (
              <div className="grid grid-cols-12 gap-5 mb-3 w-full">
                <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                  Pending Description<span>:</span>
                </span>
                <p className="font-bold w-full col-span-9">
                  {formData.pendingDuesDesc}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-[1px] border-[#DFDFDF] rounded-sm mt-4">
          <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
            <p className="flex items-center font-bold">
              <MdInfoOutline className="w-4 h-4 me-1" />
              Technical Details
            </p>
          </div>

          <div className="px-5 py-3">
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                No of NODE <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.noOfNODE ? formData.noOfNODE : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                No of EDFA 1550nm<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.noOfEDFA ? formData.noOfEDFA : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                No of Transmitter 1310nm<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.noOfTransmitter ? formData.noOfTransmitter : "-"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Cable Length in Km<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.cableLength}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Signal Strength<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.signalStrength}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Is UPS1 KVA/2 KVA Present<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.UPSPresent}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base ">
                <span className="max-w-56">
                  Distance from control room to Government Signal Area
                </span>
                <span>:</span>
              </span>
              <p className="font-bold w-full col-span-9 flex items-center">
                {formData.distanceControl}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Is OFC Cable Present<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.OFCCable}
              </p>
            </div>
            {formData.OFCCable === "true" && (
              <div className="grid grid-cols-12 gap-5 mb-3 w-full">
                <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                  OFC Signal Strength<span>:</span>
                </span>
                <p className="font-bold w-full col-span-9">
                  {formData.OFCSignal}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-[1px] border-[#DFDFDF] rounded-sm mt-4">
          <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
            <p className="flex items-center font-bold">
              <MdInfoOutline className="w-4 h-4 me-1" />
              Bank Details
            </p>
          </div>

          <div className="px-5 py-3">
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Account Holder Name<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.accountName}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Account No<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.accountNo}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Bank Name<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.bankName}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                IFSC Code<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.IFSCcode}
              </p>
            </div>
          </div>
        </div>

        <div className="border-[1px] border-[#DFDFDF] rounded-sm mt-4">
          <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
            <p className="flex items-center font-bold">
              <MdInfoOutline className="w-4 h-4 me-1" />
              Payment Details
            </p>
          </div>

          <div className="px-5 py-3">
          <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                No.Of.Subscribers<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                {formData.noOfSubscribers}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Registration Fee<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
               ₹ {formData.registrationFee}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Advance Amount<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
                ₹ {formData.advanceAmount}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3 w-full">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Total Amount<span>:</span>
              </span>
              <p className="font-bold w-full col-span-9">
               ₹ {formData.totalAmount}
              </p>
            </div>
          </div>
        </div>

        <div className="border-[1px] border-[#DFDFDF] rounded-sm mt-4">
          <div className="bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4">
            <p className="flex items-center font-bold">
              <MdInfoOutline className="w-4 h-4 me-1" />
              Documents
            </p>
          </div>

          <div className="px-5 py-3">
            <div className="grid grid-cols-12 gap-5 mb-3">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Passport Size Photo<span>:</span>
              </span>
              {formData.licenseImgUrl ? (
                <div
                  className="flex items-center text-secondaryColor cursor-pointer bg-slate-100 border-[1px] border-black/30 justify-center h-fit p-1 rounded-md hover:bg-slate-50 hover:text-primaryColor"
                  onClick={() => handleImageClick(formData.licenseImgUrl)}
                >
                  <p className="text-xs">View</p>
                  <FaEye className=' ms-1' />
                </div>
              ) : (
                "-"
              )}
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                ID proof<span>:</span>
              </span>
              {formData.IDProofImgUrl ? (
                <div
                  className="flex items-center text-secondaryColor cursor-pointer bg-slate-100 border-[1px] border-black/30 justify-center h-fit p-1 rounded-md hover:bg-slate-50 hover:text-primaryColor"
                  onClick={() => handleImageClick(formData.IDProofImgUrl)}
                >
                  <p className="text-xs">View</p>
                  <FaEye className=' ms-1' />
                </div>
              ) : (
                "-"
              )}
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Address Proof (Ration card/Voter ID/Driving License)
                <span>:</span>
              </span>
              {formData.addressProofImgUrl ? (
                <div
                  className="flex items-center text-secondaryColor cursor-pointer bg-slate-100 border-[1px] border-black/30 justify-center h-fit p-1 rounded-md hover:bg-slate-50 hover:text-primaryColor"
                  onClick={() => handleImageClick(formData.addressProofImgUrl)}
                >
                  <p className="text-xs">View</p>
                  <FaEye className=' ms-1' />
                </div>
              ) : (
                "-"
              )}
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                GST<span>:</span>
              </span>
              {formData.GSTImgUrl ? (
                <div
                  className="flex items-center text-secondaryColor cursor-pointer bg-slate-100 border-[1px] border-black/30 justify-center h-fit p-1 rounded-md hover:bg-slate-50 hover:text-primaryColor"
                  onClick={() => handleImageClick(formData.GSTImgUrl)}
                >
                  <p className="text-xs">View</p>
                  <FaEye className=' ms-1' />
                </div>
              ) : (
                "-"
              )}
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Bank Account Proof<span>:</span>
              </span>
              {formData.bankImgUrl ? (
                <div
                  className="flex items-center text-secondaryColor cursor-pointer bg-slate-100 border-[1px] border-black/30 justify-center h-fit p-1 rounded-md hover:bg-slate-50 hover:text-primaryColor"
                  onClick={() => handleImageClick(formData.bankImgUrl)}
                >
                  <p className="text-xs">View</p>
                  <FaEye className=' ms-1' />
                </div>
              ) : (
                "-"
              )}
            </div>
            <div className="grid grid-cols-12 gap-5 mb-3">
              <span className="col-span-3 flex justify-between items-center text-[#666666] text-sm 2xl:text-base">
                Postal License<span>:</span>
              </span>
              {formData.postalImgUrl ? (
                <div
                  className="flex items-center text-secondaryColor cursor-pointer bg-slate-100 border-[1px] border-black/30 justify-center h-fit p-1 rounded-md hover:bg-slate-50 hover:text-primaryColor"
                  onClick={() => handleImageClick(formData.postalImgUrl)}
                >
                  <p className="text-xs">View</p>
                  <FaEye className=' ms-1' />
                </div>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>

        <div className="border-[1px] border-[#DFDFDF] rounded-sm mt-4 px-4 py-3">
          <p className="font-bold">Terms & Conditions</p>
          <div className="flex  mt-1">
            <input
              type="checkbox"
              checked={termsRead}
              disabled={!termsRead}
              className="w-4 h-4"
            />
            <p className="ms-2">I agree with the terms & conditions.</p>
            <p
              className="underline text-blue-400 ms-1 cursor-pointer"
              onClick={() => setTermsModal(true)}
            >
              <p>Click here to view the Terms and conditions.</p>
            </p>
          </div>
          {!termsRead && (
            <p className="flex text-xs mt-1 items-center">
              <MdOutlineInfo className="w-3 h-3 text-blue-400 me-1" />
              view and accept the terms & conditions
            </p>
          )}
        </div>

        <NavButtons isSubmitEnabled={termsRead} />
      </form>

      {/* waitinf for approval */}
      <Approval openModal={openApporval} toggleApporval={() => setOpenApporval(!openApporval)} />

      {/* Img single view  */}
      <DocumentViewer open={documentModal} handleModal={()=>setDocumentModal(!documentModal)} document={documentItem}/>
      {/* <Modal show={openImgModal} onClose={toggleImgModal} size="md">
        <Modal.Header onClick={toggleImgModal}>
          <Modal.Body>
            <div className="mx-auto">
              <img src={modalImgUrl} alt="No Image" className=" mx-auto" />
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal> */}

      {/* Terms and conditions view  */}
      <Modal show={termsModal} onClose={toggleTermsModal} size="6xl">
        <Modal.Header
          className="bg-white text-black"
        >
          <div>
            <button
              className={` p-2 rounded-md ${tamilEnglish ? "bg-primaryColor text-white" : "bg-black/20"
                }`}
              onClick={() => setTamilEnglish(true)}
            >
              தமிழ்
            </button>
            <button
              className={` p-2 rounded-md ms-2 ${tamilEnglish ? " bg-black/20" : "bg-primaryColor text-white"
                }`}
              onClick={() => setTamilEnglish(false)}
            >
              English
            </button>
          </div>
        </Modal.Header>
        <Modal.Body className="text-black bg-white ">
          {tamilEnglish ? (
            <div className="w-full">
              <p className="font-bold text-2xl underline">உறுதிமொழி</p>
              <div className="flex mt-3">
                <p className="text-xs 2xl:text-sm ">1.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  மேலே குறிப்பிட்டுள்ள விவரங்கள் யாவும் உண்மை எனவும், தவறான
                  தகவல் என தெரியவரின், என் மீது நடவடிக்கை எடுப்பதற்கும்
                  சம்மதிக்கிறேன்.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">2.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  உள்ளூர் கேபிள் ஆபரேட்டராக தொழில் நடத்துவதில், நடைமுறையில் உள்ள
                  மத்திய , மாநில மற்றும் உள்ளாட்சி அமைப்புகளின் விதிமுறைகளை
                  தவறாமல் பின்பற்றுவேன்.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">3.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  தமிழ்நாடு அரசு கேபிள் டிவி நிறுவனத்தின் விதிமுறைகளுக்கு
                  கட்டுப்படுவேன்.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">4.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  தமிழ்நாடு அரசு கேபிள் டிவி நிறுவனத்தின் வாயிலாக பெற்றுக்கொண்ட
                  செட்டாப் பாக்ஸ்கள் அனைத்திற்கும் முழு பொறுப்பு நான் என
                  அறிவேன்.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">5.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  இந்நிறுவனத்தின் வாயிலாக பெற்றுக்கொண்ட செட்டாப் பாக்ஸ்கள்
                  பெற்றுக்கொண்ட நாட்களிலிருந்து 7 நாட்களுக்குள் செயலாக்கம்
                  செய்வேன் என உறுதி அளிக்கிறேன்.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">6.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  மாதாந்திர சந்தா தொகையினை தமிழ்நோடு அரசு கேபிள் டிவி
                  நிறுவனத்திற்கு குறித்த காலத்தில் செலுத்துவேன். இதில் தவறும்
                  பட்சத்தில், உரிமம் ரத்து செய்யப்படுவதுடன்,நிலுவை தொகையினை
                  வசூல் செய்வதற்காக என் மீது எடுக்கப்படும் சட்ட நடவடிக்கைகளுக்கு
                  கட்டுப்படுவேன்.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">7.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  இந்நிறுவனத்தின் வாயிலாக செட்டாப் பாக்ஸ்கள் பெற்றுக்கொண்டும்
                  தனியார் நிறுவன MSO செட்டாப் பாக்ஸ்களை நான் ஒளிபரப்புவது
                  தங்களுக்கு தெரியவரும் பட்சத்தில் என்னுடைய பதிவு எண் ரத்து
                  செய்யப்படுவதற்கும் நான் செலுத்திய முன்வைப்புத் தொகை மற்றும்
                  காப்பீட்டுத் தொகைபறிமுதல் செய்வதற்கும் நான் சம்மதிக்கிறேன்.
                </p>
              </div>
              <div className="mt-4 w-full ml-auto flex justify-end items-center">
              <button
                disabled={termsRead}
                className=" bg-green-500 text-white py-2 px-4 rounded ml-auto"
                onClick={() => {
                  setTermsRead(true); // Set terms as read when the user closes the modal
                  setTermsModal(false);
                }}
              >
                Accept
              </button>
              </div>
              
            </div>
          ) : (
            <div className="w-full">
              <p className="font-bold text-2xl underline">Declaration</p>
              <div className="flex mt-3">
                <p className="text-xs 2xl:text-sm ">1.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  I agree that all the information mentioned above is true, and
                  I consent to action being taken against me if it is found to
                  be false.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">2.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  I will strictly follow the rules and regulations of the
                  Central, State, and Local Government authorities while
                  operating as a local cable operator.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">3.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  I will abide by the regulations of the Tamil Nadu Government
                  Cable TV Corporation.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">4.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  I acknowledge that I am fully responsible for all the set-top
                  boxes obtained through the Tamil Nadu Government Cable TV
                  Corporation.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">5.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  I assure you that I will activate the set-top boxes obtained
                  through this corporation within 7 days from the date of
                  receipt.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">6.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  I will pay the monthly subscription fee to the Tamil Nadu
                  Government Cable TV Corporation within the stipulated time. In
                  case of default, I agree to the cancellation of my license and
                  to comply with any legal actions taken against me for the
                  recovery of the outstanding amount.
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-xs 2xl:text-sm ">7.</p>
                <p className="ms-1 text-xs 2xl:text-sm ">
                  If it is found that I am broadcasting private company MSO
                  set-top boxes while obtaining set-top boxes through this
                  corporation, I agree to the cancellation of my registration
                  number and the forfeiture of the deposit and insurance amounts
                  I have paid.
                </p>
              </div>

              <div className="mt-4 w-full ml-auto flex justify-end items-center">
              <button
                disabled={termsRead}
                className=" bg-green-500 text-white py-2 px-4 rounded "
                onClick={() => {
                  setTermsRead(true); // Set terms as read when the user closes the modal
                  setTermsModal(false);
                }}
              >
                Accept
              </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Declaration;
