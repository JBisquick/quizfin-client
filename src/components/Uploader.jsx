import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

function Uploader({ setImg }) {
  return (
    <>
      <FileUploaderMinimal
        classNameUploader="uc-light"
        pubkey="428e34bbbc4d13159333"
        imgOnly={true}
        maxLocalFileSizeBytes={2000000}
        multiple={false}
        onFileUploadSuccess={(e) => {
          setImg(e.uuid);
        }}
      />
    </>
  );
}

export default Uploader;
