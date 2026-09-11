export type Event = {
  id: number;
  name: string;
  slug: string;
  city: string;
  location: string;
  date: Date | string;
  organizerName: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
} | null;
