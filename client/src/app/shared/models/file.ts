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
  isSelected?: boolean;
}
