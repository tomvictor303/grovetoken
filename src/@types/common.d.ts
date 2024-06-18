declare global {
  type ID = string | number;
  type IdName = {
    id: ID,
    name: string;
  }

  interface Dict<Type> {
    [key: string]: Type;
  }

  type CountryType = {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
  }

  type ExpertiseType = {  
    code: string;
    name: string;
    label: string;
  }
}

export {};