export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
