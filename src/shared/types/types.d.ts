export {}; // 중요!

declare global {
  interface ProductItem {
    productId: number;
    productCategoryName: string;
    productName: string;
    sponsorName: string;
    imageUrl: string;
    productPrice: number;
  }

  interface CartItem extends ProductItem {
    count: number;
    addToCartOrder: number;
  }
}
