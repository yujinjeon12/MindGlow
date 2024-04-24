export const debounce = (callback: Function, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
