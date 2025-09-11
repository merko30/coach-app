export type RegisterData = {
  username: string;
  email: string;
  password: string;
  is_coach?: boolean;
};

export interface User {
  id: number;
  avatar: string;
  email: string;
  name: string | null;
  username: string;
  avatar_url: string | null;
}

export interface UpdateData {
  name: string;
  username: string;
  description: string;
}
