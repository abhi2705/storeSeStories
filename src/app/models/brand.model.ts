export interface Brand {
  brandId: number;
  name: string;
  description: string;
  logoUrl: string;
  brandUrl: string;
  isActive: boolean;
  collectionId: string;
}

export interface Brands {
  brands: Brand[];
}
