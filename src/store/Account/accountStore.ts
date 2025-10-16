import {makeAutoObservable, runInAction} from "mobx";
import accountApi from "../../api/global/accountApi";

export interface Login {
    username: string;
    password: string;
}

export class AccountStore {
    loading = false;
    token ="";
    constructor() {
        makeAutoObservable(this);
    }

    fetchLogin = async (data: Login) => {
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
            })
            
        }
    };
}

export const accountStore = new AccountStore();
