import {makeAutoObservable, runInAction} from "mobx";
import accountApi from "../../api/global/accountApi";

export interface LoginRequest {
    username: string;
    password: string;
}

export class AccountStore {
    loading = false;   
    error : string | null = null;
    token : string | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    fetchLogin = async (data: LoginRequest) => {
        this.loading = true;
        try {
            const response = await accountApi.login(data);
            
            runInAction(() => {
                this.loading = false;
                this.token = response.data.result;
                
                localStorage.setItem("accessToken", response.data.result);
            });
            
        } catch (error) {
            runInAction(()=>{
                this.loading =false;
                this.error = error instanceof Error ? error.message : "Đăng nhập thất bại";
            })
        }
    };
}

export const accountStore = new AccountStore();
