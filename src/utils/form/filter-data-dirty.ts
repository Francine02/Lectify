export const filterDirtyData = (data: any, dirtyFields: any) =>
  Object.keys(dirtyFields).reduce((acc, key) => {
    const value = data[key];
    if (dirtyFields[key] && value !== '' && value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
