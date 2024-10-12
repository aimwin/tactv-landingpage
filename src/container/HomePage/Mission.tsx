import centerimage from "../../assets/images/home/mission/centerimage.png"
import leftimage11 from "../../assets/images/home/mission/leftimage11.png"
import leftimgage22 from "../../assets/images/home/mission/leftimage22.png"
import rightimage11 from "../../assets/images/home/mission/rightimage11.png"
import rightimage22 from "../../assets/images/home/mission/rightimage22.png"
import vectorimg1 from "../../assets/images/home/mission/vectorimg1.png"
import missionicon1 from "../../assets/images/home/mission/missionicon1.png"
import missionicon2 from "../../assets/images/home/mission/missionicon2.png"
import missionicon3 from "../../assets/images/home/mission/missionicon3.png"
import missionicon4 from "../../assets/images/home/mission/missionicon4.png"
import missionicon5 from "../../assets/images/home/mission/missionicon5.png"

function Mission() {
    return (
        <div>
            <div className="grid grid-cols-12 px-[3%] py-[3%] gap-5 bg-missionColor  ">
                {/* leftside */}
                <div className="order-2 md:order-none col-span-12 md:col-span-6 relative md:mt-10 ">

                    <div className="absolute left-8 top-28 md:left-10 md:top-40 lg:top-48 xl:left-20 xl:top-0 ">
                        <img src={centerimage} alt="Noimage" className="w-60  md:w-60 lg:w-96" />
                    </div>
                    <div className="absolute left-14 -bottom-80 md:left-10 md:bottom-80  lg:left-28 lg:bottom-8 2xl:bottom-1">
                        <img src={vectorimg1} alt="Noimage" className="w-44  md:w-52 lg:w-72 2xl:w-80" />
                    </div>
                    <div className="absolute left-14 -bottom-[13rem] md:left-12 md:bottom-[29rem] lg:left-36 lg:bottom-60 " >
                        <img src={leftimage11} alt="Noimage" className="w-24  md:w-24 lg:w-36" />
                    </div>
                    <div className="absolute left-4 -bottom-[24rem] md:left-3 md:bottom-72 lg:left-12 lg:bottom-0 2xl:-bottom-7">
                        <img src={leftimgage22} alt="Noimage" className="w-36  md:w-36  lg:w-56 " />
                    </div>
                    <div className="absolute left-56 -bottom-[11rem] md:left-60 md:bottom-[30rem] lg:left-96 lg:bottom-72 2xl:left-[25rem] 2xl:bottom-64">
                        <img src={rightimage11} alt="Noimage" className="w-28 lg:w-32 md:w-24 2xl:w-36  " />
                    </div>
                    <div className="absolute left-56  -bottom-[24rem] md:left-60 md:bottom-72 lg:left-96 lg:bottom-0 2xl:left-[25rem] 2xl:-bottom-7">
                        <img src={rightimage22} alt="Noimage" className="w-28 lg:w-32 md:w-24 2xl:w-36" />
                    </div>
                </div>
                {/* rightside */}
                <div className="order-1 md:order-none col-span-12 mt-28 md:mt-10 md:col-span-6 2xl:text-xl ">
                    <h1 className="text-primaryColor text-3xl xl:text-4xl font-bold">Mission</h1>
                    <div className="md:col-span-3 mt-5">
                        <div className="flex gap-4  ">
                            <div className="bg-white border rounded-md px-4 py-4 shadow-md">
                                <img src={missionicon1} alt="Noimage" className="w-10" />
                                <p className="mt-2 text-[#2B2B2B]">To provide high quality Cable TV service to the public at an affordable cost through the LCOs.</p>
                            </div>
                            <div className="bg-white border rounded-md px-4 py-4 shadow-md">
                                <img src={missionicon2} alt="Noimage" className="w-10" />
                                <p className="mt-2 text-[#2B2B2B]" >To provide enabling environment to facilitate livelihood to LCOs through cable TV and Internet services.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-3 mt-4">
                        <div className="flex gap-4 [text-[#2B2B2B] ">
                            <div className="bg-white border rounded-md px-4 py-4 shadow-md">
                                <img src={missionicon3} alt="Noimage" className="w-10" />
                                <p className="mt-2 ">To phase out Analog transmission and promote Digital Cable TV services.</p>
                            </div>
                            <div className="bg-white border rounded-md px-4 py-4 shadow-md">
                                <img src={missionicon4} alt="Noimage" className="w-10" />
                                <p className="mt-2">To establish role model e-sevai front offices for the benefit of the public.</p>
                            </div>
                            <div className="bg-white border rounded-md px-4 py-4 shadow-md">
                                <img src={missionicon5} alt="Noimage" className="w-10" />
                                <p className="mt-2">To provide high quality Internet service to the public at an affordable cost through the LCOs.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mission
