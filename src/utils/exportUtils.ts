import { ResumeData } from '../types/resume';

export const exportFormats = {
  json: (data: ResumeData) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  },

  txt: (data: ResumeData) => {
    const text = Object.entries(data)
      .map(([key, value]) => `${key.toUpperCase()}\n${value}\n`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }
};

export const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};