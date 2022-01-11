import fs from 'fs';

export const fileExists = (file: string): boolean => fs.existsSync(file);
