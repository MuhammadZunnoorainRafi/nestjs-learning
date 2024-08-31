import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'production',
  awsAccessKey: process.env.S3_ACCESS_KEY,
  awsSecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
}));
