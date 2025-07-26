export interface PresignedData {
  fields: {
    acl: string;
    'Content-Type': string;
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    key: string;
    Policy: string;
    'X-Amz-Signature': string;
  };
  url: string;
}
