import mt1 from '../assets/text_d_i_6_35.webp';
import iphone15 from '../assets/iphone-16-pro-max.webp';
import pcGaming from '../assets/pc gaming.webp';
import samsungGalaxyUtra from '../assets/samsungutra.webp';
import m3 from '../assets/macbook_11_1.webp';
import ipad from '../assets/ipad-air-11-wifi-1.webp';
import appWatchSeries9 from '../assets/appleWatchseries.webp';
import dellSps from '../assets/dell xps.webp';
import sonyWh from '../assets/sonywh.webp';
import gamingMsi1 from '../assets/gamingMsi1.webp';
import gamingMsi2 from '../assets/gamingMsi2.webp';
import gamingMsi3 from '../assets/gamingMsi3.webp';
import iphone1 from '../assets/iphone1.webp';
import iphone2 from '../assets/iphone2.webp';
import iphone3 from '../assets/iphone3.webp';
import pcgaming1 from '../assets/pcgaming1.webp';
import pcgaming2 from '../assets/pcgaming2.webp';
import pcgaming3 from '../assets/pcgaming3.webp';
import samsung1 from '../assets/samsung1.webp';
import samsung2 from '../assets/samsung2.webp';
import samsung3 from '../assets/samsung3.webp';
import macair1 from '../assets/macair1.webp';
import macair2 from '../assets/macair2.webp';
import macair3 from '../assets/macair3.webp';
import ipad1 from '../assets/ipad1.webp';
import ipad2 from '../assets/ipad2.webp';
import ipad3 from '../assets/ipad3.webp';
import asusRog from '../assets/asusRog.webp';
import asus1 from '../assets/asus1.webp';
import asus2 from '../assets/asus2.webp';
import asus3 from '../assets/asus3.webp';
import apple1 from '../assets/apple1.webp';
import apple2 from '../assets/apple2.webp';
import apple3 from '../assets/apple3.webp';
import dell1 from '../assets/dell1.webp';
import dell2 from '../assets/dell2.webp';
import dell3 from '../assets/dell3.webp';
import sonyWh1 from '../assets/nonywh1.webp';
import sonyWh2 from '../assets/nonywh2.webp';
import sonyWh3 from '../assets/nonywh3.webp';



export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  label?: string;
  remaining?: number;
  sold?: number;
  stock?: number;
  brand?: string;
  category?: string;
  warranty?: string;
  returnPolicy?: string;
  description?: string;
  specifications?: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  images?: string[];
}

export const products: Product[] = [
  // Featured Products
  {
    id: 1,
    name: 'Laptop Gaming MSI GF63 Thin 10SC-066VN',
    price: '19.990.000₫',
    originalPrice: '22.990.000₫',
    rating: 4.5,
    reviews: 128,
    image: mt1,
    sold: 45,
    stock: 12,
    brand: 'MSI',
    category: 'Laptop Gaming',
    warranty: '24 tháng',
    returnPolicy: '7 ngày đổi trả',
    discount: 15,
    description: 'Laptop Gaming MSI GF63 Thin 10SC-066VN là một trong những laptop gaming tầm trung được ưa chuộng nhất hiện nay. Máy sở hữu thiết kế mỏng nhẹ với độ dày chỉ 21.7mm và trọng lượng 1.86kg, hiệu năng mạnh mẽ với CPU Intel Core i5 thế hệ 12, card đồ họa NVIDIA GeForce RTX 3050, màn hình 144Hz cho trải nghiệm gaming tuyệt vời.',
    specifications: [
      { label: 'Bộ vi xử lý', value: 'Intel Core i5-12450H (8 nhân, 12 luồng)', icon: '🔲' },
      { label: 'Card đồ họa', value: 'NVIDIA GeForce RTX 3050 4GB GDDR6', icon: '🎮' },
      { label: 'Bộ nhớ RAM', value: '8GB DDR4 3200MHz (2 khe, tối đa 64GB)', icon: '💾' },
      { label: 'Ổ cứng', value: '512GB NVMe PCIe Gen 4 SSD', icon: '💿' },
      { label: 'Màn hình', value: '15.6" FHD (1920x1080), 144Hz, IPS', icon: '🖥️' },
      { label: 'Pin', value: '51Whr, hỗ trợ sạc nhanh', icon: '🔋' },
      { label: 'Hệ điều hành', value: 'Windows 11 Home', icon: '🪟' },
      { label: 'Trọng lượng', value: '1.86kg', icon: '⚖️' }
    ],
    images: [
      mt1,
      gamingMsi1,
      gamingMsi2,
      gamingMsi3
    ]
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max 256GB',
    price: '27.990.000₫',
    originalPrice: '29.990.000₫',
    rating: 5,
    reviews: 256,
    image: iphone15,
    sold: 89,
    stock: 25,
    brand: 'Apple',
    category: 'Điện thoại',
    warranty: '12 tháng',
    returnPolicy: '14 ngày đổi trả',
    discount: 10,
    description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP, màn hình 6.7 inch Super Retina XDR OLED, và thiết kế titanium cao cấp.',
    specifications: [
      { label: 'Chip', value: 'Apple A17 Pro (3nm)', icon: '🔲' },
      { label: 'Màn hình', value: '6.7" Super Retina XDR OLED, 120Hz', icon: '📱' },
      { label: 'Camera', value: '48MP + 12MP + 12MP', icon: '📷' },
      { label: 'Pin', value: '4441mAh, sạc nhanh 20W', icon: '🔋' },
      { label: 'RAM', value: '8GB LPDDR5', icon: '💾' },
      { label: 'Bộ nhớ', value: '256GB NVMe', icon: '💿' },
      { label: 'Hệ điều hành', value: 'iOS 17', icon: '🍎' },
      { label: 'Kích thước', value: '159.9 x 76.7 x 8.25 mm', icon: '📏' }
    ],
    images: [
      iphone15,
      iphone1,
      iphone2,
      iphone3
    ]
  },
  {
    id: 3,
    name: 'Tai nghe Sony WH-1000XM5',
    price: '6.990.000₫',
    originalPrice: '8.990.000₫',
    rating: 4.8,
    reviews: 89,
    image: sonyWh,
    sold: 156,
    stock: 8,
    brand: 'Sony',
    category: 'Âm thanh',
    warranty: '12 tháng',
    returnPolicy: '7 ngày đổi trả',
    discount: 20,
    description: 'Tai nghe chống ồn hàng đầu thế giới với công nghệ NC/Ambient Sound Control, âm thanh chất lượng cao và thời lượng pin lên đến 30 giờ.',
    specifications: [
      { label: 'Driver', value: '30mm Dynamic', icon: '🔊' },
      { label: 'Chống ồn', value: 'NC/Ambient Sound Control', icon: '🔇' },
      { label: 'Pin', value: '30 giờ (NC), 40 giờ (không NC)', icon: '🔋' },
      { label: 'Bluetooth', value: '5.2, LDAC, SBC, AAC', icon: '📶' },
      { label: 'Trọng lượng', value: '250g', icon: '⚖️' },
      { label: 'Kết nối', value: '3.5mm, USB-C', icon: '🔌' },
      { label: 'Tương thích', value: 'iOS, Android, Windows, macOS', icon: '💻' },
      { label: 'Chống nước', value: 'IPX4', icon: '💧' }
    ],
    images: [
      sonyWh,
      sonyWh1,
      sonyWh2,
      sonyWh3
    ]
  },
  {
    id: 4,
    name: 'PC Gaming RTX 4070 Intel i7',
    price: '35.990.000₫',
    originalPrice: '39.990.000₫',
    rating: 4.7,
    reviews: 64,
    image: pcGaming,
    sold: 23,
    stock: 5,
    brand: 'Custom',
    category: 'PC Gaming',
    warranty: '36 tháng',
    returnPolicy: '7 ngày đổi trả',
    discount: 12,
    description: 'PC Gaming cấu hình cao với GPU RTX 4070, CPU Intel Core i7 thế hệ 13, RAM 32GB DDR5 và SSD 1TB NVMe cho hiệu năng gaming đỉnh cao.',
    specifications: [
      { label: 'CPU', value: 'Intel Core i7-13700K (16 nhân, 24 luồng)', icon: '🔲' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4070 12GB GDDR6X', icon: '🎮' },
      { label: 'RAM', value: '32GB DDR5 6000MHz (2x16GB)', icon: '💾' },
      { label: 'Ổ cứng', value: '1TB NVMe PCIe Gen 4 SSD', icon: '💿' },
      { label: 'PSU', value: '750W 80+ Gold', icon: '⚡' },
      { label: 'Tản nhiệt', value: 'Liquid Cooling 240mm', icon: '❄️' },
      { label: 'Case', value: 'ATX Mid Tower', icon: '🏠' },
      { label: 'Hệ điều hành', value: 'Windows 11 Pro', icon: '🪟' }
    ],
    images: [
      pcGaming,
      pcgaming1,
      pcgaming2,
      pcgaming3
    ]
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: '25.990.000₫',
    originalPrice: '31.990.000₫',
    rating: 4.9,
    reviews: 45,
    image: samsungGalaxyUtra,
    sold: 67,
    stock: 15,
    brand: 'Samsung',
    category: 'Điện thoại',
    warranty: '12 tháng',
    returnPolicy: '14 ngày đổi trả',
    discount: 30,
    description: 'Samsung Galaxy S24 Ultra với chip Snapdragon 8 Gen 3, camera 200MP, màn hình 6.8 inch Dynamic AMOLED 2X, và bút S Pen tích hợp.',
    specifications: [
      { label: 'Chip', value: 'Snapdragon 8 Gen 3 (4nm)', icon: '🔲' },
      { label: 'Màn hình', value: '6.8" Dynamic AMOLED 2X, 120Hz', icon: '📱' },
      { label: 'Camera', value: '200MP + 12MP + 50MP + 10MP', icon: '📷' },
      { label: 'Pin', value: '5000mAh, sạc nhanh 45W', icon: '🔋' },
      { label: 'RAM', value: '12GB LPDDR5X', icon: '💾' },
      { label: 'Bộ nhớ', value: '512GB UFS 4.0', icon: '💿' },
      { label: 'Hệ điều hành', value: 'Android 14, One UI 6.1', icon: '🤖' },
      { label: 'Đặc biệt', value: 'Bút S Pen tích hợp', icon: '✏️' }
    ],
    images: [
      samsungGalaxyUtra,
      samsung1,
      samsung2,
      samsung3
    ]
  },
  {
    id: 6,
    name: 'MacBook Air M3 13 inch',
    price: '27.990.000₫',
    originalPrice: '32.990.000₫',
    rating: 4.8,
    reviews: 67,
    image: m3,
    sold: 34,
    stock: 8,
    brand: 'Apple',
    category: 'Laptop',
    warranty: '12 tháng',
    returnPolicy: '14 ngày đổi trả',
    discount: 25,
    description: 'MacBook Air M3 với chip Apple Silicon mạnh mẽ, màn hình Liquid Retina 13.6 inch, thời lượng pin lên đến 18 giờ và thiết kế siêu mỏng.',
    specifications: [
      { label: 'Chip', value: 'Apple M3 (8 nhân CPU, 10 nhân GPU)', icon: '🔲' },
      { label: 'Màn hình', value: '13.6" Liquid Retina, 2560x1664', icon: '💻' },
      { label: 'RAM', value: '8GB Unified Memory', icon: '💾' },
      { label: 'Ổ cứng', value: '256GB SSD', icon: '💿' },
      { label: 'Pin', value: '52.6Whr, 18 giờ sử dụng', icon: '🔋' },
      { label: 'Kết nối', value: '2x Thunderbolt 4, MagSafe 3', icon: '🔌' },
      { label: 'Hệ điều hành', value: 'macOS Sonoma', icon: '🍎' },
      { label: 'Trọng lượng', value: '1.24kg', icon: '⚖️' }
    ],
    images: [
      m3,
      macair1,
      macair2,
      macair3
    ]
  },
  {
    id: 7,
    name: 'iPad Pro M2 11 inch 128GB',
    price: '19.990.000₫',
    originalPrice: '24.990.000₫',
    rating: 4.7,
    reviews: 34,
    image: ipad,
    sold: 28,
    stock: 12,
    brand: 'Apple',
    category: 'Máy tính bảng',
    warranty: '12 tháng',
    returnPolicy: '14 ngày đổi trả',
    discount: 28,
    description: 'iPad Pro M2 với chip Apple M2 mạnh mẽ, màn hình Liquid Retina 11 inch, hỗ trợ Apple Pencil và Magic Keyboard.',
    specifications: [
      { label: 'Chip', value: 'Apple M2 (8 nhân CPU, 10 nhân GPU)', icon: '🔲' },
      { label: 'Màn hình', value: '11" Liquid Retina, 2388x1668', icon: '📱' },
      { label: 'RAM', value: '8GB Unified Memory', icon: '💾' },
      { label: 'Bộ nhớ', value: '128GB SSD', icon: '💿' },
      { label: 'Pin', value: '28.65Whr, 10 giờ sử dụng', icon: '🔋' },
      { label: 'Kết nối', value: 'USB-C, Thunderbolt 4', icon: '🔌' },
      { label: 'Hệ điều hành', value: 'iPadOS 17', icon: '🍎' },
      { label: 'Đặc biệt', value: 'Hỗ trợ Apple Pencil 2', icon: '✏️' }
    ],
    images: [
      ipad,
     ipad1,
     ipad2,
     ipad3
    ]
  },
  {
    id: 8,
    name: 'Asus ROG Phone 7 Ultimate',
    price: '18.990.000₫',
    originalPrice: '23.990.000₫',
    rating: 4.6,
    reviews: 29,
    image: asusRog,
    sold: 15,
    stock: 6,
    brand: 'Asus',
    category: 'Điện thoại',
    warranty: '12 tháng',
    returnPolicy: '7 ngày đổi trả',
    discount: 35,
    description: 'Asus ROG Phone 7 Ultimate - điện thoại gaming chuyên nghiệp với chip Snapdragon 8 Gen 2, màn hình AMOLED 165Hz và hệ thống tản nhiệt tiên tiến.',
    specifications: [
      { label: 'Chip', value: 'Snapdragon 8 Gen 2 (4nm)', icon: '🔲' },
      { label: 'Màn hình', value: '6.78" AMOLED, 165Hz, HDR10+', icon: '📱' },
      { label: 'Camera', value: '50MP + 13MP + 8MP', icon: '📷' },
      { label: 'Pin', value: '6000mAh, sạc nhanh 65W', icon: '🔋' },
      { label: 'RAM', value: '16GB LPDDR5X', icon: '💾' },
      { label: 'Bộ nhớ', value: '512GB UFS 4.0', icon: '💿' },
      { label: 'Hệ điều hành', value: 'Android 13, ROG UI', icon: '🤖' },
      { label: 'Đặc biệt', value: 'Hệ thống tản nhiệt ROG', icon: '❄️' }
    ],
    images: [
      asusRog,
      asus1,
      asus2,
      asus3
    ]
  },
  {
    id: 9,
    name: 'Apple Watch Series 9 45mm',
    price: '9.990.000₫',
    originalPrice: '12.990.000₫',
    rating: 4.7,
    reviews: 89,
    image: appWatchSeries9,
    sold: 123,
    stock: 18,
    brand: 'Apple',
    category: 'Đồng hồ thông minh',
    warranty: '12 tháng',
    returnPolicy: '14 ngày đổi trả',
    discount: 32,
    description: 'Apple Watch Series 9 với chip S9 mạnh mẽ, màn hình Always-On Retina, theo dõi sức khỏe toàn diện và kết nối không dây.',
    specifications: [
      { label: 'Chip', value: 'Apple S9 SiP', icon: '🔲' },
      { label: 'Màn hình', value: '45mm Always-On Retina', icon: '⌚' },
      { label: 'Pin', value: '18 giờ sử dụng', icon: '🔋' },
      { label: 'Kết nối', value: 'GPS, Cellular (tùy chọn)', icon: '📶' },
      { label: 'Chống nước', value: 'IP6X, WR50', icon: '💧' },
      { label: 'Cảm biến', value: 'Nhịp tim, ECG, Oxy máu', icon: '❤️' },
      { label: 'Hệ điều hành', value: 'watchOS 10', icon: '🍎' },
      { label: 'Tương thích', value: 'iPhone 8 trở lên', icon: '📱' }
    ],
    images: [
      appWatchSeries9,
      apple1,
      apple2,
      apple3
    ]
  },
  {
    id: 10,
    name: 'Dell XPS 13 Plus 9320',
    price: '29.990.000₫',
    originalPrice: '35.990.000₫',
    rating: 4.9,
    reviews: 45,
    image: dellSps,
    sold: 22,
    stock: 7,
    brand: 'Dell',
    category: 'Laptop',
    warranty: '24 tháng',
    returnPolicy: '7 ngày đổi trả',
    discount: 28,
    description: 'Dell XPS 13 Plus với thiết kế siêu mỏng, màn hình 13.4 inch 4K OLED, chip Intel thế hệ 13 và bàn phím cảm ứng tiên tiến.',
    specifications: [
      { label: 'CPU', value: 'Intel Core i7-1360P (12 nhân, 16 luồng)', icon: '🔲' },
      { label: 'GPU', value: 'Intel Iris Xe Graphics', icon: '🎮' },
      { label: 'RAM', value: '16GB LPDDR5 5200MHz', icon: '💾' },
      { label: 'Ổ cứng', value: '512GB NVMe PCIe Gen 4 SSD', icon: '💿' },
      { label: 'Màn hình', value: '13.4" 4K OLED, 3456x2160', icon: '💻' },
      { label: 'Pin', value: '55Whr, 12 giờ sử dụng', icon: '🔋' },
      { label: 'Hệ điều hành', value: 'Windows 11 Pro', icon: '🪟' },
      { label: 'Trọng lượng', value: '1.23kg', icon: '⚖️' }
    ],
    images: [
      dellSps,
      dell1,
      dell2,
      dell3
    ]
  }
];

// Flash Sale Products (subset of products with additional properties)
export const flashSaleProducts: Product[] = [
  {
    ...products[4], // Samsung Galaxy S24 Ultra
    discount: 30,
    label: 'Flash Sale',
    remaining: 5
  },
  {
    ...products[5], // MacBook Air M3
    discount: 25,
    label: 'Flash Sale',
    remaining: 3
  },
  {
    ...products[3], // iPad Pro M2
    discount: 28,
    label: 'Flash Sale',
    remaining: 7
  },
  {
    ...products[1], // Asus ROG Phone 7
    discount: 35,
    label: 'Flash Sale',
    remaining: 4
  },
  {
    ...products[2], // Sony WH-1000XM5
    discount: 40,
    label: 'Flash Sale',
    remaining: 8
  },
  {
    ...products[8], // Apple Watch Series 9
    discount: 32,
    label: 'Flash Sale',
    remaining: 6
  },
  {
    ...products[9], // Dell XPS 13 Plus
    discount: 28,
    label: 'Flash Sale',
    remaining: 3
  },
  {
    ...products[6], // iPad Pro M2 (duplicate for second row)
    discount: 33,
    label: 'Flash Sale',
    remaining: 5
  },
  {
    ...products[0], // Sony WH-1000XM5 (duplicate for second row)
    discount: 38,
    label: 'Flash Sale',
    remaining: 9
  },
  {
    ...products[7], // Asus ROG Phone 7 (duplicate for second row)
    discount: 35,
    label: 'Flash Sale',
    remaining: 4
  }
];

// Featured Products (subset of products)
export const featuredProducts: Product[] = [
  products[0], // MSI GF63
  products[1], // iPhone 15 Pro Max
  products[2], // Sony WH-1000XM5
  products[3], // PC Gaming RTX 4070
  products[4], // Samsung Galaxy S24 Ultra
  products[5], // MacBook Air M3
  products[6], // iPad Pro M2
  products[7], // Asus ROG Phone 7
  products[8], // Apple Watch Series 9
  products[9]  // Dell XPS 13 Plus
];

// Helper function to get product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category?.toLowerCase().includes(category.toLowerCase())
  );
};
