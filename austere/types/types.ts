export type FormState =
| {
    errors?: {
        username?: string[],
        email?: string[],
        password?: string[],
        general?: string[],
        message?: string,
    }
}
| undefined;

export type SessionPayload = {
    userId: number;
    expiresAt: Date;
};

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