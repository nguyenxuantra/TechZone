import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';
import type { ProductItem } from '../api/admin/productApi';
import cartApi from '../api/cartApi';

export interface CartItem {
  cartItemId?: number; // ID từ API, có thể undefined nếu chưa sync với server
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product | ProductItem, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: number) => boolean;
  loadCartFromApi: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart structure - ensure each item has a product property
        const validCart = parsedCart.filter((item: any) => 
          item && item.product && typeof item.product.id === 'number' && typeof item.quantity === 'number'
        );
        setCartItems(validCart);
        
        // If some items were invalid, save the cleaned cart
        if (validCart.length !== parsedCart.length) {
          localStorage.setItem('cart', JSON.stringify(validCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear invalid cart data
        localStorage.removeItem('cart');
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product: Product | ProductItem, quantity: number = 1) => {
    // Lấy productId từ product (có thể là ProductItem có productId hoặc Product có id)
    const productId = 'productId' in product ? product.productId : product.id;
    
    // Optimistic update: Cập nhật state ngay lập tức để UX tốt hơn
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => {
        const itemProductId = 'productId' in item.product ? (item.product as any).productId : item.product.id;
        return itemProductId === productId;
      });
      
      if (existingItem) {
        // If product already exists, increase quantity
        return prevItems.map(item => {
          const itemProductId = 'productId' in item.product ? (item.product as any).productId : item.product.id;
          return itemProductId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      } else {
        // If product doesn't exist, add new item
        // Chuyển đổi ProductItem thành Product nếu cần
        const productData: Product = 'productId' in product 
          ? {
              id: product.productId,
              name: product.name,
              price: product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
              originalPrice: '',
              rating: product.rating || 0,
              reviews: 0,
              image: product.imageUrl || '',
              brand: product.brand,
              category: product.categoryName,
              stock: product.stock
            }
          : product;
        
        return [...prevItems, { product: productData, quantity }];
      }
    });
    
    try {
      // Gọi API để thêm sản phẩm vào giỏ hàng
      const response = await cartApi.addToCart({
        productId,
        quantity
      });
      
      // Nếu API thành công, sync lại state từ response (để đảm bảo dữ liệu chính xác)
      if (response.result && response.result.items) {
        // Chuyển đổi response items thành CartItem format
        const newCartItems: CartItem[] = response.result.items.map(item => {
          // productPrice là giá gốc, productDiscount là giá bán
          const salePrice = item.productDiscount ?? item.productPrice; // Nếu không có discount thì lấy giá gốc
          const productData: Product = {
            id: item.productId,
            name: item.productName,
            price: salePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Giá bán
            originalPrice: item.productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Giá gốc
            rating: 0,
            reviews: 0,
            image: item.productImageUrl || '',
            brand: '',
            category: '',
            stock: 0,
            discount: salePrice < item.productPrice ? salePrice : undefined // Lưu giá bán vào discount để tính toán
          };
          
          return {
            cartItemId: item.cartItemId,
            product: productData,
            quantity: item.quantity
          };
        });
        
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Nếu API thất bại, rollback về state trước đó
      // Hoặc có thể giữ nguyên optimistic update để UX tốt hơn
      // Ở đây tôi sẽ giữ nguyên optimistic update vì đã cập nhật ở trên
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    // Lưu lại state trước khi xóa để có thể rollback nếu API thất bại
    const previousItems = [...cartItems];
    
    // Optimistic update: Xóa ngay lập tức để UX tốt hơn
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    
    try {
      // Gọi API để xóa sản phẩm khỏi giỏ hàng
      await cartApi.deleteCartItem(cartItemId);
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Nếu API thất bại, rollback về state trước đó
      setCartItems(previousItems);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      // Tìm cartItemId từ productId để xóa
      setCartItems(prevItems => {
        const item = prevItems.find(ci => ci.product.id === productId);
        if (item && item.cartItemId) {
          // Gọi removeFromCart async nhưng không await ở đây
          removeFromCart(item.cartItemId);
          return prevItems.filter(ci => ci.product.id !== productId);
        } else {
          // Fallback: xóa theo productId nếu không có cartItemId
          return prevItems.filter(ci => ci.product.id !== productId);
        }
      });
      return;
    }
    
    // Lấy giá trị hiện tại từ state trước khi cập nhật
    const currentItem = cartItems.find(ci => ci.product.id === productId);
    if (!currentItem) return;
    
    const cartItemId = currentItem.cartItemId;
    const previousQuantity = currentItem.quantity;
    
    // Nếu không có cartItemId, chỉ cập nhật local state
    if (!cartItemId) {
      setCartItems(prevItems =>
        prevItems.map(ci =>
          ci.product.id === productId
            ? { ...ci, quantity }
            : ci
        )
      );
      return;
    }
    
    // Optimistic update: Cập nhật ngay lập tức để UX mượt mà
    setCartItems(prevItems =>
      prevItems.map(ci =>
        ci.product.id === productId
          ? { ...ci, quantity }
          : ci
      )
    );
    
    try {
      // Gọi API để cập nhật số lượng
      const response = await cartApi.updateCartItemQuantity(cartItemId, { quantity });
      
      // Nếu API thành công, sync lại state từ response (để đảm bảo dữ liệu chính xác)
      if (response.result && response.result.items) {
        const newCartItems: CartItem[] = response.result.items.map(cartItem => {
          // productPrice là giá gốc, productDiscount là giá bán
          const salePrice = cartItem.productDiscount ?? cartItem.productPrice; // Nếu không có discount thì lấy giá gốc
          const productData: Product = {
            id: cartItem.productId,
            name: cartItem.productName,
            price: salePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Giá bán
            originalPrice: cartItem.productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Giá gốc
            rating: 0,
            reviews: 0,
            image: cartItem.productImageUrl || '',
            brand: '',
            category: '',
            stock: 0,
            discount: salePrice < cartItem.productPrice ? salePrice : undefined // Lưu giá bán vào discount để tính toán
          };
          
          return {
            cartItemId: cartItem.cartItemId,
            product: productData,
            quantity: cartItem.quantity
          };
        });
        
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      // Nếu API thất bại, rollback về số lượng trước đó
      setCartItems(prevItems =>
        prevItems.map(ci =>
          ci.product.id === productId
            ? { ...ci, quantity: previousQuantity }
            : ci
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const loadCartFromApi = async () => {
    try {
      const response = await cartApi.getCart();
      
      if (response.result && response.result.items) {
        // Chuyển đổi response items thành CartItem format
        const newCartItems: CartItem[] = response.result.items.map(item => {
          // productPrice là giá gốc, productDiscount là giá bán
          const salePrice = item.productDiscount ?? item.productPrice; // Nếu không có discount thì lấy giá gốc
          const productData: Product = {
            id: item.productId,
            name: item.productName,
            price: salePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Giá bán (productDiscount)
            originalPrice: item.productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), // Giá gốc (productPrice)
            rating: 0,
            reviews: 0,
            image: item.productImageUrl || '',
            brand: '',
            category: '',
            stock: 0,
            discount: salePrice < item.productPrice ? salePrice : undefined // Lưu giá bán vào discount để tính toán
          };
          
          return {
            cartItemId: item.cartItemId,
            product: productData,
            quantity: item.quantity
          };
        });
        
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error loading cart from API:', error);
      // Nếu API thất bại, giữ nguyên dữ liệu từ localStorage
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      isInCart,
      loadCartFromApi
    }}>
      {children}
    </CartContext.Provider>
  );
};
