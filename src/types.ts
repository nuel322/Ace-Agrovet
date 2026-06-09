export interface Booking {
  id: string;
  type: 'consulting' | 'training';
  name: string;
  email: string;
  phone: string;
  category: string;
  details: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Completed';
  createdAt: string;
}

export interface FeedFormulation {
  id: string;
  name: string;
  targetCP: number;
  ingredient1Name: string;
  ingredient1CP: number;
  ingredient1Parts: number;
  ingredient1Percent: number;
  ingredient2Name: string;
  ingredient2CP: number;
  ingredient2Parts: number;
  ingredient2Percent: number;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
