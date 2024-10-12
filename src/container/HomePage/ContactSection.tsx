import { MdOutlineCall } from "react-icons/md";
import { IoMail } from "react-icons/io5";


function ContactSection() {
    return (
        <div className="grid grid-cols-12 gap-2 lg:gap-8 px-[3%] py-6">
            <div className="col-span-12 md:col-span-6  py-[3%]">
                <h1 className="text-3xl 2xl:text-4xl font-bold text-primaryColor">Office Location</h1>
                <p className="text-[#636363] mt-4 2xl:mt-6 text-lg 2xl:text-xl">Tamil Nadu Arasu Cable TV Corporation Limited.,<br />No.807, 4th Floor,<br />PT Lee Chengalvarayan Naicker Building,<br />Anna Salai (Mount Road),<br />Chennai - 600 002</p>
                <div className="flex mt-4 gap-2 md:gap-5 lg:gap-20">
                    <div className=" 2xl:text-xl">
                        <h1 className="flex justify-betwwen items-center gap-2"><span className="text-primaryColor"><MdOutlineCall className="size-6" /></span><span className="text-primaryColor font-bold text-lg 2xl:text-xl">Contact:</span></h1>
                        <p className="text-[#636363] text-md  mt-2">+91-44-2843 2911</p>
                        <h1 className="text-primaryColor font-bold text-lg 2xl:text-xl mt-2">TollFree:</h1>
                        <p className="text-[#636363] text-md mt-1">1800 425 29112843 2911</p>
                        <h1 className="text-primaryColor font-bold text-lg 2xl:text-xl mt-2">Fax:</h1>
                        <p className="text-[#636363] text-md mt-1">+91-44-2843 2913</p>

                    </div>
                    <div className="w-px bg-[#DFDFDF] h-[200px]"></div>
                    <div className="2xl:text-xl">
                        <h1 className="flex justify-betwwen items-center gap-2"><span className="text-primaryColor"><IoMail className="size-6" /></span><span className="text-primaryColor font-bold text-lg 2xl:text-xl">E-mail:</span></h1>
                        <p className="text-[#636363] text-md  mt-2">tactv@tactv.in</p>
                        <h1 className="text-primaryColor font-bold text-lg 2xl:text-xl mt-2">For Internet Enquiries:</h1>
                        <p className="text-[#636363] text-md mt-1">tacnet@tactv.in</p>
                    </div>

                </div>

            </div>

            <div className="col-span-12 relative md:col-span-6">
                <div className="hidden md:block absolute border bg-primaryColor md:left-5  lg:left-10  md:w-[320px] md:h-[430px] lg:w-[550px] lg:h-[420px] 2xl:w-[700px] mt-0"> </div>

                <div className="absolute left-0 top-10">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5411709353752!2d80.2631594741219!3d13.06485171282885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266118ddf371f%3A0x238763856bfbd611!2sTamil%20Nadu%20Arasu%20Cable%20TV%20Corporation%20Limited!5e0!3m2!1sen!2sin!4v1725012424964!5m2!1sen!2sin"

                        // height="450"
                        aria-hidden="false"

                        className="w-[330px] md:w-[280px] lg:w-[550px] 2xl:w-[700px] h-[250px] md:h-[450px]"

                    >

                    </iframe>
                </div>

            </div>

        </div>
    )
}

export default ContactSection
