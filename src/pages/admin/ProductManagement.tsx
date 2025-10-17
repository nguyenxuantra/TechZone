import { useState, useMemo } from 'react';
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
import { products } from '../../data/products';

import type { PaginationOptions } from '../../types/untils';
import type { Product } from '../../data/products';
import type { Product as AdminProduct } from '../../types/products/product';

const ProductManagement = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [productList, setProductList] = useState<Product[]>(products);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productList, searchTerm, selectedCategory]);

  // Convert Product to AdminProduct format for table
  const convertToAdminProduct = (product: Product): AdminProduct => ({
    product_id: product.id,
    name: product.name,
    description: product.description || '',
    price: parseFloat(product.price.replace(/[^\d]/g, '')) || 0,
    stock: product.stock || 0,
    imageUrl: product.image,
    categoryName: product.category,
    rating: product.rating,
    discount: product.discount || 0,
    brand: product.brand,
  });

  // Convert AdminProduct back to Product format
  const convertFromAdminProduct = (adminProduct: AdminProduct): Product => ({
    id: adminProduct.product_id,
    name: adminProduct.name,
    description: adminProduct.description,
    price: adminProduct.price.toLocaleString('vi-VN') + '₫',
    originalPrice: (adminProduct.price * (1 + adminProduct.discount / 100)).toLocaleString('vi-VN') + '₫',
    rating: adminProduct.rating,
    reviews: 0,
    image: adminProduct.imageUrl,
    discount: adminProduct.discount,
    stock: adminProduct.stock,
    brand: adminProduct.brand,
    category: adminProduct.categoryName,
  });

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page, rowsPerPage]);

  // Convert to admin format for table
  const adminProducts = useMemo(() => {
    return paginatedProducts.map(convertToAdminProduct);
  }, [paginatedProducts]);



  // Handlers
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPage(1);
  };

  // CRUD Operations
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const maxId = Math.max(...productList.map(p => p.id), 0);
    const newProduct: Product = {
      id: maxId + 1,
      ...productData,
    };
    
    // Thêm sản phẩm mới vào đầu danh sách
    setProductList([newProduct, ...productList]);
    setAddDialogOpen(false);
    setAlertMessage('Thêm sản phẩm thành công!');
    setShowSuccessAlert(true);
  };

  const handleEditProduct = (adminProduct: AdminProduct) => {
    const product = convertFromAdminProduct(adminProduct);
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProductList(productList.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditDialogOpen(false);
    setSelectedProduct(null);
    setAlertMessage('Cập nhật sản phẩm thành công!');
    setShowSuccessAlert(true);
  };

  const handleDeleteProduct = (adminProduct: AdminProduct) => {
    const product = convertFromAdminProduct(adminProduct);
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = (productId: number) => {
    setProductList(productList.filter(p => p.id !== productId));
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
    setAlertMessage('Xóa sản phẩm thành công!');
    setShowSuccessAlert(true);
  };

  const pagination: PaginationOptions = {
    page,
    rowsPerPage,
    totalCount: filteredProducts.length,
  };


  return (
    <Box>
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
        onClearFilters={handleClearFilters}
        onAddProduct={() => setAddDialogOpen(true)}
        categories={categories}
        filteredCount={filteredProducts.length}
        totalCount={productList.length}
      />

      {/* Products Table */}
      <ProductTable
        products={adminProducts}
        pagination={pagination}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        loading={false}
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
        product={selectedProduct}
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
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductManagement;
