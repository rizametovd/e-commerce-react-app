export const handleObj = (obj: any) => {
  return Object.entries(obj).map(([id, fields]: any) => ({ id, ...fields }));
};

export const wait = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
