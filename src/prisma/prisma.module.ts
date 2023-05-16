import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // provider is a service
  exports: [PrismaService], // 다른데에서 import해서 쓸일 있을때 export 작성
})
export class PrismaModule {}
