import { baseApi, type DataResponse } from "./baseApi";

export interface ProductItem {
    productId: number;
    name: string;
    description: string;
    price: number; // Giá gốc
    discount: number; // Giá bán
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

export interface GetProductsParams {
    search?: string;
    category_id?: number;
    min_price?: number;
    max_price?: number;
    flash_sale?: boolean;
    sort_by?: string;
    sort_dir?: string;
    page_no?: number;
    page_size?: number;
}

const productApi = {
    getProducts: (params?: GetProductsParams) =>
        baseApi
            .get<DataResponse<ProductPage>>("/products", { params })
            .then((res) => res.data),
};

export default productApi;
