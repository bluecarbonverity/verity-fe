export interface IFile {
  fileURI: string
  thumbnailURI: string
  fileName: string
  fileDescription: string
  createdBy: string
  createdAt: string
  subregion?: string
  mrv?: string
  tokenId?: string
}

export interface IFileMetadata extends IFile {
  cid: string
}

export interface IProject {
  description: string
  image: string
  name: string
}