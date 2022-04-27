export interface ICollection {
  id?: string;
  name: string;
  image?: string;
  slug: string;
  description?: string;
  traits: string[];
  addedBy?: string;
}
