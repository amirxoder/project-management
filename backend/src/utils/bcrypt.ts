import bcrypt from "bcrypt";

export const hashValue = async (value: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(value, saltRounds);
};

export const compareValues = async (
  value: string,
  hashedValue: string
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};
