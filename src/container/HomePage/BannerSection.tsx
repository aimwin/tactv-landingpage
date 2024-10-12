import { Carousel } from "flowbite-react";
import banner1 from "../../assets/images/home/bannerSection/banner1.png"
import user from "../../assets/images/home/bannerSection/user.png"


function BannerSection() {
  return (
    <div className="relative">

      <div className=" h-[130px] md:h-[250px] lg:h-[300px] xl:h-[375px] 2xl:h-[490px]">
        <Carousel pauseOnHover>
          <img src={banner1} alt="Noimage" className="rounded-none" />
          <img src={banner1} alt="Noimage" />
          <img src={banner1} alt="Noimage" />
          <img src={banner1} alt="Noimage" />
          <img src={banner1} alt="Noimage" />
        </Carousel>
      </div>

      <div className="absolute bg-[#0E7CB7] right-16 top-[40%] translate-y-[-50%]  px-6 md:px-7  lg:px-8 py-6 2xl:py-10 rounded-md leading-10  ">
        <h1 className="text-white text-sm 2xl:text-xl font-bold">உலக தரம், உள்ளூர் தொகுப்பு</h1>
        <p className="text-white text-xs 2xl:text-xl mt-3">"தமிழ்நாட்டின் முதன்மை கேபிள் டிவி சேவையை <span className="leading-5"><br />அனுபவியுங்கள்"</span></p>

        
          <div className="flex gap-4 mt-4 ">
            {/* <div >
              <select className="px-4  w-52 2xl:w-80 py-3 rounded-sm text-[#888888] 2xl:text-xl">
                <option value="">Officers Login</option>
                <option value="">DM Login</option>
                <option value="">LCO Login</option>
              </select>
            </div> */}
            <div>
              <button className="bg-white rounded-md px-7 text-primaryColor hover:bg-primaryColor hover:text-white py-2 text-lg 2xl:text-xl "
              onClick={()=>window.open('https://partner.tactv.in/app/login')}>Officers Login</button>
            </div>
          </div>
      </div>

      <div className="md:block relative ">

        <div className="absolute px-6 md:px-7 xl:px-10 py-2 bottom-11 left-28 md:bottom-8 md:left-20 xl:bottom-10  xl:left-24 2xl:left-28 bg-white rounded-r-full">

          <h1 className="text-sm 2xl:text-xl font-semibold text-[#112F4E]  ">Palanivel Thiaga Rajan</h1>
          <div className="h-px bg-[#09527A] w-full "></div>
          <p className="text-xs text-[#09527A] lg:mt-1 ">Minister for Information Technology <br />And Digital Services</p>

        </div>
        <div className="absolute left-12 bottom-9 md:bottom-6 md:left-6  lg:bottom-7 lg:left-8 ">
          <img src={user} alt="noimage" className="w-[5.5rem] md:w-20 lg:w-24 2xl:w-28  " />
        </div>
      </div>
    </div>



  )
}

export default BannerSection
