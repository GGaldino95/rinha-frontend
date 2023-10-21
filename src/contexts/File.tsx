import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';
import { LargeObject } from '../utils';

type TFile = object | LargeObject | null;

type FileContextType = {
  file: TFile;
  setFile: Dispatch<SetStateAction<TFile>>;
};

const INITIAL_STATE = null;

export const FileContext = createContext<FileContextType>({
  file: INITIAL_STATE,
  setFile: () => undefined,
});

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [file, setFile] = useState<TFile>(INITIAL_STATE);

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
};