import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Environment } from 'src/common/config/env.validationClass';

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(Environment, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    if (validatedConfig.ENVIRONMENT === 'development') {
      throw new Error(errors.toString());
    } else {
      throw new Error(
        'An error related to secure variables occured while bootstraping. Please refer to the production team',
      );
    }
  }
  return config;
}
