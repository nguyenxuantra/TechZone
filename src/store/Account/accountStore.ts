import { makeAutoObservable, runInAction } from "mobx";
import accountApi from "../../api/global/accountApi";

export interface LoginRequest {
    username: string;
    password: string;
}

export type UserRole = "admin" | "user";

export interface AuthenticatedUser {
    username: string;
    role: UserRole;
}

export class AccountStore {
    loading = false;
    error: string | null = null;
    token: string | null = null;
    currentUser: AuthenticatedUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Đăng nhập bằng API: lấy token và lưu vào localStorage
    fetchLogin = async (data: LoginRequest) => {
        this.loading = true;
        this.error = null;
        try {
            const response = await accountApi.login(data);
            const token = response.result;

            if (!token) {
                throw new Error("Không nhận được token từ server");
            }

            // Theo tài liệu, tài khoản đăng nhập là admin/admin => role admin
            const role: UserRole = "admin";

            runInAction(() => {
                this.loading = false;
                this.token = token;
                this.currentUser = { username: data.username, role };
                localStorage.setItem("accessToken", token);
                localStorage.setItem("userRole", role);
                localStorage.setItem("username", data.username);
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                this.error =
                    error instanceof Error ? error.message : "Đăng nhập thất bại";
                this.token = null;
                this.currentUser = null;
            });
        }
    };

    logout = () => {
        this.token = null;
        this.currentUser = null;
        this.error = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
    };
}

export const accountStore = new AccountStore();
