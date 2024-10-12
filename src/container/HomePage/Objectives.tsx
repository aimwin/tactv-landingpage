import obj1 from "../../assets/images/home/objectives/obj1.png"
import obj2 from "../../assets/images/home/objectives/obj2.png"
import obj3 from "../../assets/images/home/objectives/obj3.png"
import obj4 from "../../assets/images/home/objectives/obj4.png"
import objright from "../../assets/images/home/objectives/objright.png"

function Objectives() {
    return (
        <div>
            <div className="grid grid-cols-12  ">

                <div className="col-span-12 order-1 md:order-none md:col-span-7 px-[5%] md:py-[4%] 2xl:py-[7%] mt-[25rem] md:mt-0">
                    <h1 className="text-primaryColor text-3xl 2xl:text-4xl font-bold ">Objectives</h1>
                    <div className="flex gap-2  md:gap-4 lg:gap-14 mt-10">
                        <div className="col-span-3 border border-[#0E7CB7] p-5 rounded-3xl w-72 2xl:w-96 border-b-8">
                            <span className="bg-primaryColor rounded-full inline-flex items-center justify-center p-2">
                                <img src={obj1} alt="Noimage" className="w-5 object-cover" />
                            </span>
                            <p className="text-[#2B2B2B] mt-2 2xl:text-xl">To reach out to the maximum customer base under the regulations of Telecom Regulatory Authority of India (TRAI) for distribution of digital cable TV services.</p>
                        </div>
                        <div className="col-span-12 md:col-span-3 border border-[#0E7CB7] p-5 rounded-3xl w-72 2xl:w-96  border-b-8">
                            <span className="bg-primaryColor rounded-full inline-flex items-center justify-center p-2">
                                <img src={obj2} alt="Noimage" className="w-5 object-cover" />
                            </span>
                            <p className="text-[#2B2B2B] mt-2 2xl:text-xl">To promote livelihood of the LCOs registered with the Corporation.<br /></p>
                        </div>

                    </div>
                    <div className="flex gap-2  md:gap-4  lg:gap-14 mt-10 ">
                        <div className="col-span-3 border border-[#0E7CB7] p-5 rounded-3xl w-72 2xl:w-96  border-b-8">
                            <span className="bg-primaryColor rounded-full inline-flex items-center justify-center p-2">
                                <img src={obj3} alt="Noimage" className="w-5 object-cover" />
                            </span>
                            <p className="text-[#2B2B2B] mt-2 2xl:text-xl">To provide citizen centric services through Arasu e-Sevai Centers in Local Bodies, Taluk Offices and District Collectorates.</p>
                        </div>
                        <div className="col-span-3 border border-[#0E7CB7] p-5 rounded-3xl w-72 2xl:w-96  border-b-8 ">
                            <span className="bg-primaryColor rounded-full inline-flex items-center justify-center p-2">
                                <img src={obj4} alt="Noimage" className="w-5 object-cover" />
                            </span>
                            <p className="text-[#2B2B2B] mt-2 2xl:text-xl">To provide Internet connectivity to every household.<br /></p>
                        </div>

                    </div>
                </div>


                <div className="relative col-span-12 order-2 md:order-none md:col-span-5 bg-[#D6E9F3] rounded-bl-[30px] md:rounded-bl-[110px] 2xl:md:rounded-bl-[140px]  ">
                    <div className="absolute -left:6 top-12 md:-left-2 md:top-32 lg:-left-12 lg:top-20  px-[3%] md:px-0">
                        <img src={objright} alt="Noimage" className="w-96 md:w-80 lg:w-96  2xl:w-[28rem] " />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Objectives
