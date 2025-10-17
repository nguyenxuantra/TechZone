import {makeAutoObservable, runInAction} from "mobx";

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
    error : string | null = null;
    token : string | null = null;
    currentUser: AuthenticatedUser | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    // Temporary hardcoded login without API
    fetchLogin = async (data: LoginRequest) => {
        this.loading = true;
        this.error = null;
        try {
            // Simulate small delay for UX consistency
            await new Promise((res) => setTimeout(res, 300));

            const hardcodedAccounts: Record<string, { password: string; role: UserRole }> = {
                admin: { password: "admin123", role: "admin" },
                user: { password: "user123", role: "user" },
            };

            const account = hardcodedAccounts[data.username];
            if (!account || account.password !== data.password) {
                throw new Error("Sai tài khoản hoặc mật khẩu");
            }

            const dummyToken = `dummy-token-${account.role}-${Date.now()}`;

            runInAction(() => {
                this.loading = false;
                this.token = dummyToken;
                this.currentUser = { username: data.username, role: account.role };
                localStorage.setItem("accessToken", dummyToken);
                localStorage.setItem("userRole", account.role);
                localStorage.setItem("username", data.username);
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                this.error = error instanceof Error ? error.message : "Đăng nhập thất bại";
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
    }
}

export const accountStore = new AccountStore();
