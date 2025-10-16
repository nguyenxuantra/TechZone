import { baseApi, type Query } from "../baseApi";


const productApi = {
    getAll: (params: Query)=> baseApi.get('/admin/product',{params})
}
export default productApi