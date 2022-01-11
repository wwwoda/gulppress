export const isInstalled = async (name: string): Promise<boolean> => {
  try {
    require.resolve(name);
    return true;
  } catch (e) {
    return false;
  }
};
