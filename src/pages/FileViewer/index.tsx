import { useContext, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileContext } from '../../contexts/File';
import { chunkArray, isObject } from '../../utils';
import './styles.css';

export const FileViewer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { file } = useContext(FileContext);

  useLayoutEffect(() => {
    if (!file || !state?.fileName) {
      navigate('/');
    } else {
      const contentContainer = document.querySelector('#json-file') as HTMLDivElement;

      const generateEntry = (object: object, subEntryLevel: number, parentEl: Element) => {
        Object.entries(object).forEach(([key, value], index) => {
          const entryEl = document.createElement('section');
          entryEl.classList.add('obj-entry');

          const isPrevEntryArray = parentEl.previousElementSibling?.getAttribute('type') === 'array';

          if (isPrevEntryArray) {
            const indexEl = document.createElement('span');
            indexEl.classList.add('obj-index');
            indexEl.textContent = `${index}: `;
            entryEl.appendChild(indexEl);
          } else {
            const keyEl = document.createElement('span');
            keyEl.classList.add('obj-key');
            keyEl.textContent = `${key}: `;
            entryEl.appendChild(keyEl);
          }

          const valueEl = document.createElement('span');

          if (Array.isArray(value)) {
            entryEl.setAttribute('type', 'array');
            valueEl.classList.add('obj-bracket');
            valueEl.textContent = '[';

            const subArrayContainer = document.createElement('section');
            subArrayContainer.classList.add('sub-obj');

            entryEl.appendChild(valueEl);
            parentEl.appendChild(entryEl);
            parentEl.appendChild(subArrayContainer);

            console.log('array value', value);
            if (value.length > 100) {
              const chunks = chunkArray(value, 100);

              chunks.forEach((chunk) => {
                setTimeout(() => {
                  generateEntry(chunk, subEntryLevel + 1, subArrayContainer);
                }, 100);
              });
            } else {
              generateEntry(value, subEntryLevel + 1, subArrayContainer);
            }

            const closingArrayEntry = document.createElement('span');
            closingArrayEntry.classList.add('obj-bracket');
            closingArrayEntry.textContent = ']';

            parentEl.appendChild(closingArrayEntry);
          } else if (isObject(value)) {
            entryEl.setAttribute('type', 'object');
            valueEl.classList.add('obj-bracket');
            valueEl.textContent = '{';

            const subObjContainer = document.createElement('section');
            subObjContainer.classList.add('sub-obj');

            parentEl.appendChild(entryEl);
            parentEl.appendChild(subObjContainer);

            generateEntry(value, subEntryLevel + 1, subObjContainer);

            if (!isPrevEntryArray) {
              const closingObjectEntry = document.createElement('span');
              closingObjectEntry.classList.add('obj-bracket');
              closingObjectEntry.textContent = '}';

              entryEl.appendChild(valueEl);
              parentEl.appendChild(closingObjectEntry);
            }
          } else {
            entryEl.setAttribute('type', 'primitive');
            valueEl.classList.add('obj-value');
            valueEl.textContent = typeof value === 'string' ? `"${value}"` : value;

            entryEl.appendChild(valueEl);
            parentEl.appendChild(entryEl);
          }

          entryEl.setAttribute('entry-level', String(subEntryLevel));
        })
      };

      console.log('selected file', file);

      generateEntry(file, 0, contentContainer);
    }

    return () => {
      const contentContainer = document.querySelector('.file-viewer-page-json-content');
      contentContainer?.replaceChildren();
    }
  }, [])

  return (
    <main className="file-viewer-page-container">
      <h1 className="file-viewer-page-title">{state.fileName}</h1>

      <section id="json-file" className="file-viewer-page-json-content" />
    </main>
  );
};