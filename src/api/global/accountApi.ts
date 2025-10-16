import type { Login } from "../../store/Account/accountStore";
import { baseApi, type DataResponse } from "../baseApi";



const accountApi = {
    login: (data: Login)=> baseApi.post<DataResponse<string>>('/auth/token',data)
}
export default accountApi;