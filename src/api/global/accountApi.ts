import type { LoginRequest } from "../../store/Account/accountStore";
import { baseApi, type DataResponse } from "../baseApi";



const accountApi = {
    login: (data: LoginRequest)=> baseApi.post<DataResponse<string>>('/auth/token',data)
}
export default accountApi;