export interface UploadRequest {
  files: File;
}

export interface UploadResponse {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: FormatsType;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetaDataType;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
}

type FormatsType = {
  small: SizeType;
  medium: SizeType;
  thumbnail: SizeType;
};

type SizeType = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetaDataType;
};

type ProviderMetaDataType = {
  public_id: string;
  resource_type: string;
};
