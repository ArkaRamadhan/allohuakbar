export const extractMiddle = (str: string) => {
  const regex = /\/([^\/]+)\//;
  // const regex = /\d+-(.+?)-\w+-\d+/;
  const match = str?.match(regex);
  return match ? match[1] : null;
};
