import { makeAutoObservable, runInAction } from "mobx";
import type { Product } from "../../types/products/product";
import productApi from "../../api/admin/productApi";
import type { Query } from "../../api/baseApi";




export class ProductStore {
    loading = false;
    error : string | null = null;
    product : Product[] = [];

    constructor(){
        makeAutoObservable(this)
    }
    fetchProductGetAll = async(params:Query)=>{
        this.loading = true;
        try{
            const response = await productApi.getAll(params);
            runInAction(()=>{
                this.product = response.data.result.content;
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