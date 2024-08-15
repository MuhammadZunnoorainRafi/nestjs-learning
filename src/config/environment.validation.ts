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
});
