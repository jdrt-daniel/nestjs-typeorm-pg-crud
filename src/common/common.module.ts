import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, SwaggerModule, DatabaseModule],
  exports: [ConfigModule, SwaggerModule, DatabaseModule],
})
export class CommonModule {}
