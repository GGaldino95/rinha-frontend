import { useContext, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrayEntry, ObjectEntry, PrimitiveEntry } from '../../components';
import { FileContext } from '../../contexts/File';
import { LargeObject, isObject, renderLargeObjectLazy } from '../../utils';
import './styles.css';

export const FileViewer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { file } = useContext(FileContext);
  const [jsonFile, setJsonFile] = useState<object | null>(null);
  console.log('jsonFile', jsonFile);

  useLayoutEffect(() => {
    const updateCallback = (chunk: LargeObject) => {
      // Update the state with the next chunk
      setJsonFile(prevObject => ({ ...prevObject, ...chunk }));
    };

    console.log('file', file, 'state', state);
    if (!file || !state?.fileName) {
      console.log('redirect to home')
      navigate('/');
      window.location.assign('/')
    } else {
      renderLargeObjectLazy(file, 50, updateCallback);
    }

    return () => {
      const contentContainer = document.querySelector('.file-viewer-page-json-content');
      contentContainer?.replaceChildren();
    }
  }, [file, navigate]);

  const handleReturn = () => {
    navigate('/');
  }

  return (
    <main className="file-viewer-page-container">
      <article className="file-viewer-page-title-wrapper">
        <button type="button" className="file-viewer-page-return-button" onClick={handleReturn}>
          <i className="material-icons-round">
            arrow_back
          </i>
        </button>
        <h1 className="file-viewer-page-title">{state.fileName}</h1>
      </article>

      <section id="json-file" className="file-viewer-page-json-content">
        {jsonFile && Object.entries(jsonFile).map(([key, value], index) => {
          if (Array.isArray(value)) {
            return <ArrayEntry key={`array-entry-${index + 1}`} entry={{ key, value }} type="array" />
          } else if (isObject(value)) {
            return <ObjectEntry key={`object-entry-${index + 1}`} entry={{ key, value }} type="object" />
          } else {
            return <PrimitiveEntry key={`primitive-entry-${index + 1}`} entry={{ key, value }} type="primitive" />
          }
        })}
      </section>
    </main>
  );
};