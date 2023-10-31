import { FileProvider } from './File';

export const ContextStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <FileProvider>{children}</FileProvider>
  );
};