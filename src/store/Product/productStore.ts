import { makeAutoObservable, runInAction } from "mobx";
import productApi, { type ProductItem } from "../../api/admin/productApi";
import type { Query } from "../../api/baseApi";




export class ProductStore {
    loading = false;
    error : string | null = null;
    product : ProductItem[] = [];

    constructor(){
        makeAutoObservable(this)
    }
    fetchProductGetAll = async(params:Query)=>{
        this.loading = true;
        try{
            const response = await productApi.getAll(params);
            runInAction(()=>{
                this.product = response.result.content;
                this.loading = false;
            })
        }catch(error){
            runInAction(()=>{
                this.loading = false;
                this.error = error instanceof Error ? error.message : "Có lỗi khi call api get product"
            })
        }
    }
}

export const productStore = new ProductStore();