export interface Blog {
  _id?: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  createdAt?: Date;
}
