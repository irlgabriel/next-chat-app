export interface Message {
  timestamp: number;
  user: User;
  text: string;
}

export interface User {
  name: string;
  role: string;
}
