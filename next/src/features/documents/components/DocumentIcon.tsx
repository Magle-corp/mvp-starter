import styled from 'styled-components';
import { MdOutlineImage, MdOutlineInsertDriveFile } from 'react-icons/md';

type DocumentIcon = {
  fileExtension: string;
};

const DocumentIcon = (props: DocumentIcon) => {
  if (props.fileExtension === 'pdf') {
    return <PdfIcon />;
  } else {
    return <ImageIcon />;
  }
};

const ImageIcon = styled(MdOutlineImage)`
  width: 23px !important;
  height: 23px !important;
`;

const PdfIcon = styled(MdOutlineInsertDriveFile)`
  width: 23px !important;
  height: 23px !important;
`;

export default DocumentIcon;
