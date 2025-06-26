export type IdeaStatus = 'PROPOSED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';



export interface Idea {
  
  id?: number;
  title: string;
  status: IdeaStatus;
  submissionDate?: string; 
  likes: number;
  videoUrl?: string;
  reportFileName?: string
}

export interface Discussion {
  id?: number;
  message: string;
  date?: string;
  authorName?: string;
}

