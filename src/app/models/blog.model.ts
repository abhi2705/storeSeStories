export interface Blog {
    
    author: string;
    blogId: number;
    content: string;
    imageUrl: string;
    tags: string;
    title: string;
    date: Date;
}
  
export interface Blogs {
    blogs: Blog[];
}
  