type FirebaseObj = {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
};

export const handleObj = (obj: FirebaseObj): any[] => {
  return Object.entries(obj).map(([id, fields]) => ({ id, ...fields }));
};

export const wait = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
