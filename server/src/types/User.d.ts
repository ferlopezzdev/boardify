export interface User {
  user_id?: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
}
