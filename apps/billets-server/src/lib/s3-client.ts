import {
  S3Client as AWSS3Client,
  type GetObjectCommand,
  type PutObjectCommand,
} from '@aws-sdk/client-s3';

import dotenv from 'dotenv';

dotenv.config();

export class S3Client {
  private instance: AWSS3Client;
  private getObjectCommand?: GetObjectCommand;
  private putObjectCommand?: PutObjectCommand;
  constructor() {
    this.instance = this.getInstance();
  }

  private getInstance(): AWSS3Client {
    if (!this.instance) {
      this.instance = new AWSS3Client({
        region: process.env.COLDSURF_AWS_REGION,
        credentials: {
          accessKeyId: process.env.COLDSURF_AWS_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.COLDSURF_AWS_SECRET_ACCESS_KEY ?? '',
        },
      });
    }
    return this.instance;
  }

  public setGetObjectCommand(command: GetObjectCommand) {
    this.getObjectCommand = command;
    return this;
  }

  public setPutObjectCommand(command: PutObjectCommand) {
    this.putObjectCommand = command;
    return this;
  }

  public get() {
    if (!this.getObjectCommand) {
      throw new Error('GetObjectCommand is not set');
    }
    return this.getInstance().send(this.getObjectCommand);
  }

  public put() {
    if (!this.putObjectCommand) {
      throw new Error('PutObjectCommand is not set');
    }
    return this.getInstance().send(this.putObjectCommand);
  }
}
