export type FileConstraints = {
  fileMaxLength: number;
  fileMinLength: number;
  fileTypes: string[];
  fileExtensions: string;
};

const avatarConstraints: FileConstraints = {
  fileMaxLength: 500000,
  fileMinLength: 10000,
  fileTypes: ['image/jpeg', 'image/png', 'image/jpeg'],
  fileExtensions: '.jpg, .png, .jpeg',
};

const documentConstraints: FileConstraints = {
  fileMaxLength: 500000,
  fileMinLength: 10000,
  fileTypes: ['image/jpeg', 'image/png', 'image/jpeg', 'application/pdf'],
  fileExtensions: '.jpg, .png, .jpeg, .pdf',
};

export { avatarConstraints, documentConstraints };
