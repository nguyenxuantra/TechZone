import type { LoginRequest } from "../../store/Account/accountStore";
import { baseApi, type DataResponse } from "../baseApi";

const accountApi = {
    // API đăng nhập thực tế: POST /auth/token, trả về token trong result
    login: (data: LoginRequest) =>
        baseApi
            .post<DataResponse<string>>("/auth/token", data)
            .then((res) => res.data),
};

export default accountApi;