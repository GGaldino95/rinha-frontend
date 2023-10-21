export * from './fileReader';

export const isObject = (obj: any) => {
  return obj != null && obj.constructor.name === 'Object';
};

export type LargeObject = {
  [key: string]: any;
};

export const renderLargeObjectLazy = async (
  object: LargeObject,
  chunkSize: number = 100,
  updateCallback: (chunk: LargeObject) => void,
): Promise<void> => {
  const keys = Object.keys(object);
  let currentIndex = 0;

  const renderChunk = async () => {
    const endIndex = Math.min(currentIndex + chunkSize, keys.length);
    const chunk: LargeObject = {};

    for (let index = currentIndex; index < endIndex; index += 1) {
      const key = keys[index];
      const value = object[key];

      if (Array.isArray(value) && value.length > 1000) {
        const arrayChunks = [];
        for (let index2 = 0; index2 < value.length; index2 += 100) {
          arrayChunks.push(value.slice(index2, index2 + 100));
        }

        chunk[key] = arrayChunks;
      } else if (typeof value === 'object' && value !== null) {
        const nestedChunk: LargeObject = {};
        const callback = (nested: LargeObject) => {
          nestedChunk[key] = nested;
        };

        await renderLargeObjectLazy(value, chunkSize, callback);

        Object.assign(chunk, nestedChunk);
      } else {
        chunk[key] = value;
      }
    }

    currentIndex = endIndex;

    if (Object.keys(chunk).length > 0) {
      updateCallback(chunk);
    }

    if (currentIndex < keys.length) {
      await new Promise((resolve) => setTimeout(resolve, 0));

      await renderChunk();
    }
  };

  await renderChunk();
};
