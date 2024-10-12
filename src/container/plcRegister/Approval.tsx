import { Button, Modal } from 'flowbite-react';
import tactvLogo from "../../assets/images/home/headerTop/tactv_logo.png";
import approvalImg from "../../assets/images/lcoRegister/approval_icon.svg";
import { useNavigate } from 'react-router-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { resetFormData, setCurrentPage } from '../../redux/slices/plcRegister';

function Approval({ openModal, toggleApporval }: any) {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  if (!openModal) return null;

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
    <Modal
      className="bg-[#207478] font-poppins"
      show={openModal}
      size="md"
      popup
      onClose={toggleApporval}
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
          Your Private Local Channel application form has been completed.
          Once Approved we will send userName & password via sms or email.
          </p>
          <a href="https://appicms.aimwindow.in/login" target="_blank">
            <Button
              onClick={() => {
                toggleApporval();
                handleLogout();
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
      </Modal.Body>
    </Modal>
  )
}

export default Approval