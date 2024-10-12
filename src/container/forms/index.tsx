import formicon from "../../assets/images/form/formicon.png"
import HeaderTop from "../HomePage/HeaderTop"
import Footer from "../../components/footer"
import NavbarIndex from "../../components/navbar/NavbarIndex"
import { useState } from "react"
import LcoOtpSendModal from "../lcoRegister/modal/LcoOtpSendModal"
import PlcOtpSendModal from "../plcRegister/modal/PlcOtpSendModal"
import { FaArrowRight } from "react-icons/fa"
import FtaOtpSendModal from "../ftaRegister/modal/FtaOtpSendModal"
function Forms() {

  const [openModal, setOpenModal] = useState(false)
  const [openPlcModal, setOpenPlcModal] = useState(false)
  const [openFtaModal, setOpenFtaModal] = useState(false)

  return (
    <>
      <HeaderTop />
      <NavbarIndex />
      <div className="font-semibold px-[3%] py-6 text-3xl text-gray-600">Forms</div>
      <div className="grid grid-cols-12 px-[3%]">
        <div className="flex col-span-12 flex-col md:flex-row md:col-span-12 md:gap-5">
          <div className="md:gap-1 xl:gap-2 border rounded-xl shadow-md md:px-[1%] xl:px-[2%]  md:py-4 2xl:py-7">
            <div className="flex justify-between items-center ">
              <div>
                <img src={formicon} alt="Noimage" className="w-14 md:w-7 xl:w-14 object-contain" />
              </div>
              <div className="md:text-sm xl:text-xl 2xl:text-2xl cursor-pointer text-[#333333] font-semibold"
                 >
                LCO Application Form
              </div>
              <button className="border rounded-full bg-primaryColor md:p-1 xl:p-3" onClick={() => setOpenModal(true)}><span className="text-xl text-white"><FaArrowRight /></span></button>
            </div>
            <div className="h-px bg-[#DFDFDF] w-full mt-2"></div>
            <div className="mt-3">
              <p className="text-[#666666] md:text-md 2xl:text-xl">The LCO Application Form is used to collect essential information from local cable operators (LCOs) for registration and service management.</p>
            </div>
          </div>
          <div className="md:gap-1 xl:gap-2 border rounded-xl shadow-md px-[2%] md:py-4 2xl:py-7">
            <div className="flex justify-between items-center ">
              <div>
                <img src={formicon} alt="Noimage" className="w-14 md:w-7 xl:w-14 object-contain" />
              </div>
              <div className="md:text-sm xl:text-xl 2xl:text-2xl cursor-pointer text-[#333333] font-semibold">
                PLC Application Form
              </div>
              <button className="border rounded-full bg-primaryColor md:p-1 xl:p-3" onClick={() => setOpenPlcModal(true)} ><span className="text-xl text-white"><FaArrowRight /></span></button>
            </div>
            <div className="h-px bg-[#DFDFDF] w-full mt-2"></div>
            <div className="mt-3">
              <p className="text-[#666666] md:text-md 2xl:text-xl">The TDS Request Form is used to request tax deduction at source (TDS) certificates or related details for financial transactions.</p>
            </div>

          </div>
          <div className="md:gap-1 xl:gap-2 border rounded-xl shadow-md px-[2%] md:py-4 2xl:py-7">
            <div className="flex justify-between items-center ">
              <div>
                <img src={formicon} alt="Noimage" className="w-14 md:w-7 xl:w-14 object-contain" />
              </div>
              <div className="md:text-sm xl:text-xl 2xl:text-2xl cursor-pointer text-[#333333] font-semibold" >
                FTA Application Form
              </div>
              <button className="border rounded-full bg-primaryColor md:p-1 xl:p-3" onClick={() => setOpenFtaModal(true)}><span className="text-xl text-white"><FaArrowRight /></span></button>
            </div>
            <div className="h-px bg-[#DFDFDF] w-full mt-2"></div>
            <div className="mt-3">
              <p className="text-[#666666] md:text-md 2xl:text-xl">The TDS Request Form is utilized for submitting requests related to tax deduction at source (TDS), including corrections, claims, or certificate reissuance.</p>
            </div>
          </div>
        </div>
      </div>
      {/* LCO Application Modal */}
      {openModal && (
        <LcoOtpSendModal
          isOpenModal={openModal}
          toggle={() => setOpenModal(!openModal)} // Close modal without navigation
        />
      )}

      {/* PLC Application Modal */}
      {openPlcModal && (
        <PlcOtpSendModal
          isOpenModal={openPlcModal}
          toggle={() => setOpenPlcModal(!openPlcModal)} // Close modal without navigation
        />
      )}
      {/* FTA application form */}
      {openFtaModal && (
        <FtaOtpSendModal
          isOpenModal={openFtaModal}
          toggle={() => setOpenFtaModal(!openFtaModal)} // Close modal without navigation
        />
      )}
      <Footer />
    </>
  )
}

export default Forms
