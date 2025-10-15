import {makeAutoObservable, runInAction} from "mobx";
import accountApi from "../../api/global/accountApi";

export interface Login {
    username: string;
    password: string;
}

export class AccountStore {
    loading = false;
    constructor() {
        makeAutoObservable(this);
    }

    fetchLogin = async (data: Login) => {
        this.loading = true;
        try {
            const reponse = await accountApi.login(data);
            runInAction(() => {
                this.loading = false;
                localStorage.setItem("accessToken", reponse.toString());
            });
            
        } catch (error) {
            runInAction(()=>{
                this.loading =false;
            })
            alert("Đăng nhập thất bại ")
        }
    };
}

export const accountStore = new AccountStore();
