import newsbg from "../../assets/images/home/latestNews/newsbg.png"
import { FaArrowRightLong } from "react-icons/fa6"
import newslogo from "../../assets/images/home/latestNews/newslogo.png"

function LatestNews() {
    return (
        <div className="md:mt-10 bg-newsColor py-[3%] mt-[30rem]">
            <h1 className="text-white text-3xl 2xl:text-4xl font-bold text-center">Latest News</h1>
            <div className="grid grid-col-span-12 mt-14 px-1 md:px-[6%]  bg-newsColor">
                <div className="relative  md:right-4  col-span-12 md:py-[10%] lg:py-[2%]  ">
                    <div className="pl-3 md:pl-4 lg:pl-7   md:block ">
                        <span className="shadow-md"><img src={newsbg} alt="Noimage" className="w-full h-[23rem] md:h-[17rem] 2xl:h-[18.5rem] " /></span>
                    </div>

                    <div className="absolute -top-5  md:right-5 md:-top-6  bg-white  py-8 md:py-6 lg:py-8 px-2 md:px-12  rounded-xl  2xl:p-[2.2%]  shadow-lg md:shadow-md 2xl:shadow-xl">
                        <h1 className="text-newsColor text-md md:text-lg lg:text-2xl 2xl:text-3xl  font-bold text-center mt-10 md:mt-4 2xl:mt-6 ">Recruitment of Manager (Finance) on Contract Basis</h1>
                        <div className="absolute bottom-[17.7rem] right-1 md:bottom-[15rem] lg:bottom-[12.8rem] md:-right-0  2xl:bottom-[14.6rem] 2xl:-right-0 ">
                            <h1 className="bg-primaryColor text-white px-4 py-2 md:py-4  font-bold rounded-tr-md">07</h1>
                            <p className="bg-[#D6E9F3] text-[#0E7CB7] px-4  py-1 md:py-1 font-bold">Jan</p>
                        </div>
                        <div className="absolute -left:12 bottom-[18rem] md:bottom-64 lg:bottom-56 md:-left-10  2xl:-left-14 2xl:bottom-[14rem]">
                            <img src={newslogo} alt="Noimage" className="w-28  2xl:w-36" />
                        </div>
                        <p className="mt-6 text-center text-[#414141] text-sm md:text-lg  2xl:text-xl px-3 md:px-0">Minimum 3 Yrs of post qualification experience in Finalization of Accounts, Direct tax, Indirect tax of State/Central Public Sector undertaking or reputed Public and Private Ltd Companies or CA Firms.</p>
                        <p className="text-[#777777] text-center mt-6 md:mt-4 mg:mt-2 text-md 2xl:text-lg">Jan 07, 2024</p>
                        <div className="flex justify-center items-center mt-3">
                            <button className="flex justify-between items-center bg-primaryColor text-white p-2 md:p-3 2xl:p-4 rounded-md md:text-md 2xl:text-xl ">Read More<span className="pl-2"><FaArrowRightLong /></span></button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default LatestNews
