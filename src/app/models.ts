export interface AutoParts {
  "List of auto parts": string;
}

export interface CarBrand {
  brand: string;
}

export interface UserRegistrationData {
  name: string;
  brand: string;
  autoParts: string[];
  color?: string;
}
