import type { LoginRequest } from "../../store/Account/accountStore";
import { baseApi, type DataResponse } from "../baseApi";

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserInfo {
    username: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: number;
    updateAt: number | null;
}

const accountApi = {
    // API đăng nhập thực tế: POST /auth/token, trả về token trong result
    login: (data: LoginRequest) =>
        baseApi
            .post<DataResponse<string>>("/auth/token", data)
            .then((res) => res.data),
    // API đăng ký: POST /users
    register: (data: RegisterRequest) =>
        baseApi
            .post<DataResponse<null>>("/users", data)
            .then((res) => res.data),
    // API lấy thông tin tài khoản: GET /users/me
    getUserInfo: () =>
        baseApi
            .get<DataResponse<UserInfo>>("/users/me")
            .then((res) => res.data),
};

export default accountApi;