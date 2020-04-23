export interface Story {
  storyId: number;
  imageUrl: string;
  targetUrl: string;
  content: string;
  isLiked?: boolean;
  postedAt: Date;
}

export interface Stories {
  stories: Story[];
}
