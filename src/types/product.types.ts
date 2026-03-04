// product.types.ts

// Enum for Product Categories
export enum ProductCategory {
    FRUIT = 'fruit',
    VEGETABLE = 'vegetable',
    DAIRY = 'dairy',
    BAKERY = 'bakery'
}

// Interface for Product
export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
    inStock: boolean;
}

// Interface for Cart Item
export interface CartItem {
    product: Product;
    quantity: number;
}

// Interface for Cart
export interface Cart {
    items: CartItem[];
    totalAmount: number;
}

// Interface for Snackbar State
export interface SnackbarState {
    message: string;
    isOpen: boolean;
    duration?: number;
}