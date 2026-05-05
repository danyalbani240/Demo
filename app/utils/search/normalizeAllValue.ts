export const normalizeAllValue = (param: string, allVal: string) => {
  if (!param || param === allVal) return "";
  return param;
};
