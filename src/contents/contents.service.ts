import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentStatus } from './content-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentRepository } from './content.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';


@Injectable()
export class ContentsService {
    //content-repository를 사용하기위해 주입
    constructor(
        @InjectRepository(ContentRepository)
        private contentRepository: ContentRepository,
    ) {}

    // //모든contents를 가져오는함수
    // getAllContents(): Content[] {
    //     return this.contents;
    // }

    // createContent(createContentDto: CreateContentDto) {
    //     const { title, description } = createContentDto
    //     const content: Content = {
    //         //uuid를 설치해서 유니크값으로 설정하게해줌
    //         id: uuid(),
    //         //원래 title: title이지만 두개가 같으면 JS에서는 title만 적어줘도 인식함
    //         title,
    //         description,
    //         status: ContentStatus.PUBLIC
    //     }
    //     this.contents.push(content);
    //     return content;
    // }
    async createContent(createContentDto: CreateContentDto): Promise<Content> {
        const {title, description} = createContentDto;

        const content = this.contentRepository.create({
            title,
            description,
            status: ContentStatus.PUBLIC
        })
        await this.contentRepository.save(content);
        return content;
    }

    async getContentById(id: number): Promise <Content> {
        const found = await this.contentRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`Can't find Content with id ${id}`);
        }
        return found;
    }
    // //id로 content 찾음
    // getContentById(id: string): Content {
    //     const found = this.contents.find((content) => content.id === id);
    //     //content-id유무체크(notfound)
    //     if(!found){
    //         throw new NotFoundException(`${id}를 찾을 수 없습니다.`);
    //     }
    //     return  found;
    // }

    // //삭제 return값을 안줄것이기때문에 void로 줬음
    // deleteContent(id: string): void {
    //     //getContentById로 content-id유무 체크
    //     const found = this.getContentById(id);
    //     this.contents = this.contents.filter((content) => content.id !== found.id);
    // }

    // //updateStatus
    // updateContentStatus(id: string, status: ContentStatus): Content {
    //     const content = this.getContentById(id);
    //     content.status = status;
    //     return content;
    // }
}
