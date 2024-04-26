import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigModule, SwaggerModule, DatabaseModule, UtilsModule]
})
export class CommonModule {}
