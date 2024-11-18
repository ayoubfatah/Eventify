export interface EventType {
  id: number;
  name: string;
  slug: string;
  city?: string;
  location: string;
  organizerName: string;
  imageUrl: string;
  date: Date;
  description: string;
}
