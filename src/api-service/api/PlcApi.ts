import apiFunctions from "../ApiService";
import siteUrls from "../SiteUrls";

export const getFormDetails = async () => {
    return await apiFunctions.get(siteUrls.PLC.formDetailsPlc);
};

export const getSubDistrict = async (query: any) => {
    return await apiFunctions.get(`${siteUrls.PLC.subDistrict}${query}`);
};
export const getIfscBankList = async (query: any) => {
    return await apiFunctions.get(`${siteUrls.PLC.ifsc}${query}`);
};
export const postFormUpload = async (payload: any) => {
    return await apiFunctions.post(siteUrls.PLC.formUpload, payload);
};

export const putFormUpload = async (id: any, payload: any) => {
    return await apiFunctions.put(`${siteUrls.PLC.formUpload}/${id}`, payload);
};
