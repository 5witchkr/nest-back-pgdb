import { Body, Controller, Get, Post } from '@nestjs/common';
import { Content } from './content.model';
import { ContentsService } from './contents.service';

@Controller('contents')
export class ContentsController {
    //private(접근제한자)를써서 암묵적으로 프로퍼티로 선언되어서 메소드를 사용할수있게만들어줌
    constructor(private contentsService: ContentsService) {}

    @Get('/')
    getAllContent(): Content[]{
        return this.contentsService.getAllContents();
    }

    @Post()
    createContent(
        @Body('title') title: string,
        @Body('description') description: string
    ): Content {
        return this.contentsService.createContent(title, description);
    }
}
