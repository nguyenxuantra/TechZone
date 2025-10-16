# Component Architecture

## Cấu trúc Component đã được tách ra từ ProductManagement

### 1. Common Components

#### `DataTable.tsx`
- **Mục đích**: Component bảng dữ liệu có thể tái sử dụng
- **Props chính**:
  - `data`: Mảng dữ liệu hiển thị
  - `columns`: Cấu hình các cột
  - `renderCell`: Function tùy chỉnh render cell (optional)
  - `pagination`: Thông tin phân trang
  - `onEdit`, `onDelete`, `onView`: Callback functions
- **Sử dụng**: Có thể dùng cho bất kỳ bảng dữ liệu nào (User, Order, Category, etc.)

#### `FilterBar.tsx`
- **Mục đích**: Component thanh lọc và tìm kiếm
- **Props chính**:
  - `searchTerm`, `onSearchChange`: Tìm kiếm
  - `selectedCategory`, `onCategoryChange`: Lọc theo danh mục
  - `categories`: Danh sách danh mục
  - `onFilter`, `onSort`, `onRefresh`: Callback functions
- **Sử dụng**: Có thể tùy chỉnh cho các loại dữ liệu khác nhau

### 2. Product Components

#### `ProductTable.tsx`
- **Mục đích**: Bảng hiển thị sản phẩm với render cell tùy chỉnh
- **Đặc điểm**: Sử dụng `DataTable` với logic render riêng cho sản phẩm
- **Sử dụng**: Chỉ dành cho hiển thị sản phẩm

#### `ProductDialog.tsx`
- **Mục đích**: Dialog thêm/sửa sản phẩm
- **Đặc điểm**: 
  - Sử dụng `react-hook-form` cho validation
  - Hỗ trợ cả thêm mới và chỉnh sửa
  - Loading state
- **Sử dụng**: Chỉ dành cho form sản phẩm

### 3. Types & Interfaces

#### `product.ts`
- **Product**: Interface chính cho sản phẩm
- **ProductFormData**: Interface cho form data
- **TableColumn**: Interface cho cấu hình cột bảng
- **FilterOptions**: Interface cho bộ lọc
- **PaginationOptions**: Interface cho phân trang

### 4. Data & API

#### `mockProducts.ts`
- **Mock data**: Dữ liệu giả cho development
- **Categories & Brands**: Danh sách danh mục và thương hiệu

#### `productApi.ts`
- **API service**: Các function gọi API cho sản phẩm
- **Đầy đủ CRUD**: Create, Read, Update, Delete
- **Upload image**: Upload hình ảnh
- **Filters & Pagination**: Hỗ trợ lọc và phân trang

## Cách sử dụng

### 1. Tích hợp API

```typescript
// Trong ProductManagement.tsx
import productApi from '../../api/productApi';

const fetchProducts = async () => {
  try {
    const response = await productApi.getProducts({
      search: searchTerm,
      category: selectedCategory,
      page: page + 1,
      pageSize: rowsPerPage
    });
    setProducts(response.result.products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

### 2. Tạo component tương tự cho User Management

```typescript
// UserTable.tsx
import DataTable from '../common/DataTable';

const UserTable = ({ users, onEdit, onDelete, pagination, ... }) => {
  const columns = [
    { id: 'name', label: 'Tên' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Vai trò' },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      pagination={pagination}
      // ... other props
    />
  );
};
```

### 3. Tùy chỉnh FilterBar

```typescript
// UserFilterBar.tsx
import FilterBar from '../common/FilterBar';

const UserFilterBar = ({ ... }) => {
  const additionalFilters = (
    <FormControl size="small" fullWidth>
      <InputLabel>Vai trò</InputLabel>
      <Select value={selectedRole} onChange={handleRoleChange}>
        <MenuItem value="all">Tất cả</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <FilterBar
      {...props}
      additionalFilters={additionalFilters}
      searchPlaceholder="Tìm kiếm người dùng..."
    />
  );
};
```

## Lợi ích

1. **Tái sử dụng**: Các component có thể dùng cho nhiều trang khác nhau
2. **Maintainable**: Dễ bảo trì và cập nhật
3. **Type Safety**: Sử dụng TypeScript đầy đủ
4. **Scalable**: Dễ mở rộng cho các tính năng mới
5. **API Ready**: Đã chuẩn bị sẵn cho việc tích hợp API
