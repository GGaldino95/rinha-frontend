import React, { useRef } from 'react';

interface IUploadButtonProps {
  onFileUpload: (file: File) => void;
}

export const UploadButton = ({ onFileUpload }: IUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    const fileInput = inputRef.current as HTMLInputElement;
    fileInput.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files;

    if (fileUploaded) {
      onFileUpload(fileUploaded[0]);
    }
  };

  return (
    <>
      <button type="button" className="home-page-button" onClick={handleButtonClick}>Load JSON</button>
      <input type="file" hidden className="home-page-button-input" ref={inputRef} onChange={handleChange} />
    </>
  );
};