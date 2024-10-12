import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/ftaRegister';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
    isSubmitEnabled: any
}

function NavButtons({ isSubmitEnabled }: Props) {

    const currentPage = useSelector((store: any) => store.ftaRegister.currentPage)

    const dispatch = useDispatch();

    const handlePrevious = () => {
        dispatch(setCurrentPage(currentPage - 1))
    }

    return (
        <div className='flex justify-end items-center font-poppins'>

            {currentPage > 1 && (
                <button onClick={handlePrevious} className='flex items-center mt-4 me-3 border-[1px] border-[#666666] rounded-md py-3 px-3 hover:bg-gray-200 hover:border-transparent'>
                    <FaArrowLeft className='w-4 me-1' />
                    Previous
                </button>
            )}

            <button type='submit' className={`flex items-center mt-4 bg-primaryColor  text-white rounded-md py-3 px-3 ${currentPage === 4 ? `${!isSubmitEnabled ? "opacity-50 cursor-not-allowed" : ""}` : "hover:bg-secondaryColor cursor-pointer"}`}
                disabled={currentPage === 4 && !isSubmitEnabled}
            >
                {currentPage === 4 ? "Confirm and Submit" : currentPage === 1 ? "Next" : "Save & Continue"}
                <FaArrowRight className='w-4 ms-2' />
            </button>
        </div>
    )
}

export default NavButtons