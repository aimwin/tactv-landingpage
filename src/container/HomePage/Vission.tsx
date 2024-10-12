import visionimg from "../../assets/images/home/aboutUs/visionimg.png"
import visionoutline from "../../assets/images/home/aboutUs/visionoutline.png"

function Vission() {
    return (
        <div>
            <div className="grid grid-cols-12 xl:gap-5 md:gap-2 bg-visionColor mt-56 md:mt-8 xl:mt-44  px-[3%]  py-6 lg:py-8 2xl:py-16 ">
                <div className="col-span-12 md:col-span-7 lg:col-span-8 py-20">
                    <h1 className="text-primaryColor text-3xl 2xl:text-4xl font-bold">Vision</h1>
                    <p className="text-[#333333] text-lg 2xl:text-xl mt-6">The Vision is to provide high quality Cable TV, e-sevai and Internet services to the public at an affordable cost using the latest and emerging Technologies.</p>
                </div>
                <div className="bg-visionColor col-span-12 md:col-span-5 lg:col-span-4 mt-9">
                    <div className="relative">
                        <div className="absolute left-24 -bottom-14 md:left-28 md:-bottom-24  xl:left-28 xl:-bottom-36 2xl:left-32 2xl:-bottom-44">
                            <img src={visionoutline} alt="Noimage" className="w-[15rem] md:w-[14rem] lg:w-72 2xl:w-[22rem]" />
                        </div>
                        <div className="absolute -top-16 md:-top-0">
                            <img src={visionimg} alt="Noimage" className=" w-[18rem] md:w-[17rem] lg:w-[22rem] 2xl:w-[26rem]" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Vission
