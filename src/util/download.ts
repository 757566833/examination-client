export const downloadLocationBlob = (blob: Blob, fileName: string) => {
  // const blobs = new Blob([blob]);
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};
export const downloadObjectURL = (objectURL: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = objectURL;
  a.download = fileName;
  a.click();
};
