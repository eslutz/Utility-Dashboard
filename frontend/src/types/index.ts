export interface User {
  id: string;
  email: string;
  name: string;
  isSubscribed: boolean;
}

export interface UtilityData {
  id: string;
  provider: string;
  type: 'electric' | 'gas' | 'water' | 'internet' | 'solar';
  usage: number;
  cost: number;
  date: string;
}

export interface RouteParams {
  [key: string]: string | undefined;
}
