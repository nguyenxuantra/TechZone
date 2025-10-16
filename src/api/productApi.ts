import { baseApi, type DataResponse } from './baseApi';
import type { Product, ProductFormData } from '../types/untils';

export interface ProductListResponse {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const productApi = {
  // Lấy danh sách sản phẩm với phân trang và bộ lọc
  getProducts: (filters?: ProductFilters) => 
    baseApi.get<DataResponse<ProductListResponse>>('/products', { params: filters }),

  // Lấy chi tiết sản phẩm theo ID
  getProductById: (id: number) => 
    baseApi.get<DataResponse<Product>>(`/products/${id}`),

  // Tạo sản phẩm mới
  createProduct: (data: ProductFormData) => 
    baseApi.post<DataResponse<Product>>('/products', data),

  // Cập nhật sản phẩm
  updateProduct: (id: number, data: ProductFormData) => 
    baseApi.put<DataResponse<Product>>(`/products/${id}`, data),

  // Xóa sản phẩm
  deleteProduct: (id: number) => 
    baseApi.delete<DataResponse<void>>(`/products/${id}`),

  // Upload hình ảnh sản phẩm
  uploadProductImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return baseApi.post<DataResponse<{ imageUrl: string }>>('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Lấy danh sách danh mục
  getCategories: () => 
    baseApi.get<DataResponse<string[]>>('/products/categories'),

  // Lấy danh sách thương hiệu
  getBrands: () => 
    baseApi.get<DataResponse<string[]>>('/products/brands'),

  // Cập nhật trạng thái sản phẩm (active/inactive)
  updateProductStatus: (id: number, status: 'active' | 'inactive') => 
    baseApi.patch<DataResponse<Product>>(`/products/${id}/status`, { status }),

  // Cập nhật số lượng tồn kho
  updateProductStock: (id: number, stock: number) => 
    baseApi.patch<DataResponse<Product>>(`/products/${id}/stock`, { stock }),
};

export default productApi;
