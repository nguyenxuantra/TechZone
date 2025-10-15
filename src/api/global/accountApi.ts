import type { Login } from "../../store/Account/accountStore";
import { baseApi } from "../baseApi";



const accountApi = {
    login: (data: Login)=> baseApi.post('/auth/token',data)
}
export default accountApi;