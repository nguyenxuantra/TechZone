# 🚀 Tech Zone - E-commerce Platform

**Tech Zone** là một nền tảng thương mại điện tử hiện đại chuyên về các sản phẩm công nghệ, được xây dựng bằng React 19, TypeScript và Material-UI. Dự án cung cấp trải nghiệm mua sắm trực tuyến hoàn chỉnh với giao diện người dùng thân thiện và hệ thống quản trị mạnh mẽ.

![Tech Zone Banner](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.1-green?style=for-the-badge&logo=mui)
![Vite](https://img.shields.io/badge/Vite-7.1.0-purple?style=for-the-badge&logo=vite)

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Tính năng chi tiết](#-tính-năng-chi-tiết)
- [API và dữ liệu](#-api-và-dữ-liệu)
- [Triển khai](#-triển-khai)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

## ✨ Tính năng

### 🛍️ **Người dùng cuối**
- **Trang chủ** với banner hero và flash sale
- **Danh mục sản phẩm** đa dạng (Laptop, Điện thoại, PC Gaming, Âm thanh)
- **Tìm kiếm sản phẩm** thông minh với gợi ý
- **Chi tiết sản phẩm** với hình ảnh, thông số kỹ thuật
- **Giỏ hàng** với quản lý số lượng và localStorage
- **Thanh toán** và quản lý đơn hàng
- **Hồ sơ người dùng** và lịch sử mua hàng
- **Đăng ký/Đăng nhập** tài khoản

### 🔧 **Quản trị viên**
- **Dashboard** tổng quan với thống kê
- **Quản lý sản phẩm** (thêm, sửa, xóa, phân loại)
- **Quản lý danh mục** sản phẩm
- **Quản lý đơn hàng** và trạng thái
- **Quản lý khách hàng** và thông tin
- **Cài đặt hệ thống** và cấu hình

### 📱 **Giao diện**
- **Responsive design** cho mọi thiết bị
- **Material Design** với Material-UI
- **Dark/Light theme** tùy chỉnh
- **Animations** và transitions mượt mà
- **Search bar** với gợi ý real-time

## 🛠️ Công nghệ sử dụng

### **Frontend Framework**
- **React 19.1.1** - Thư viện UI hiện đại
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.0** - Build tool nhanh chóng

### **UI Components & Styling**
- **Material-UI 7.3.1** - Component library
- **Emotion** - CSS-in-JS styling
- **Material Icons** - Icon set

### **Routing & State Management**
- **React Router DOM 7.8.0** - Client-side routing
- **React Context API** - State management
- **LocalStorage** - Persistent data

### **Development Tools**
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint** - TypeScript linting
- **React Hooks ESLint** - Hooks linting

## 🚀 Cài đặt

### **Yêu cầu hệ thống**
- Node.js 18+ 
- npm hoặc yarn
- Git

### **Bước 1: Clone repository**
```bash
git clone https://github.com/your-username/tech-zone.git
cd tech-zone
```

### **Bước 2: Cài đặt dependencies**
```bash
npm install
# hoặc
yarn install
```

### **Bước 3: Chạy development server**
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### **Bước 4: Build production**
```bash
npm run build
# hoặc
yarn build
```

## 📁 Cấu trúc dự án

```
tech_zone/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images và media files
│   ├── components/        # Reusable components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Footer.tsx     # Footer component
│   │   ├── SearchResults.tsx # Search functionality
│   │   └── ScrollToTop.tsx   # Scroll behavior
│   ├── contexts/          # React Context providers
│   │   └── CartContext.tsx   # Shopping cart state
│   ├── data/              # Static data và mock API
│   │   └── products.ts    # Product database
│   ├── layout/            # Layout components
│   │   ├── RootLayout.tsx # Main app layout
│   │   └── AdminLayout.tsx # Admin panel layout
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Landing page
│   │   ├── Products.tsx   # Product listing
│   │   ├── ProductDetail.tsx # Single product view
│   │   ├── Cart.tsx       # Shopping cart
│   │   ├── Checkout.tsx   # Checkout process
│   │   ├── Profile.tsx    # User profile
│   │   ├── Login.tsx      # Authentication
│   │   ├── Register.tsx   # User registration
│   │   └── admin/         # Admin pages
│   │       ├── Dashboard.tsx
│   │       ├── ProductManagement.tsx
│   │       ├── OrderManagement.tsx
│   │       ├── CustomerManagement.tsx
│   │       ├── ProductCategories.tsx
│   │       └── Settings.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies và scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

## 🔍 Tính năng chi tiết

### **🛒 Hệ thống giỏ hàng**
- **Thêm/xóa sản phẩm** với số lượng tùy chỉnh
- **Persistent storage** sử dụng localStorage
- **Tính tổng tiền** tự động
- **Quản lý số lượng** real-time
- **Kiểm tra tồn kho** sản phẩm

### **🔍 Tìm kiếm thông minh**
- **Real-time search** với gợi ý
- **Tìm kiếm theo** tên, thương hiệu, danh mục
- **Kết quả tìm kiếm** với hình ảnh và giá
- **Auto-complete** suggestions

### **📱 Responsive Design**
- **Mobile-first** approach
- **Breakpoints** cho tablet và desktop
- **Touch-friendly** interactions
- **Optimized** cho mọi kích thước màn hình

### **🎨 UI/UX Features**
- **Material Design** components
- **Smooth animations** và transitions
- **Loading states** và error handling
- **Accessibility** features
- **Dark/Light theme** support

## 📊 API và dữ liệu

### **Product Database**
Dự án sử dụng mock data với cấu trúc sản phẩm chi tiết:

```typescript
interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  brand: string;
  category: string;
  warranty?: string;
  specifications?: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  images?: string[];
}
```

### **Categories**
- **Laptop** - Gaming, Business, Student
- **Điện thoại** - Smartphone, Flagship
- **PC Gaming** - Desktop, Components
- **Âm thanh** - Headphones, Speakers
- **Máy tính bảng** - iPad, Android tablets
- **Đồng hồ thông minh** - Apple Watch, Samsung

### **Flash Sale System**
- **Countdown timer** real-time
- **Limited quantity** products
- **Special pricing** với discount
- **Urgency indicators**

## 🚀 Triển khai

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

### **Traditional Hosting**
```bash
npm run build
# Upload dist/ folder to your web server
```

## 🤝 Đóng góp

1. **Fork** dự án
2. **Tạo branch** mới (`git checkout -b feature/AmazingFeature`)
3. **Commit** thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. **Push** lên branch (`git push origin feature/AmazingFeature`)
5. **Tạo Pull Request**

### **Guidelines**
- Tuân thủ **TypeScript** best practices
- Sử dụng **Material-UI** components
- Viết **responsive** code
- Thêm **TypeScript types** cho new features
- Cập nhật **documentation**

## 📝 Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- **Email**: nguyenxuantra2k3@gmail.comcom
- **Phone**: 0396537838

## 🙏 Lời cảm ơn

Cảm ơn bạn đã quan tâm đến dự án **Tech Zone**! 

---

