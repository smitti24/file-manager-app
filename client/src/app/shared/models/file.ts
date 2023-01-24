export interface FileResponse {
  data: File[],
  total: number;
}

export interface File {
  name: string;
  type: string;
  size: number;
  createdDate: string;
  fullPath: string;
  extension: string;
  filePermissions: FileAccess;
  isSelected?: boolean;
}

export interface FileAccess {
  read: boolean;
  write: boolean;
  execute: boolean;
}
