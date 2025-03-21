export interface User {
  id: string;
  email: string;
  aud: string;
  role?: string;
  email_confirmed_at?: string;
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    avatar_url?: string;
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    iss?: string;
    name?: string;
    picture?: string;
    provider_id?: string;
    sub?: string;
  };
  identities?: Array<{
    id: string;
    user_id: string;
    identity_data: {
      email?: string;
      sub?: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}
