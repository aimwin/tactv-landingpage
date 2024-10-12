import { getErrorMessage } from '../../utils/helper';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import NavButtons from './NavButtons';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { useQuery } from '@tanstack/react-query';
import { getFormDetails, getIfscBankList } from '../../api-service/api/PlcApi';
import { setCurrentPage, updateFormData } from '../../redux/slices/plcRegister';
import { IoIosInformationCircleOutline } from 'react-icons/io';

type Props = {
}

function BankDetails({ }: Props) {

    const currentPage = useSelector(
        (store: any) => store.plcRegister.currentPage
    );

    const formData = useSelector((store: any) => store.plcRegister.formData);

    const formDetails = useQuery({
        queryKey: ['getFormDetails'],
        queryFn: () => getFormDetails(),
    });

    const schema = yup.object().shape({
        // technical details
        accountName: yup.string().required('This field is required. Please enter a value'),
        accountNo: yup.string().required('This field is required. Please enter a value'),
        bankName: yup.string().required('This field is required. Please select a value'),
        IFSCcode: yup.string().required('This field is required. Please enter a value').matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC code is Not Matching.'),
    })

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            ...formData
        },
        resolver: yupResolver(schema)
    })


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

    //  ON SUBMIT FUNCTION
    const onSubmit = async (data: any) => {
        console.log(data);
        dispatch(updateFormData({ ...data }))
        dispatch(setCurrentPage(currentPage + 1))
    }
    useEffect(() => {
        const allFormDetailsBank = formDetails?.data?.data?.result?.bankDetails

        if (allFormDetailsBank) {
            setValue("accountName", allFormDetailsBank?.accountHolderName)
            setValue("accountNo", allFormDetailsBank?.accountNumber)
            setValue("bankName", allFormDetailsBank?.bankName?.name)
            setValue("IFSCcode", allFormDetailsBank?.IFSCCode)
        }

    }, [formDetails?.data?.data?.result?.bankDetails, setValue])



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='my-5 mx-[8%]'>
            <div className='font-poppins'>

                <div className='border-[1px] border-[#DFDFDF] rounded-sm mt-5'>
                    <div className='bg-[#DFDFDF] rounded-tl-sm rounded-tr-sm py-2 px-4'>
                        <p className='flex items-center font-bold text-xl'>
                        <IoIosInformationCircleOutline className="w-4 h-4 me-1" />
                            Bank Details</p>
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
                                    onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '') }}
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
                                    maxLength={11}
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

            <NavButtons isSubmitEnabled={null} />
        </form>
    )
}

export default BankDetails
