export * from './fileReader';

export const isObject = (obj: any) => {
  return obj != null && obj.constructor.name === 'Object';
};

export const chunkArray = (array: Array<any>, chunkSize: number) => {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
};
