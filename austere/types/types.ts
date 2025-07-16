export interface ProductItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
  // Provenance data
  handcraftedHours?: number;
  edition?: string;
  materials?: string[];
}