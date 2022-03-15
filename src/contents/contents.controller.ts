import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Content, ContentStatus } from './content.model';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';


@Controller('contents')
export class ContentsController {
    //private(접근제한자)를써서 암묵적으로 프로퍼티로 선언되어서 메소드를 사용할수있게만들어줌
    constructor(private contentsService: ContentsService) {}

    @Get('/')
    getAllContent(): Content[]{
        return this.contentsService.getAllContents();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createContent(
        @Body() createContentDto: CreateContentDto
    ): Content {
        return this.contentsService.createContent(createContentDto);
    }

    //Param 파라미터를(여기서는 id) 가져옴
    @Get(':id')
    getContentById(@Param('id') id: string): Content {
        return this.contentsService.getContentById(id);
    }

    //delete
    @Delete(':id')
    deleteContent(@Param('id') id: string): void {
        this.contentsService.deleteContent(id);
    }

    //updateStatus
    @Patch(':id/status')
    updateContentStatus(
        @Param('id') id: string,
        @Body('status') status: ContentStatus
    ) {
        return this.contentsService.updateContentStatus(id, status);
    }

}
