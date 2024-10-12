import apiFunctions from "../ApiService";
import siteUrls from "../SiteUrls";

export const getFormDetails = async () => {
    return await apiFunctions.get(siteUrls.FTA.formDetailsFta);
};

export const getSubDistrict = async (query: any) => {
    return await apiFunctions.get(`${siteUrls.FTA.subDistrict}${query}`);
};

export const postFormUpload = async (payload: any) => {
    return await apiFunctions.post(siteUrls.FTA.formUpload, payload);
};

export const putFormUpload = async (id: any, payload: any) => {
    return await apiFunctions.put(`${siteUrls.FTA.formUpload}/${id}`, payload);
};
