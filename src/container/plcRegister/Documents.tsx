import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import NavButtons from './NavButtons';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { getFormDetails } from '../../api-service/api/PlcApi';
import { imageUpload } from '../../api-service/api/authApi';
import { setCurrentPage, updateFormData } from '../../redux/slices/plcRegister';
import { FaEye, FaUser } from 'react-icons/fa';
import { MdCancel, MdInfoOutline, MdOutlineFileUpload } from 'react-icons/md';
import DocumentViewer from '../../components/documentViewer';

type Props = {}

function Documents({ }: Props) {

    const [documentItem , setDocumentItem] = useState({})
    const [documentModal , setDocumentModal] = useState(false)

    const currentPage = useSelector(
        (store: any) => store.plcRegister.currentPage
    );

    const formData = useSelector((store: any) => store.plcRegister.formData);

    const { handleSubmit, setValue } = useForm({
        defaultValues: {
            ...formData
        },
    })

    const formDetails = useQuery({
        queryKey: ['getFormDetails'],
        queryFn: () => getFormDetails(),
    });


    const dispatch = useDispatch();

    const [passportUrlLoading, setPassportUrlLoading] = useState(false)
    const [licenseImgUrl, setLicenseImgUrl] = useState('');
    const [licenseImgUrlEror, setLicenseImgUrlError] = useState('');

    const [IDProofUrlLoading, setIDProofUrlLoading] = useState(false)
    const [IDProofImgUrl, setIDProofImgUrl] = useState('');
    const [IDProofImgUrlError, setIDProofImgUrlError] = useState('');

    const [addressProofUrlLoading, setAddressProofUrlLoading] = useState(false)
    const [addressProofImgUrl, setAddressProofImgUrl] = useState('');
    const [addressProofImgUrlError, setAddressProofImgUrlError] = useState('');


    const [bankUrlLoading, setBankUrlLoading] = useState(false)
    const [bankImgUrl, setBankImgUrl] = useState('');
    const [bankImgUrlError, setBankImgUrlError] = useState('');

    const [postalUrlLoading, setPostalUrlLoading] = useState(false)
    const [postalImgUrl, setPostalImgUrl] = useState('');
    const [postalImgUrlError, setPostalImgUrlError] = useState('');


    useEffect(() => {
        if (formData) {
            setLicenseImgUrl(formData.licenseImgUrl || '');
            setIDProofImgUrl(formData.IDProofImgUrl || '');
            setAddressProofImgUrl(formData.addressProofImgUrl || '');
            setBankImgUrl(formData.bankImgUrl || '');
            setPostalImgUrl(formData.postalImgUrl || '');
        }
    }, [formData]);

    const onSubmit = async (data: any) => {

        let hasErrors = false

        setLicenseImgUrlError('');
        setIDProofImgUrlError('');
        setAddressProofImgUrlError("")
        setBankImgUrlError("")
        setPostalImgUrlError("")

        if (licenseImgUrl === '') {
            setLicenseImgUrlError("The Field Is Required. Please Upload a file.")
            hasErrors = true;
        } else setLicenseImgUrlError("")

        if (IDProofImgUrl === '') {
            setIDProofImgUrlError("The Field Is Required. Please Upload a file.")
            hasErrors = true;
        } else setIDProofImgUrlError("")

        if (addressProofImgUrl === '') {
            setAddressProofImgUrlError("The Field Is Required. Please Upload a file.")
            hasErrors = true;
        } else setAddressProofImgUrlError("")

        if (bankImgUrl === '') {
            setBankImgUrlError("The Field Is Required. Please Upload a file.")
            hasErrors = true;
        } else setBankImgUrlError("")

        if (postalImgUrl === '') {
            setPostalImgUrlError("The Field Is Required. Please Upload a file.")
            hasErrors = true;
        } else setPostalImgUrlError("")

        if (hasErrors) {
            return;
        }

        console.log(data);

        dispatch(updateFormData({ ...data, licenseImgUrl, IDProofImgUrl, addressProofImgUrl, bankImgUrl, postalImgUrl }))
        dispatch(setCurrentPage(currentPage + 1))
    }

    const handleUploadPassportPhoto = async (e: any) => {
        setPassportUrlLoading(true);
        if (e.target.files) {

            const file = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/png', ]; // Allowed formats: jpg, png, pdf

            if (file.size > 2 * 1024 * 1024) {
                setLicenseImgUrlError("upload file upto 2MB only");
                toast.error('File size exceeds 2MB.');
                setPassportUrlLoading(false);
                e.target.value = '';
                return;
            } else setLicenseImgUrlError("");

                            // Check file type
            if (!allowedFileTypes.includes(file.type)) {
                setLicenseImgUrlError("Only JPG, PNG files are allowed.");
                toast.error('Invalid file format. Please upload JPG, PNG.');
                setPassportUrlLoading(false);
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                const uploadData = await imageUpload(formData);
                if (
                    uploadData &&
                    uploadData.data.result &&
                    uploadData.data.result.length
                ) {
                    const imageUrl = uploadData.data.result[0].location;
                    setLicenseImgUrl(imageUrl);
                    setLicenseImgUrlError("");
                }
                setPassportUrlLoading(false);
            } catch (error) {
                toast.error('Something went wrong...');
                setPassportUrlLoading(false);
            }
        }
    };

    const handleUploadIDProof = async (e: any) => {
        setIDProofUrlLoading(true);
        if (e.target.files) {

            const file = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed formats: jpg, png, pdf

            if (file.size > 2 * 1024 * 1024) {
                setIDProofImgUrlError("upload file upto 2MB only");
                toast.error('File size exceeds 2MB.');
                setIDProofUrlLoading(false);
                e.target.value = '';
                return;
            } else setIDProofImgUrlError("");

            // Check file type
            if (!allowedFileTypes.includes(file.type)) {
                setIDProofImgUrlError("Only JPG, PNG, or PDF files are allowed.");
                toast.error('Invalid file format. Please upload JPG, PNG, or PDF.');
                setIDProofUrlLoading(false);
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                const uploadData = await imageUpload(formData);
                if (
                    uploadData &&
                    uploadData.data.result &&
                    uploadData.data.result.length
                ) {
                    const imageUrl = uploadData.data.result[0].location;
                    setIDProofImgUrl(imageUrl);
                    setIDProofImgUrlError("");
                }
                setIDProofUrlLoading(false);
            } catch (error) {
                toast.error('Something went wrong...');
                setIDProofUrlLoading(false);
            }
        }
    };

    const handleUploadAddress = async (e: any) => {
        setAddressProofUrlLoading(true);
        if (e.target.files) {

            const file = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed formats: jpg, png, pdf

            if (file.size > 2 * 1024 * 1024) {
                setAddressProofImgUrlError("upload file upto 2MB only");
                toast.error('File size exceeds 2MB.');
                setAddressProofUrlLoading(false);
                e.target.value = '';
                return;
            } else setAddressProofImgUrlError("");

            // Check file type
            if (!allowedFileTypes.includes(file.type)) {
                setAddressProofImgUrlError("Only JPG, PNG, or PDF files are allowed.");
                toast.error('Invalid file format. Please upload JPG, PNG, or PDF.');
                setAddressProofUrlLoading(false);
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                const uploadData = await imageUpload(formData);
                if (
                    uploadData &&
                    uploadData.data.result &&
                    uploadData.data.result.length
                ) {
                    const imageUrl = uploadData.data.result[0].location;
                    setAddressProofImgUrl(imageUrl);
                    setAddressProofImgUrlError("");
                }
                setAddressProofUrlLoading(false);
            } catch (error) {
                toast.error('Something went wrong...');
                setAddressProofUrlLoading(false);
            }
        }
    };


    const handleUploadBankProof = async (e: any) => {
        setBankUrlLoading(true);
        if (e.target.files) {

            const file = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed formats: jpg, png, pdf
            
            if (file.size > 2 * 1024 * 1024) {
                setBankImgUrlError("upload file upto 2MB only");
                toast.error('File size exceeds 2MB.');
                setBankUrlLoading(false);
                e.target.value = '';
                return;
            } else setBankImgUrlError("");

            // Check file type
            if (!allowedFileTypes.includes(file.type)) {
                setBankImgUrlError("Only JPG, PNG, or PDF files are allowed.");
                toast.error('Invalid file format. Please upload JPG, PNG, or PDF.');
                setBankUrlLoading(false);
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                const uploadData = await imageUpload(formData);
                if (
                    uploadData &&
                    uploadData.data.result &&
                    uploadData.data.result.length
                ) {
                    const imageUrl = uploadData.data.result[0].location;
                    setBankImgUrl(imageUrl);
                    setBankImgUrlError("");
                }
                setBankUrlLoading(false);
            } catch (error) {
                toast.error('Something went wrong...');
                setBankUrlLoading(false);
            }
        }
    };

    const handleUploadPostal = async (e: any) => {
        setPostalUrlLoading(true);
        if (e.target.files) {

            const file = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed formats: jpg, png, pdf

            if (file.size > 2 * 1024 * 1024) {
                setPostalImgUrlError("upload file upto 2MB only");
                toast.error('File size exceeds 2MB.');
                setPostalUrlLoading(false);
                e.target.value = '';
                return;
            } else setPostalImgUrlError("");

            // Check file type
            if (!allowedFileTypes.includes(file.type)) {
                setPostalImgUrlError("Only JPG, PNG, or PDF files are allowed.");
                toast.error('Invalid file format. Please upload JPG, PNG, or PDF.');
                setPostalUrlLoading(false);
                e.target.value = ''; // Clear the file input
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                const uploadData = await imageUpload(formData);
                if (
                    uploadData &&
                    uploadData.data.result &&
                    uploadData.data.result.length
                ) {
                    const imageUrl = uploadData.data.result[0].location;
                    setPostalImgUrl(imageUrl);
                    setPostalImgUrlError("");
                }
                setPostalUrlLoading(false);
            } catch (error) {
                toast.error('Something went wrong...');
                setPostalUrlLoading(false);
            }
        }
    };



    useEffect(() => {
        const allFormDetailsDosc = formDetails?.data?.data?.result?.documents

        if (allFormDetailsDosc) {
            setLicenseImgUrl(allFormDetailsDosc.passportSizePhoto)
            setIDProofImgUrl(allFormDetailsDosc.idProof)
            setAddressProofImgUrl(allFormDetailsDosc.adressProof)
            setBankImgUrl(allFormDetailsDosc.bankAccountProof)
            setPostalImgUrl(allFormDetailsDosc.postalLicence)
        }

    }, [formDetails?.data?.data?.result?.documents])


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='my-5 mx-[8%]'>
                <div className='font-poppins'>

                    <div className='bg-[#1d784827] w-full px-2 py-3 rounded-md'>
                        <p className='text-primaryColor flex-row lg:flex items-center text-base xl:text-lg'>
                            <MdInfoOutline className='w-5 h-5 me-2 text-primaryColor' />
                            All Documents should be in jpg / png / pdf format only <span className='text-black font-bold mx-1'>(Upto 2MB Size only)</span> Upload Each file one by one</p>
                    </div>

                    <div className='border-[1px] border-[#DFDFDF] rounded-sm grid grid-cols-12 gap-5 mt-4 py-3 px-2'>
                        <div className='col-span-12 md:col-span-6 lg:col-span-3 border-[1px] border-[#DFDFDF] rounded-sm w-full'>
                            <p className='capitalize font-medium bg-[#DFDFDF] p-2 '>passport size photo</p>

                            {licenseImgUrl ?
                                (
                                    <>
                                        {passportUrlLoading ? (
                                            // <Spinner aria-label="Default status example" />
                                            <h2>Loading.......</h2>
                                        ) : (
                                            <>
                                                {licenseImgUrl && (
                                                    <div className=" h-36 xl:h-52 cursor-pointer my-3 w-[90%] flex justify-center  mx-auto">

                                                        <img
                                                            className="rounded-md h-full w-full  border-[1px] border-[#DFDFDF]"
                                                            alt="No Image"
                                                            src={licenseImgUrl}
                                                        />
                                                        <MdCancel className=' w-4 h-4 ms-1 hover:scale-110 hover:text-primaryColor' onClick={() => {
                                                            setLicenseImgUrl('')
                                                            setValue('licenseImgUrl', '')
                                                        }} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className='h-52 mx-4 my-3 bg-[#dfdfdf4d] flex justify-center items-center'>
                                            <FaUser className='w-10 h-10' />
                                        </div>
                                    </>
                                )}
                            {licenseImgUrlEror && <p className='text-red-400 text-xs  font-medium mx-4'>{licenseImgUrlEror}</p>}

                            <div className='mx-4 bg-[#dfdfdfb0] rounded-md mt-3 py-2 mb-3'>
                                <label htmlFor="uploadProfile" className='flex items-center mx-auto justify-center'>
                                    <MdOutlineFileUpload className='w-4 h-4 me-1' />
                                    Upload Photo</label>
                                <input
                                    id='uploadProfile'
                                    type="file"
                                    onChange={handleUploadPassportPhoto}
                                    className='hidden' />
                            </div>
                        </div>

                        <div className='col-span-12 md:col-span-6 lg:col-span-9'>
                            <div className='grid grid-cols-12 gap-5'>

                                <div className='col-span-12  lg:col-span-6  '>
                                    <div className='font-medium text-sm'>
                                        ID Proof<span className='text-red-400 ms-1'>*</span>
                                    </div>
                                    <div className="mt-1">
                                        <div className='border-[1px] p-1 flex justify-between items-center border-[#DFDFDF] rounded-md'>
                                            {IDProofImgUrl ?
                                                (
                                                    <>
                                                        {IDProofUrlLoading ? (
                                                            // <Spinner aria-label="Default status example" />
                                                            <h2>Loading.......</h2>
                                                        ) : (
                                                            <>
                                                            {IDProofImgUrl && 
                                                            <div className='flex justify-between mx-4 my-3 w-full'>
                                                            {IDProofImgUrl.endsWith('.pdf') ? 
                                                             (
                                                              <div className='h-20 cursor-pointer  flex  me-3 '>
                                                               <p>The Uploaded file format is pdf  please click to view</p>
                                                              </div>
                                                             ) :(
                                                              <div className='flex justify-between mx-4 my-3 w-full'>
                                                              <div className=" h-24 cursor-pointer  flex  w-32 ">
                                                                <img
                                                                  className="rounded-md h-full w-[80%] mr-auto  border-[1px] border-[#DFDFDF] "
                                                                  alt="No Image"
                                                                  src={IDProofImgUrl}
                                                                />
                                                                <MdCancel className=' w-[18px] hover:scale-110 ms-1 hover:text-primaryColor' onClick={() => {
                                                                  setIDProofImgUrl('')
                                                                  setValue('IDProofImgUrl', '')
                                                                }} />
                                                              </div>
                                                             
                                                            </div>
                                                             )}
                                                             <div className='bg-primaryColor/50  rounded-md text-white hover:bg-primaryColor hover:text-white h-fit p-1 cursor-pointer'>
                                                             <FaEye className='w-5 h-5'
                                                               onClick={() => {
                                                                 setDocumentItem({
                                                                     val: IDProofImgUrl,
                                                                     key: IDProofImgUrl?.endsWith('.pdf') ? 'document' : 'image'
                                                                 }),
                                                                     setDocumentModal(true);
                                                                 }}
                                                             />
                                                           </div>
                                                           </div>
                                                            }
                                                          </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='ml-auto'>
                                                            <label className='bg-gray-100 border-[1px] p-2 cursor-pointer  rounded-md w-full flex items-center mx-auto justify-center text-sm' htmlFor="IDproof">
                                                                <MdOutlineFileUpload className='w-4 h-4 me-1' />
                                                                Upload File</label>
                                                            <input
                                                                id='IDproof'
                                                                type="file"
                                                                className='hidden'
                                                                onChange={handleUploadIDProof}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                    {IDProofImgUrlError && <p className='text-red-400 text-xs mt-1 font-medium'>{IDProofImgUrlError}</p>}
                                </div>

                                <div className='col-span-12  lg:col-span-6  '>
                                    <div className='font-medium text-sm'>
                                        Address Proof (Ration card/Voter ID/Driving License)<span className='text-red-400 ms-1'>*</span>
                                    </div>
                                    <div className="mt-1">
                                        <div className='border-[1px] p-1 flex justify-between items-center border-[#DFDFDF] rounded-md'>
                                            {addressProofImgUrl ?
                                                (
                                                    <>
                                                        {addressProofUrlLoading ? (
                                                            <h2>Loading.......</h2>
                                                            // <Spinner aria-label="Default status example" />

                                                        ) : (
                                                            <>
                                                                {addressProofImgUrl && 
                                                                <div className='flex justify-between mx-4 my-3 w-full'>
                                                                {addressProofImgUrl.endsWith('.pdf') ? 
                                                                (
                                                                <div className='h-20 cursor-pointer  flex  me-3 '>
                                                                    <p>The Uploaded file format is pdf  please click to view</p>
                                                                </div>
                                                                ) :(
                                                                <div className='flex justify-between mx-4 my-3 w-full'>
                                                                <div className=" h-24 cursor-pointer  flex  w-32 ">
                                                                    <img
                                                                    className="rounded-md h-full w-[80%] mr-auto  border-[1px] border-[#DFDFDF] "
                                                                    alt="No Image"
                                                                    src={addressProofImgUrl}
                                                                    />
                                                                    <MdCancel className=' w-[18px] hover:scale-110 ms-1 hover:text-primaryColor' onClick={() => {
                                                                    setAddressProofImgUrl('')
                                                                    setValue('IDProofImgUrl', '')
                                                                    }} />
                                                                </div>
                                                                
                                                                </div>
                                                                )}
                                                                <div className='bg-primaryColor/50  rounded-md text-white hover:bg-primaryColor hover:text-white h-fit p-1 cursor-pointer'>
                                                                <FaEye className='w-5 h-5'
                                                                    onClick={() => {
                                                                    setDocumentItem({
                                                                        val: addressProofImgUrl,
                                                                        key: addressProofImgUrl?.endsWith('.pdf') ? 'document' : 'image'
                                                                    }),
                                                                        setDocumentModal(true);
                                                                    }}
                                                                />
                                                                </div>
                                                                </div>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='ml-auto'>
                                                            <label className='bg-gray-100 border-[1px] p-2 cursor-pointer  rounded-md w-full flex items-center mx-auto justify-center text-sm' htmlFor="addressProof">
                                                                <MdOutlineFileUpload className='w-4 h-4 me-1' />
                                                                Upload File</label>
                                                            <input
                                                                id='addressProof'
                                                                type="file"
                                                                className='hidden'
                                                                onChange={handleUploadAddress}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                    {addressProofImgUrlError && <p className='text-red-400 text-xs mt-1 font-medium'>{addressProofImgUrlError}</p>}
                                </div>
                                <div className='col-span-12  lg:col-span-6  '>
                                    <div className='font-medium text-sm'>
                                        Bank Account Proof<span className='text-red-400 ms-1'>*</span>
                                    </div>
                                    <div className="mt-1">
                                        <div className='border-[1px] p-1 flex justify-between items-center border-[#DFDFDF] rounded-md'>
                                            {bankImgUrl ?
                                                (
                                                    <>
                                                        {bankUrlLoading ? (
                                                            <div className="min-h-24 flex justify-center items-center w-full">
                                                                <Spinner aria-label="Default status example" />;
                                                            </div>
                                                        ) : (
                                                            <>
                                                            {bankImgUrl && 
                                                            <div className='flex justify-between mx-4 my-3 w-full'>
                                                            {bankImgUrl.endsWith('.pdf') ? 
                                                             (
                                                              <div className='h-20 cursor-pointer  flex  me-3 '>
                                                               <p>The Uploaded file format is pdf  please click to view</p>
                                                              </div>
                                                             ) :(
                                                              <div className='flex justify-between mx-4 my-3 w-full'>
                                                              <div className=" h-24 cursor-pointer  flex  w-32 ">
                                                                <img
                                                                  className="rounded-md h-full w-[80%] mr-auto  border-[1px] border-[#DFDFDF] "
                                                                  alt="No Image"
                                                                  src={bankImgUrl}
                                                                />
                                                                <MdCancel className=' w-[18px] hover:scale-110 ms-1 hover:text-primaryColor' onClick={() => {
                                                                  setBankImgUrl('')
                                                                  setValue('IDProofImgUrl', '')
                                                                }} />
                                                              </div>
                                                             
                                                            </div>
                                                             )}
                                                             <div className='bg-primaryColor/50  rounded-md text-white hover:bg-primaryColor hover:text-white h-fit p-1 cursor-pointer'>
                                                             <FaEye className='w-5 h-5'
                                                               onClick={() => {
                                                                 setDocumentItem({
                                                                     val: bankImgUrl,
                                                                     key: bankImgUrl?.endsWith('.pdf') ? 'document' : 'image'
                                                                 }),
                                                                     setDocumentModal(true);
                                                                 }}
                                                             />
                                                           </div>
                                                           </div>
                                                            }
                                                          </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='ml-auto'>
                                                            <label className='bg-gray-100 border-[1px] p-2 cursor-pointer  rounded-md w-full flex items-center mx-auto justify-center text-sm' htmlFor="bankProof">
                                                                <MdOutlineFileUpload className='w-4 h-4 me-1' />
                                                                Upload File</label>
                                                            <input
                                                                id='bankProof'
                                                                type="file"
                                                                className='hidden'
                                                                onChange={handleUploadBankProof}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                    {bankImgUrlError && <p className='text-red-400 text-xs mt-1 font-medium'>{bankImgUrlError}</p>}
                                </div>

                                <div className='col-span-12  lg:col-span-6  '>
                                    <div className='font-medium text-sm'>
                                        Postal Licence<span className='text-red-400 ms-1'>*</span>
                                    </div>
                                    <div className="mt-1">
                                        <div className='border-[1px] p-1 flex justify-between items-center border-[#DFDFDF] rounded-md'>
                                            {postalImgUrl ?
                                                (
                                                    <>
                                                        {postalUrlLoading ? (
                                                            <div className="min-h-24 flex justify-center items-center w-full">
                                                                <Spinner aria-label="Default status example" />;
                                                            </div>
                                                        ) : (
                                                            <>
                                                            {postalUrlLoading ? (
                                                              <div className="min-h-24 flex justify-center items-center w-full">
                                                                <Spinner aria-label="Default status example" />;
                                                              </div>
                                                            ) : (
                                                              <>
                                                          {postalImgUrl && 
                                                          <div className='flex justify-between mx-4 my-3 w-full'>
                                                          {postalImgUrl.endsWith('.pdf') ? 
                                                           (
                                                            <div className='h-20 cursor-pointer  flex  me-3 '>
                                                             <p>The Uploaded file format is pdf  please click to view</p>
                                                            </div>
                                                           ) :(
                                                            <div className='flex justify-between mx-4 my-3 w-full'>
                                                            <div className=" h-24 cursor-pointer  flex  w-32 ">
                                                              <img
                                                                className="rounded-md h-full w-[80%] mr-auto  border-[1px] border-[#DFDFDF] "
                                                                alt="No Image"
                                                                src={postalImgUrl}
                                                              />
                                                              <MdCancel className=' w-[18px] hover:scale-110 ms-1 hover:text-primaryColor' onClick={() => {
                                                                setPostalImgUrl('')
                                                                setValue('IDProofImgUrl', '')
                                                              }} />
                                                            </div>
                                                           
                                                          </div>
                                                           )}
                                                           <div className='bg-primaryColor/50  rounded-md text-white hover:bg-primaryColor hover:text-white h-fit p-1 cursor-pointer'>
                                                           <FaEye className='w-5 h-5'
                                                             onClick={() => {
                                                               setDocumentItem({
                                                                   val: postalImgUrl,
                                                                   key: postalImgUrl?.endsWith('.pdf') ? 'document' : 'image'
                                                               }),
                                                                   setDocumentModal(true);
                                                               }}
                                                           />
                                                         </div>
                                                         </div>
                                                          }
                                                        </>
                                                            )}
                                                          </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='ml-auto'>
                                                            <label className='bg-gray-100 border-[1px] p-2 cursor-pointer  rounded-md w-full flex items-center mx-auto justify-center text-sm' htmlFor="postalProof">
                                                                <MdOutlineFileUpload className='w-4 h-4 me-1' />
                                                                Upload File</label>
                                                            <input
                                                                id='postalProof'
                                                                type="file"
                                                                className='hidden'
                                                                onChange={handleUploadPostal}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                    {postalImgUrlError && <p className='text-red-400 text-xs mt-1 font-medium'>{postalImgUrlError}</p>}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <NavButtons isSubmitEnabled={null} />
            </form>

            {/* <Modal show={openImgModal} onClose={() => setOpenImgModal(!openImgModal)} size="md">
                <Modal.Header
                    onClick={() => setOpenImgModal(!openImgModal)}
                >{modalImgUrlTitle}
                </Modal.Header>
                <Modal.Body className='overflow-y-auto mx-auto'>
                    <div className='mx-auto h-[100%] w-[100%] '>
                        <img src={modalImgUrl} className='!w-full !h-full mx-auto' alt="No Image" />
                    </div>
                </Modal.Body>

            </Modal> */}

<DocumentViewer open={documentModal} handleModal={()=>setDocumentModal(!documentModal)} document={documentItem}/>
        </>
    )
}

export default Documents