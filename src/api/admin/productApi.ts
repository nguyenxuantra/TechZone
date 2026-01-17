import { baseApi, type DataResponse, type Query } from "../baseApi";

export interface ProductQuery extends Query {
    sort_by?: string;
    sort_dir?: string;
    category_id?: number;
}

export interface ProductItem {
    productId: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    imageUrl: string | null;
    rating: number | null;
    brand: string;
    categoryName: string;
    createdAt: number;
}

export interface ProductPage {
    content: ProductItem[];
    pageNo: number;
    pageSize: number;
    totalElement: number;
    totalPages: number;
    last: boolean;
}

export interface SaveProductRequest {
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    brand: string;
    categoryId: number;
    imageUrl: string;
}

const productApi = {
    getAll: (params: ProductQuery) =>
        baseApi
            .get<DataResponse<ProductPage>>("/admin/product",  { params })
            .then((res) => res.data),
    getById: (productId: number) =>
        baseApi
            .get<DataResponse<ProductItem>>(`/admin/product/${productId}`)
            .then((res) => res.data),
    delete: (productId: number) =>
        baseApi
            .delete<DataResponse<null>>(`/admin/product/${productId}`)
            .then((res) => res.data),
    create: (data: SaveProductRequest) =>
        baseApi
            .post<DataResponse<null>>("/admin/product", data)
            .then((res) => res.data),
    update: (productId: number, data: SaveProductRequest) =>
        baseApi
            .put<DataResponse<null>>(`/admin/product/${productId}`, data)
            .then((res) => res.data),
};

export default productApi;