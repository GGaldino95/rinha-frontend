import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContextStore } from '../contexts';
import { FileViewer, Home } from '../pages';

export const AppRouter = () => {

  return (
    <ContextStore>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/" element={<Home />} />
          <Route path="/file/:fileName" element={<FileViewer />} />
        </Routes>
      </BrowserRouter>
    </ContextStore>
  );
}