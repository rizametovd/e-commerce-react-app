export type FirebaseObj = {
  [key: string]: {
    [key: string]: string | number | { [key: string]: string | number };
  };
};

export const handleObj = (obj: FirebaseObj | null): any[] => {
  if (!obj) {
    return [];
  }

  return Object.entries(obj).map(([id, fields]) => ({ id, ...fields }));
};

export const wait = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
