export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface MatchResponse {
  match: string;
}

export interface FilterChip { 
  label: string; key: string 
}