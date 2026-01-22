import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import ProductTable from '../../components/product/ProductTable';
import ProductFilterBar from '../../components/admin/ProductFilterBar';
import AddProductDialog from '../../components/admin/AddProductDialog';
import EditProductDialog from '../../components/admin/EditProductDialog';
import DeleteProductDialog from '../../components/admin/DeleteProductDialog';

import type { PaginationOptions } from '../../types/untils';
import type { Product } from '../../data/products';
import type { Product as AdminProduct } from '../../types/products/product';
import productApi, { type ProductItem, type SaveProductRequest } from '../../api/admin/productApi';
import categoryApi, { type CategoryItem } from '../../api/admin/categoryApi';

const ProductManagement = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('productId');
  const [sortDir, setSortDir] = useState<string>('desc');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [productList, setProductList] = useState<AdminProduct[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<CategoryItem[]>([]);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Get unique categories (from API)
  const categories = useMemo(() => {
    return categoryOptions.map((c) => c.name);
  }, [categoryOptions]);

  // Load products from API with server-side search + pagination
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll({
        search: searchTerm || undefined,
        page_no: page,
        page_size: rowsPerPage,
        sort_by: sortBy,
        sort_dir: sortDir,
        category_id: selectedCategory || undefined,
      });

      const content: ProductItem[] = data.result.content;

      setProductList(
        content.map((item) => ({
          product_id: item.productId,
          name: item.name,
          description: item.description,
          price: item.price,
          discount: item.discount,
          stock: item.stock,
          imageUrl: item.imageUrl ?? '',
          rating: item.rating ?? 0,
          brand: item.brand,
          categoryName: item.categoryName,
        }))
      );
      setTotalCount(data.result.totalElement);
    } catch (error) {
      console.error('Load products error:', error);
      setAlertMessage('Không tải được danh sách sản phẩm, vui lòng thử lại!');
      setShowSuccessAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryApi.list({
        search: undefined,
        page_no: 1,
        page_size: 100,
      });
      setCategoryOptions(data.result.content);
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, searchTerm, sortBy, sortDir, selectedCategory]);
  useEffect(() => {
    loadCategories();
  }, []);


  // Handlers
  // MUI TablePagination uses 0-based page, but API uses 1-based page
  const handleChangePage = (newPage: number) => {
    setPage(newPage + 1); // Convert from 0-based to 1-based
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortDirChange = (value: string) => {
    setSortDir(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSortBy('productId');
    setSortDir('desc');
    setPage(1);
  };

  // CRUD Operations
  const buildSavePayload = (data: Product): SaveProductRequest | null => {
    const price =
      typeof data.price === 'number'
        ? data.price
        : parseInt(String(data.price).replace(/[^\d]/g, ''), 10) || 0;

    const discount =
      typeof data.discount === 'number'
        ? data.discount
        : parseInt(String(data.discount).replace(/[^\d]/g, ''), 10) || 0;

    const category = categoryOptions.find((c) => c.name === data.category);
    if (!category) {
      setAlertMessage('Không tìm thấy danh mục, vui lòng chọn lại!');
      setShowSuccessAlert(true);
      return null;
    }
    const categoryId = category.categoryId;

    if (!data.image) {
      setAlertMessage('Vui lòng upload hình ảnh sản phẩm!');
      setShowSuccessAlert(true);
      return null;
    }

    return {
      name: data.name,
      description: data.description || '',
      price,
      discount,
      stock: data.stock || 0,
      brand: data.brand,
      categoryId,
      imageUrl: data.image,
    };
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    const payload = buildSavePayload(productData as Product);
    if (!payload) return;

    try {
      await productApi.create(payload);
      setAlertMessage('Thêm sản phẩm thành công!');
      setShowSuccessAlert(true);
      setAddDialogOpen(false);
      loadProducts();
    } catch (error) {
      console.error('Create product error:', error);
      setAlertMessage('Thêm sản phẩm thất bại, vui lòng thử lại!');
      setShowSuccessAlert(true);
    }
  };

  const handleEditProduct = (adminProduct: AdminProduct) => {
    setSelectedProduct(adminProduct);
    setEditingProduct({
      id: adminProduct.product_id,
      name: adminProduct.name,
      description: adminProduct.description || '',
      price: adminProduct.price.toString(),
      originalPrice: adminProduct.discount ? adminProduct.discount.toString() : '',
      brand: adminProduct.brand,
      category: adminProduct.categoryName || '',
      stock: adminProduct.stock ?? 0,
      discount: adminProduct.discount ?? 0,
      rating: adminProduct.rating ?? 0,
      image: adminProduct.imageUrl || '',
      reviews: 0,
      isSale: !!adminProduct.discount && adminProduct.discount > 0,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    if (!selectedProduct) return;

    const payload = buildSavePayload(updatedProduct);
    if (!payload) return;

    try {
      await productApi.update(selectedProduct.product_id, payload);
      setAlertMessage('Cập nhật sản phẩm thành công!');
      setShowSuccessAlert(true);
      setEditDialogOpen(false);
      setSelectedProduct(null);
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error('Update product error:', error);
      setAlertMessage('Cập nhật sản phẩm thất bại, vui lòng thử lại!');
      setShowSuccessAlert(true);
    }
  };

  const handleDeleteProduct = (adminProduct: AdminProduct) => {
    setSelectedProduct(adminProduct);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = async (productId: number) => {
    try {
      await productApi.delete(productId);
      setAlertMessage('Xóa sản phẩm thành công!');
      setShowSuccessAlert(true);
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
      // Reload list after delete
      loadProducts();
    } catch (error) {
      console.error('Delete product error:', error);
      setAlertMessage('Xóa sản phẩm thất bại, vui lòng thử lại!');
      setShowSuccessAlert(true);
    }
  };

  const pagination: PaginationOptions = {
    page: page - 1, // Convert from 1-based to 0-based for MUI TablePagination
    rowsPerPage,
    totalCount,
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Quản lý sản phẩm
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý danh sách sản phẩm, thêm mới, chỉnh sửa và xóa sản phẩm
        </Typography>
      </Box>

      {/* Filter Bar */}
      <ProductFilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        sortDir={sortDir}
        onSortDirChange={handleSortDirChange}
        onClearFilters={handleClearFilters}
        onAddProduct={() => setAddDialogOpen(true)}
        categoryOptions={categoryOptions}
        filteredCount={totalCount}
      />

      {/* Products Table */}
      <ProductTable
        products={productList}
        pagination={pagination}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        loading={loading}
      />

      {/* Dialogs */}
      <AddProductDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddProduct}
        categories={categories}
      />

      <EditProductDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onUpdate={handleUpdateProduct}
        product={editingProduct}
        categories={categories}
      />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={confirmDeleteProduct}
        product={selectedProduct}
      />

      {/* Success Alert */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccessAlert(false)} 
          severity="success"
          sx={{ 
            width: '100%',
            borderRadius: '0.5rem',
            fontWeight: 600,
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductManagement;
