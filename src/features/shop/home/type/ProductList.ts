export interface ProductList {
  productId: number;
  productName: string;
  productCategoryName: string;
  sponsorName: string;
  imageUrl: string;
  productPrice: number;
}

export interface Category {
  productCategoryId: number;
  name: string;
}
