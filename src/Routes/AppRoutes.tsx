import { Route, Routes } from "react-router-dom"
import App from "../App"
import LcoRegistration from "../container/lcoRegister"
import PlcRegistration from "../container/plcRegister";
import FtaRegistration from "../container/ftaRegister";
import PageNotFound from "../components/PageNotFound/PageNotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/lcoregistration" element={<LcoRegistration />} />
      <Route path="/plcRegistration" element={<PlcRegistration />} />
      <Route path="/ftaRegistration" element={<FtaRegistration />} />

      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  );
}


export default AppRoutes;
