import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';
import type { ProductItem } from '../api/admin/productApi';
import cartApi from '../api/cartApi';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product | ProductItem, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: number) => boolean;
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
    
    try {
      // Gọi API để thêm sản phẩm vào giỏ hàng
      const response = await cartApi.addToCart({
        productId,
        quantity
      });
      
      // Nếu API thành công, cập nhật state từ response
      if (response.result && response.result.items) {
        // Chuyển đổi response items thành CartItem format
        const newCartItems: CartItem[] = response.result.items.map(item => {
          // Tạo Product object từ CartItemResponse
          const productData: Product = {
            id: item.productId,
            name: item.productName,
            price: item.productPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            originalPrice: '',
            rating: 0,
            reviews: 0,
            image: item.productImageUrl || '',
            brand: '',
            category: '',
            stock: 0
          };
          
          return {
            product: productData,
            quantity: item.quantity
          };
        });
        
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Nếu API thất bại, vẫn cập nhật local state để UX không bị ảnh hưởng
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
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
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

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
