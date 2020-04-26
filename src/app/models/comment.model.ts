export interface Comment {
   
    commentId: number;
    userId: number;
    sourceId: number;
    content: string;
    
}
  
export interface Comments {
    comments: Comment[];
}
  