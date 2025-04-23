export {}; // 중요!

declare global {
  interface ProductItem {
    productId: number;
    departmentName: string;
    productName: string;
    companyName: string;
    image1: string;
    price: number;
  }

  interface CartItem extends ProductItem {
    count: number;
  }
}
