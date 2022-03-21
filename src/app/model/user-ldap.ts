export interface UserLdap {
  id: number;
  nomComplet: string;
  password: string;
  email: string;
  role: string;
  active: boolean;
}

export enum ERole {
  ROLE_USER,
  ROLE_MODERATOR,
  ROLE_ADMIN    
}