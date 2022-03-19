import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ContentStatus } from './content-status.enum';
import { Content } from './content.entity';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentStatusValidationPipe } from './pipes/content-status-validation.pipe';


@Controller('contents')
@UseGuards(AuthGuard())
export class ContentsController {
    //private(접근제한자)를써서 암묵적으로 프로퍼티로 선언되어서 메소드를 사용할수있게만들어줌
    constructor(private contentsService: ContentsService) {}

    // @Get('/')
    // getAllContent(): Content[]{
    //     return this.contentsService.getAllContents();
    // }
    @Get()
    getAllContent(): Promise<Content[]> {
        return this.contentsService.getAllContents();
    }

    //해당 유저만 가져오기
    @Get('user')
    getUserContent(
        @GetUser() user: User
    ): Promise<Content[]> {
        return this.contentsService.getUserContents(user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createContent(
    //     @Body() createContentDto: CreateContentDto
    // ): Content {
    //     return this.contentsService.createContent(createContentDto);
    // }
    @Post()
    @UsePipes(ValidationPipe)
    createContent(@Body() createContentDto: CreateContentDto,
    @GetUser() user: User): Promise<Content> {
        return this.contentsService.createContent(createContentDto, user);
    }

    // //Param 파라미터를(여기서는 id) 가져옴
    // @Get(':id')
    // getContentById(@Param('id') id: string): Content {
    //     return this.contentsService.getContentById(id);
    // }
    @Get(':id')
    getContentById(@Param('id') id: number): Promise<Content> {
        return this.contentsService.getContentById(id);
    }

    // //delete
    // @Delete(':id')
    // deleteContent(@Param('id') id: string): void {
    //     this.contentsService.deleteContent(id);
    // }

    @Delete(':id')
    deleteContent(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.contentsService.deleteContent(id);
    }

    //updateStatus parseintpipe는 파이프
    @Patch(':id/status')
    updateContentStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ContentStatusValidationPipe) status: ContentStatus
    ) {
        return this.contentsService.updateContentStatus(id, status);
    }

}
