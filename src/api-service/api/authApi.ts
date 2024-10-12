import apiFunctions from "../ApiService";
import siteUrls from "../SiteUrls";

export const postSigninApi = async (payload:any) => {
    return apiFunctions.post(siteUrls.auth.signin, payload);
  };

  export const getRoleApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.role}`);
  }

  export const getProfileApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.profile}`);
  }
  
  export const getPincodeApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.location.pincode}${query}`);
  };

  export const getState = async () => {
    return apiFunctions.get(`${siteUrls.location.state}`);
};

  export const getDistricts = async (query : any) => {
    return apiFunctions.get(`${siteUrls.location.district}${query}`);
};

export const getCitys = async (query : any) => {
  return apiFunctions.get(`${siteUrls.location.city}${query}`);
};

export const mobileOTPSignup = async (payload : any) => {
    return apiFunctions.post(siteUrls.auth.mobileSignup,payload)
}

export const mobileOTPSignupLco = async (payload : any) => {
    return apiFunctions.post(siteUrls.auth.mobileSignupLco,payload)
}

// PLC Otp Send Api
export const mobileOTPSignupPlc = async (payload : any) => {
  return apiFunctions.post(siteUrls.auth.mobileSignupPlc,payload)
}

// PLC Otp Send Api
export const mobileOTPSignupFta = async (payload : any) => {
  return apiFunctions.post(siteUrls.auth.mobileSignupFta,payload)
}

export const mobileOTPSignUpVerify = async (payload : any) => {
    return apiFunctions.post(siteUrls.auth.mobileSignupVerify,payload)
}

export const imageUpload = async (payload : any) => {
    return await apiFunctions.post(siteUrls.auth.upload,payload);
};

// email validation post api 
export const postEmailValidationApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.emailValidation}`,payload);
};