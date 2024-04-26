import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ModulesModule],
})
export class SeedModule {}
