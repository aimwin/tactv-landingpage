import configJson from "../config/config";


const siteUrlsJson = {
  ourSiteUrls: {
    auth: {
      signin: 'signin',
      role: "role",
      profile: 'profile',
      upload: 'upload',
      mobileSignup: 'otp/send',
      mobileSignupLco: 'otp/send/lco',
      mobileSignupPlc: 'otp/send/plc',
      mobileSignupFta: 'otp/send/fta',
      mobileSignupVerify: 'otp/verify',
      emailValidation: 'emailValidation',
    },
    location: {
      pincode: "pincode",
      state: 'state',
      district: 'district',
      city: 'city',
    },
    LCO: {
      district: "districts",
      subDistrict: "subDistricts?district=",
      ifsc: "ifsc?code=",
      formUpload: "lcoForm",
      formDetails: "lco",
      lcoAck: 'lcoFormAck-lco',
      lcoAckVerify: 'lcoFormAckVerify-lco',
      paymentReg: 'registrationfee',
      transaction: 'transaction/status',
      pincode: 'pincode',
      payment: 'lcoRegistationPayment'
    },
    PLC: {
      district: "districts",
      subDistrict: "subDistricts?district=",
      ifsc: "ifsc?code=",
      formUpload: "plcForm",
      formDetailsPlc: "plcList",
    },
    FTA: {
      district: "districts",
      subDistrict: "subDistricts?district=",
      formUpload: "ftaForm",
      formDetailsFta: "ftaList",
    }
  },
  outerDomainUrls: {},
};

function checkInnerJson(jsonData: any) {
  if (jsonData) {
    for (const key in jsonData) {
      if (typeof jsonData[key] === 'string') {
        jsonData[key] = `${configJson.backendDomain}${jsonData[key]}`;
      } else {
        jsonData[key] = checkInnerJson(jsonData[key]);
      }
    }
  }
  return jsonData as typeof siteUrlsJson.ourSiteUrls;
}
const siteUrls = {
  ...checkInnerJson(siteUrlsJson.ourSiteUrls),
  outerDomainUrls: siteUrlsJson.outerDomainUrls,
};
export default siteUrls;
