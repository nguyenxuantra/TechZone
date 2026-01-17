import { makeAutoObservable, runInAction } from "mobx";
import accountApi, { type UserInfo } from "../../api/global/accountApi";

export interface LoginRequest {
    username: string;
    password: string;
}

export type UserRole = "admin" | "user";

export interface AuthenticatedUser {
    username: string;
    email: string;
    role: UserRole;
    createdAt: number;
    updateAt: number | null;
}

export class AccountStore {
    loading = false;
    error: string | null = null;
    token: string | null = null;
    currentUser: AuthenticatedUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Lấy thông tin user từ API
    fetchUserInfo = async () => {
        try {
            const response = await accountApi.getUserInfo();
            const userInfo: UserInfo = response.result;

            if (!userInfo) {
                throw new Error("Không nhận được thông tin user từ server");
            }

            // Xác định role từ roles array (ADMIN hoặc USER)
            const roles = userInfo.roles || [];
            let role: UserRole = "user";
            if (roles.some((r) => r.toUpperCase() === "ADMIN")) {
                role = "admin";
            }

            runInAction(() => {
                this.currentUser = {
                    username: userInfo.username,
                    email: userInfo.email,
                    role,
                    createdAt: userInfo.createdAt,
                    updateAt: userInfo.updateAt,
                };
                localStorage.setItem("userRole", role);
                localStorage.setItem("username", userInfo.username);
                localStorage.setItem("userEmail", userInfo.email);
            });
        } catch (error) {
            runInAction(() => {
                this.error =
                    error instanceof Error ? error.message : "Không thể lấy thông tin user";
            });
        }
    };

    // Đăng nhập bằng API: lấy token và lưu vào localStorage, sau đó lấy thông tin user
    fetchLogin = async (data: LoginRequest) => {
        this.loading = true;
        this.error = null;
        try {
            const response = await accountApi.login(data);
            const token = response.result;

            if (!token) {
                throw new Error("Không nhận được token từ server");
            }

            runInAction(() => {
                this.token = token;
                localStorage.setItem("accessToken", token);
            });

            // Sau khi đăng nhập thành công, lấy thông tin user từ API
            await this.fetchUserInfo();

            runInAction(() => {
                this.loading = false;
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
