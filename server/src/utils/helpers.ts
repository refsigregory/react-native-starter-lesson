export const sanitizeUser = <T extends object>(user: T, fieldsToRemove: string[] = ['password']): Partial<T> => {
  const sanitized = { ...user };
  fieldsToRemove.forEach((field) => {
    delete (sanitized as any)[field];
  });
  return sanitized;
};

export const calculatePagination = (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate <= endDate;
};
