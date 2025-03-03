import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import Multer from 'multer';

import { AppService } from './app.service';
import { ChatContent } from 'data-model';
import { ChatService } from './chat/chat.service';
import { TextService } from './text/text.service';
import { VisionService } from './vision/vision.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService,
              private readonly chatService: ChatService, 
              private readonly textService: TextService,
              private readonly visionService: VisionService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('chat')
  chat(@Body() chatContent: ChatContent) {
    return this.chatService.chat(chatContent);
  }
  
  @Post('text')
  text(@Body() chatContent: ChatContent) {
    return this.textService.generateText(chatContent.message);
  }

  @Post('vision')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: {message: string}) {
    return this.visionService.vision(body.message, file);
  }
}
