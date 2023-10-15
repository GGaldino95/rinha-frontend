import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadButton } from '../../components';
import { FileContext } from '../../contexts/File';
import { readJSONFile } from '../../utils';
import './styles.css';

export const Home = () => {
  const navigate = useNavigate();
  const { setFile } = useContext(FileContext);
  const [isInvalidFile, setIsInvalidFile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/json') {
      return setIsInvalidFile(true);
    }

    setIsInvalidFile(false);
    console.log('file', file);
    try {
      setIsLoading(true);
      const parsedFile = await readJSONFile(file);
      console.log('parsedFile', parsedFile)
      if (parsedFile) {
        setFile(parsedFile);
        navigate(`file/${file.name}`, { state: { fileName: file.name } });
      }

    } catch (error) {
      console.error(error);
      setIsInvalidFile(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="home-page-container">
      {isLoading ? <p>Loading...</p> : (
        <>
          <h1 className="home-page-title">JSON Tree Viewer</h1>
          <p className="home-page-description">Simple JSON Viewer that runs completely on-client. No data exchange</p>
          <UploadButton onFileUpload={handleFileUpload} />
          {isInvalidFile && <p className="home-page-error">Invalid file. Please load a valid JSON file.</p>}
        </>
      )}
    </main>
  );
}
