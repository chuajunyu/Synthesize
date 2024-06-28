export interface User {
    email: string;
    displayName: string;
  }
  
  export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
  }
  