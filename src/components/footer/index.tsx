import tactv_logo from "../../assets/images/home/headerTop/tactv_logo.png"
import facebook from "../../assets/images/footer/facebook.png"
import playstore from "../../assets/images/footer/playstore.png"

function Footer() {
  return (
    <div className="bg-primaryColor mt-72 md:mt-24 ">
      <div className="grid grid-cols-12 p-[3%]  ">
        <div className="col-span-12 md:col-span-6 flex gap-4  md:gap-1  lg:gap-14 2xl:gap-20 ">

          <div className="col-span-4 md:col-span-2 text-sm lg:text-md 2xl:text-lg">
            <img src={tactv_logo} alt="Noimage" className="w-14 " />
            <p className="text-white mt-4  leading-7">Tamil Nadu Arasu Cable TV<br /> Corporation Limited.,<br />
              No.807, 4th Floor,<br />PT Lee Chengalvarayan Naicker <br />Building, Anna Salai <br />(Mount Road), Chennai - 600 002</p>
          </div>
          <div className="col-span-4 md:col-span-2 text-sm lg:text-md 2xl:text-lg text-white">
            <h1 className="text-xl md:text-md lg:text-xl">Menu</h1>
            <ul className="mt-2   leading-7">

              <li>Home</li>
              <li>About Us</li>
              <li>Forms</li>
              <li>News</li>
              <li>Gallery</li>
              <li>Contact Us</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 text-white text-sm md:text-md 2xl:text-lg">
            <h1 className="text-xl md:text-md lg:text-xl">Tags</h1>
            <ul className="mt-2  leading-7">

              <li>About TACTV</li>
              <li>District Offices</li>
              <li>News</li>
              <li>Forms</li>
              <li>Contact</li>
              <li>Tenders</li>
              <li>Press Releases</li>
            </ul>
          </div>
          <div className="hidden lg:block w-px bg-[#DFDFDF] h-[250px]"></div>

        </div>

        <div className="col-span-12 flex md:col-span-6 gap-4 md:gap-1 lg:gap-14 2xl:gap-20 mt-10 md:mt-0 ">
          <div className="col-span-4  md:col-span-2 text-white text-sm lg:text-md 2xl:text-lg">

            <ul className="mt-8 leading-7 ">

              <li>Photo Gallery</li>
              <li>Tariff Packages</li>
              <li>Policy Note 2019-20</li>
              <li>Policy Note 2018-19</li>

            </ul>
          </div>
          <div className="col-span-4  md:col-span-2 text-white text-sm lg:text-md 2xl:text-lg">
            <h1 className="text-xl md:text-md lg:text-xl">Related Links</h1>
            <ul className="mt-2 leading-7">
              <li>Tamil Nadu Cable TV Operators/<br />Workers Welfare Board</li>
              <li>TN Govt</li>
              <li>TN DIPR</li>
              <li>ELCOT</li>
              <li>Telecom Regulatory Authority of India</li>
              <li>Ministry of Information & Broadcasting</li>
            </ul>

          </div>
          <div className="hidden lg:block w-px bg-[#DFDFDF] h-[250px]"></div>
          <div className="col-span-4  md:col-span-2 text-white text-sm lg:text-md 2xl:text-lg">
            <ul className="leading-7">
              <li>TVA</li>
              <li>TNeGA</li>
              <li>GeM</li>
              <li>TANFINET</li>

            </ul>
          </div>
        </div>

      </div>
      <div className=" h-px bg-[#DFDFDF] w-full"></div>
      <div className="grid grid-cols-12 px-[2%] md:px-[3%] py-[2%] md:py-[1%] ">
        <div className="flex-col md:flex-row md:flex col-span-12 text-white gap-1 lg:gap-24" >
          <div className="text-sm md:text-md 2xl:text-lg">
            <p>© Copyright 2024 Tamil Nadu Arasu Cable TV Corporation Limited.</p>
          </div>
          <div className="flex gap-4 md:gap-3 mt-3 md:mt-0">
            <img src={facebook} alt="Noimage" className="w-5 md:w-6 2xl:w-8 object-contain" />
            <img src={playstore} alt="Noimage" className="w-5 md:w-6 2xl:w-8 object-contain" />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Footer
