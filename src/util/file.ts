export const blob2File: (blob: Blob, suffix: string, fileType: string | undefined) => File = (blob, suffix, fileType) => {
  const date = new Date();

  return new File([blob], `${date.getTime()}.${suffix}`, {type: fileType});
};
