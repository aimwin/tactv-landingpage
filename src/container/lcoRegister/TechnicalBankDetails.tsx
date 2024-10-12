import { getErrorMessage } from '../../utils/helper';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { useQuery } from '@tanstack/react-query';
import { getFormDetails, getIfscBankList } from '../../api-service/api/lcoApi';
import { setCurrentPage, updateFormData } from '../../redux/slices/basicInformationSlice';
import { IoIosInformationCircleOutline } from 'react-icons/io';

type Props = {
}

function TechnicalBankDetails({}: Props) {

    const currentPage = useSelector((store : any)=>store.basicInformation.currentPage)
    
    const formData = useSelector((store : any)=>store.basicInformation.formData)

    const formDetails = useQuery({
        queryKey: ['getFormDetails'],
        queryFn: () => getFormDetails(),
    });

    const schema = yup.object().shape({
            // technical details
    noOfNODE: yup.string().optional(),
    noOfEDFA: yup.string().optional(),
    noOfTransmitter: yup.string(),
    cableLength: yup.string().required('This field is required. Please enter a value'),
    signalStrength: yup.string().required('This field is required. Please enter a value'),
    UPSPresent: yup.string().required('This field is required. Please select a value'),
    distanceControl: yup.string().required('This field is required. Please enter a value'),
    OFCCable: yup.string().required('This field is required. Please select a value'),
    OFCSignal: yup.string().optional(),
    accountName: yup.string().required('This field is required. Please enter a value'),
    accountNo: yup.string().required('This field is required. Please enter a value'),
    bankName: yup.string().required('This field is required. Please select a value'),
    IFSCcode: yup.string().required('This field is required. Please enter a value'),
    })

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            ...formData
        },
        resolver: yupResolver(schema)
    })

    const [OFCSignalError , setOFCSignalError] = useState('')

    const watchIfscCode = watch('IFSCcode') 

    const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/; // Basic IFSC Code validation pattern

    const allBankList = useQuery({
        queryKey: ['allBanks', watchIfscCode],
        queryFn: () => getIfscBankList(`${watchIfscCode ? `${watchIfscCode}` : ""}`),
        enabled : IFSC_REGEX.test(watchIfscCode)
    });

    useEffect(()=>{
        const bankDetails = allBankList?.data?.data?.result;
    if (IFSC_REGEX.test(watchIfscCode) && bankDetails) {
        setValue('bankName', `${bankDetails.bankName}, ${bankDetails.BRANCH} - ${bankDetails.STATE}`);
    } else {
        setValue('bankName', '');
    }
    },[allBankList?.data?.data?.result,setValue])

    const dispatch = useDispatch();
    const selectedOFCCable = watch('OFCCable')
    const watchOFCSignal = watch('OFCSignal')

    useEffect(()=>{
        if(selectedOFCCable === "false"){
            setValue('OFCSignal','')
        }
    },[selectedOFCCable,setValue])

    //  ON SUBMIT FUNCTION
    const onSubmit = async (data : any)=>{

        let hasErrors = false;

        setOFCSignalError('')

        if (selectedOFCCable === "true" && watchOFCSignal === "") {
            setOFCSignalError("This field is required. Please enter a value")
            hasErrors = true;
        } else setOFCSignalError('')

        if(hasErrors){
            return
        }

        console.log(data);
        dispatch(updateFormData({...data}))
        dispatch(setCurrentPage(currentPage + 1))
    }

    useEffect(()=>{
        const allFormDetailsTechnical = formDetails?.data?.data?.result?.technicalDetails
        
        if(allFormDetailsTechnical){
            setValue("noOfNODE", allFormDetailsTechnical?.noOfNode)
            setValue("noOfEDFA", allFormDetailsTechnical?.noOfEDFA11550nm)
            setValue("noOfTransmitter", allFormDetailsTechnical?.noOfTransmitter1310nm)
            setValue("cableLength", allFormDetailsTechnical?.cableLengthInKm)
            setValue("signalStrength", allFormDetailsTechnical?.signalStrength)
            setValue("UPSPresent", allFormDetailsTechnical?.isUPS1KVA2KVAPresent === true ? "true" : "false")
            setValue("distanceControl", allFormDetailsTechnical?.distanceFromControlRoomToGovermentSignalArea)
            setValue("OFCCable", allFormDetailsTechnical?.isOFCCablePresent === true ? "true" : "false")
            setValue("OFCSignal", allFormDetailsTechnical?.OFCSignalStrength)
        }
        
    },[formDetails?.data?.data?.result?.technicalDetails,setValue])

    useEffect(()=>{
        const allFormDetailsBank = formDetails?.data?.data?.result?.bankDetails
        
        if(allFormDetailsBank){
            setValue("accountName", allFormDetailsBank?.accountHolderName)
            setValue("accountNo", allFormDetailsBank?.accountNumber)
            setValue("bankName", allFormDetailsBank?.bankName)
            setValue("IFSCcode", allFormDetailsBank?.IFSCCode)
        }
        
    },[formDetails?.data?.data?.result?.bankDetails,setValue])



  return (
    <form onSubmit={handleSubmit(onSubmit)} className='my-5 mx-[8%]'>
        {/* {JSON.stringify(errors)} */}
    <div className='font-poppins'>

        <div className='border-[1px] border-[#DFDFDF] rounded-sm'>
        <div className='bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4'>
            <p className='flex items-center font-bold text-xl'>
            <IoIosInformationCircleOutline className="w-4 h-4 me-1" />
              Technical Details</p>
        </div>
        <div className='grid-cols-12 grid gap-5 p-4'>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      No of NODE
                      </div>
                      <div className="mt-1">
                          <input
                              id='noOfNODE'
                              type="text"
                              placeholder='Enter No Of NODE'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('noOfNODE')}
                          />
                          {/* {errors.noOfNODE && <p className='text-red-400-500 text-xs mt-1 font-medium'>{getErrorMessage(errors.noOfNODE)}</p>} */}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      No  of EDFA 1500nm
                      </div>
                      <div className="mt-1">
                          <input
                              id='noOfEDFA'
                              type="text"
                              placeholder='Enter No Of EDFA'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('noOfEDFA')}
                          />
                          {/* {errors.noOfEDFA && <p className='text-red-400-500 text-xs mt-1 font-medium'>{getErrorMessage(errors.noOfEDFA)}</p>} */}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      No of Transmitter 1310nm
                      </div>
                      <div className="mt-1">
                          <input
                              id='noOfTransmitter'
                              type="text"
                              placeholder='Enter Address'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('noOfTransmitter')}
                          />
                          {/* {errors.noOfTransmitter && <p className='text-red-400-500 text-xs mt-1 font-medium'>{getErrorMessage(errors.noOfTransmitter)}</p>} */}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Cable Length in Km<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                              id='cableLength'
                              type="text"
                              placeholder='Enter Cable Length in Km'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('cableLength')}
                              onInput={(e) => {e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g,'')}}
                          />
                          {errors.cableLength && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.cableLength)}</p>}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Signal strength<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                              id='signalStrength'
                              type="text"
                              placeholder='Enter Signal strength'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('signalStrength')}
                              onInput={(e) => {e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g,'')}}
                          />
                          {errors.signalStrength && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.signalStrength)}</p>}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Is UPS 1KVA / 2KVA Present ?<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="flex items-center p-3 border rounded-lg bg-gray-100">
                          <label className="flex items-center mr-3">
                              <input
                              id='UPSPresent'
                                  type="radio"
                                  value="true"
                                  className="form-radio h-4 w-4 text-green-500"
                                  {...register('UPSPresent')}
                              />
                              <span className="ml-2">Yes</span>
                          </label>
                          <label className="flex items-center">
                              <input
                              id='UPSPresent'
                                  type="radio"
                                  value="false"
                                  className="form-radio h-4 w-4 text-gray-400"
                                  {...register('UPSPresent')}
                              />
                              <span className="ml-2">No</span>
                          </label>
                      </div>
                      {errors.UPSPresent && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.UPSPresent)}</p>}
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Distance From Control Room<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                              id='distanceControl'
                              type="text"
                              placeholder='Enter Distance From Control Room'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('distanceControl')}
                          />
                          {errors.distanceControl && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.distanceControl)}</p>}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Is OFC Cable Present ?<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="flex items-center p-3 border rounded-lg bg-gray-100">
                          <label className="flex items-center mr-3">
                              <input
                              id='OFCCable'
                                  type="radio"
                                  value="true"
                                  className="form-radio h-4 w-4 text-green-500"
                                  {...register('OFCCable')}
                              />
                              <span className="ml-2">Yes</span>
                          </label>
                          <label className="flex items-center">
                              <input
                              id='OFCCable'
                                  type="radio"
                                  value="false"
                                  className="form-radio h-4 w-4 text-gray-400"
                                  {...register('OFCCable')}
                              />
                              <span className="ml-2">No</span>
                          </label>
                      </div>
                      {errors.OFCCable && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.OFCCable)}</p>}
                  </div>
                  {selectedOFCCable === "true" && (
                    <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                       OFC Signal Strength<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                              id='OFCSignal'
                              type="text"
                              placeholder='Enter OFC Signal Strength'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('OFCSignal')}
                              onInput={(e) => {e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g,'')}}
                            // onChange={handleOFCSignal}
                          />
                          {OFCSignalError && <p className='text-red-400 text-xs mt-1 font-medium'>{OFCSignalError}</p>}
                      </div>
                  </div>
                  )}
                  
        </div>
        </div>

        <div className='border-[1px] border-[#DFDFDF] rounded-sm mt-5'>
        <div className='bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4'>
            <h2 className='flex items-center font-bold text-xl'>
            <IoIosInformationCircleOutline className="w-4 h-4 me-1" />
              Bank Details</h2>
        </div>
        <div className='grid-cols-12 grid gap-5 p-4'>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Account Holder Name<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                              id='accountName'
                              type="text"
                              placeholder='Enter Account Holder Name'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('accountName')}
                              onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
                            }}
                          />
                          {errors.accountName && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.accountName)}</p>}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Account No<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                              id='accountNo'
                              type="text"
                              placeholder='Enter Account No'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('accountNo')}
                              onInput={(e) => {e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g,'')}}
                          />
                          {errors.accountNo && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.accountNo)}</p>}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      IFSC Code<span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                            id='IFSCcode'
                              type="text"
                              placeholder='Enter IFSC Code'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('IFSCcode')}
                          />
                          {errors.IFSCcode && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.IFSCcode)}</p>}
                      </div>
                  </div>
                  <div className='col-span-12  md:col-span-6 '>
                      <div className='font-medium text-sm'>
                      Bank <span className='text-red-400 ms-1'>*</span>
                      </div>
                      <div className="mt-1">
                          <input
                            id='bankName'
                              type="text"
                              placeholder='Enter Bank Name'
                              className='bg-gray-100 border-[1px] p-2 border-gray-300 rounded-md w-full placeholder:text-xs'
                              {...register('bankName')}
                              readOnly
                          />
                          {errors.bankName && <p className='text-red-400 text-xs mt-1 font-medium'>{getErrorMessage(errors.bankName)}</p>}
                      </div>
                  </div>
        </div>
        </div>

    </div>

    <NavButtons isSubmitEnabled={null}/>
    </form>
  )
}

export default TechnicalBankDetails