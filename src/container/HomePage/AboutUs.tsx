import tactv from "../../assets/images/home/aboutUs/tactv.png"
import leftimg1 from "../../assets/images/home/aboutUs/leftimg1.png"
import leftimg2 from "../../assets/images/home/aboutUs/leftimg2.png"
import leftimg3 from "../../assets/images/home/aboutUs/leftimg3.png"
import rightimg1 from "../../assets/images/home/aboutUs/rightimg1.png"
import rightimg2 from "../../assets/images/home/aboutUs/rightimg2.png"
import lineimg from "../../assets/images/home/aboutUs/lineimg.png"


function AboutUs() {
    return (
        <>
            <div className="grid grid-cols-12 px-[3%] py-[10%] md:px-[3%] md:py-[2%] gap-5">
                <div className="order-2 md:order-none col-span-12 md:col-span-6 relative">

                    <div className="absolute ">
                        <img src={lineimg} alt="Noimage" className="w-14 lg:w-20" />
                    </div>
                    <div className="absolute mt-10 md:mt-20 lg:mt-12 left-12">
                        <img src={tactv} alt="Noimage" className="w-44  lg:w-80" />
                    </div>
                    <div className="absolute left-60 top-4 md:top-8  lg:left-[25rem] lg:top-5">
                        <img src={leftimg1} alt="Noimage" className="w-16  lg:w-28" />
                    </div>
                    <div className="absolute left-60 top-[5.5rem] md:top-[7rem] lg:left-[25rem] lg:top-36">
                        <img src={leftimg2} alt="Noimage" className="w-20  lg:w-36" />
                    </div>
                    <div className="absolute left-60 top-52 md:top-56 lg:left-[25rem] lg:top-[21rem]">
                        <img src={leftimg3} alt="Noimage" className="w-20 lg:w-48" />
                    </div>
                    <div className="absolute left-10 -bottom-72 md:left-12 md:bottom-36 lg:left-12 lg:-bottom-[8rem] 2xl:left-12 2xl:-bottom-28">
                        <img src={rightimg1} alt="Noimage" className="w-20 lg:w-36" />
                    </div>
                    <div className="absolute left-36 bottom-[-20rem] md:left-36 md:bottom-28 lg:left-56 lg:-bottom-[11rem] 2xl:left-56 2xl:-bottom-40 ">
                        <img src={rightimg2} alt="Noimage" className="w-20 lg:w-36" />
                    </div>
                </div>
                <div className="order-1 md:order-none col-span-12 mt-40 md:mt-20 md:col-span-6 ">
                    <h1 className="text-primaryColor font-bold text-lg lg:text-2xl 2xl:text-4xl leading-8 2xl:leading-10">
                        TAMIL NADU ARASU CABLE TV <br />CORPORATION LIMITED (TACTV)
                    </h1>
                    <p className="mt-2 lg:mt-6 text-lg 2xl:text-xl leading-8 2xl:leading-10">
                        TACTV was incorporated under Companies Act, 1956 on  04.10.2007 with an intention to provide high quality cable signals to the public at an affordable cost. To achieve the objective, high quality Digital Head Ends were installed at a cost of approximately Rs.8 Crore each at Thanjvur, Coimbatore, Tirunelveli and Vellore with control rooms and without control rooms at Madurai and Trichy.
                    </p>
                </div>
            </div>



        </>
    )
}

export default AboutUs