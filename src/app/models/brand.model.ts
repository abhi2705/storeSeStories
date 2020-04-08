export interface Brand {
  brandId: number;
  name: string;
  description: string;
  logoUrl: string;
  brandUrl: string;
  isActive: boolean;
}

export interface Brands {
  brands: Brand[];
}
