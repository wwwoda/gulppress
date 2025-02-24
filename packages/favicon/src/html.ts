export const getHtml = (path = '/'): string => {
  const cleanBase = path.replace(/\/$/, '');
  let html = `<link rel="icon" href="${cleanBase}/favicon.ico" sizes="any">\n`;
  html += `<link rel="icon" href="${cleanBase}/icon.svg" type="image/svg+xml">\n`;
  html += `<link rel="apple-touch-icon" href="${cleanBase}/apple-touch-icon.png">\n`;
  html += `<link rel="manifest" href="${cleanBase}/manifest.json">`;
  return html;
};
