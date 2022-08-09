export enum AlertType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export type Alert = {
  isAction?: boolean;
  type: AlertType;
  message: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  url: string;
};

export type Brand = {
  id: string;
  name: string;
  url: string;
  description?: string;
};

export type Option = {
  [key: string]: string;
};

export type Product = {
  id: string;
  category: {
    name: string;
    id: string;
  };
  description: string;
  discount?: string;
  image: string;
  name: string;
  brand: {
    name: string;
    id: string;
  };
  price: string;
  weight: string;
  isLocked?: boolean;
};

export type Error = {
  isError: boolean;
  message: string;
};
