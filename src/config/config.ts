// src/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class config {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL', 'mongodb://localhost/nest');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'defaultSecret');
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }
}
