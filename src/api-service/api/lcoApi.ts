import apiFunctions from "../ApiService";
import siteUrls from "../SiteUrls";

export const getFormDetails = async () => {
  return await apiFunctions.get(siteUrls.LCO.formDetails);
};

export const getSubDistrict = async (query: any) => {
  return await apiFunctions.get(`${siteUrls.LCO.subDistrict}${query}`);
};

export const getIfscBankList = async (query: any) => {
  return await apiFunctions.get(`${siteUrls.LCO.ifsc}${query}`);
};

export const postFormUpload = async (payload: any) => {
  return await apiFunctions.post(siteUrls.LCO.formUpload, payload);
};

export const postPayment = async (payload: any) => {
  return await apiFunctions.post(siteUrls.LCO.payment, payload);
};

export const putFormUpload = async (id: any, payload: any) => {
  return await apiFunctions.put(`${siteUrls.LCO.formUpload}/${id}`, payload);
};
