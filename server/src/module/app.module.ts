import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { ChatService } from './chat/chat.service';
import { TextService } from './text/text.service';
import { VisionService } from './vision/vision.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [ChatService, TextService, VisionService],
})
export class AppModule {}
