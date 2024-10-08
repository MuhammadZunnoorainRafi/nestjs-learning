import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'production', 'test', 'staging')
    .default('development')
    .trim(),
  DATABASE_PORT: joi.number().port().default(5432),
  DATABASE_NAME: joi.string().required(),
  DATABASE_HOST: joi.string().required(),
  DATABASE_USER: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_TOKEN_AUDIENCE: joi.string().required(),
  JWT_TOKEN_ISSUER: joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: joi.number().required(),
  AWS_REGION: joi.string().required(),
  AWS_PUBLIC_BUCKET_NAME: joi.string().required(),
  S3_SECRET_ACCESS_KEY: joi.string().required(),
  S3_ACCESS_KEY: joi.string().required(),
  IMAGE_BASE_URL: joi.string().required(),
  MAIL_HOST: joi.string().required(),
  SMTP_USERNAME: joi.string().required(),
  SMTP_PASSWORD: joi.string().required(),
});
