const fs = require('fs');
const path = require('path');

function getTargetFilePath(source: string, target: string): string {
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      return path.join(target, path.basename(source));
    }
  }

  return target;
}
export default function copyFileSync(source: string, target: string): void {
  fs.writeFileSync(getTargetFilePath(source, target), fs.readFileSync(source));
}
