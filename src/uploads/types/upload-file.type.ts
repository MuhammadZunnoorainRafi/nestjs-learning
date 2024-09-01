import { FileTypesEnum } from '../enums/file-types.enum';

export type UploadFileType = {
  name: string;
  path: string;
  type: FileTypesEnum;
  mime: string;
  size: number;
};
