import { baseApi, type DataResponse, type Query } from "../baseApi";

export interface CreateCategoryRequest {
    name: string;
    imageUrl: string;
}

export interface CategoryItem {
    categoryId: number;
    name: string;
    imageUrl: string | null;
    createdAt: number;
}

export interface CategoryPage {
    content: CategoryItem[];
    pageNo: number;
    pageSize: number;
    totalElement: number;
    totalPages: number;
    last: boolean;
}

const categoryApi = {
    create: (data: CreateCategoryRequest) =>
        baseApi.post<DataResponse<null>>("/admin/categories", data).then((res) => res.data),
    // Lấy danh sách danh mục với search, page_no, page_size theo tài liệu
    list: (params: Query) =>
        baseApi
            .get<DataResponse<CategoryPage>>("/admin/categories", { params })
            .then((res) => res.data),
    update: (categoryId: number, data: CreateCategoryRequest) =>
        baseApi
            .put<DataResponse<null>>(`/admin/categories/${categoryId}`, data)
            .then((res) => res.data),
    delete: (categoryId: number) =>
        baseApi
            .delete<DataResponse<null>>(`/admin/categories/${categoryId}`)
            .then((res) => res.data),
};

export default categoryApi;
