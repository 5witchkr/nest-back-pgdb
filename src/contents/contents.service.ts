import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentStatus } from './content-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentRepository } from './content.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { User } from 'src/auth/entity/user.entity';


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
    //모두 가져오니까 배열형태[] 타입, find()에 아무것도 안넣어주면 다 가져옴
    async getAllContents(): Promise <Content[]> {
        return this.contentRepository.find();
    }


    //해당유저의 게시글만 가져오는기능
    async getUserContents(
        user: User
    ): Promise <Content[]> {
        //대부분 repository api를 사용하여 구현할수있지만,
        //복잡한 기능을 구현할때는 queryBuilder를 사용 (typeorm 사이트 참고)
        const query = this.contentRepository.createQueryBuilder('content');

        query.where('content.userId = :userId', {userId: user.id});

        const contents = await query.getMany();

        return contents;
    }

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
    createContent(createContentDto: CreateContentDto, user: User): Promise<Content> {
        //repository패턴에서 create를 가져옴
        return this.contentRepository.createContent(createContentDto, user);
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
    async getContentById(id: number): Promise <Content> {
        const found = await this.contentRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`Can't find Content with id ${id}`);
        }
        return found;
    }

    // //삭제 return값을 안줄것이기때문에 void로 줬음
    // deleteContent(id: string): void {
    //     //getContentById로 content-id유무 체크
    //     const found = this.getContentById(id);
    //     this.contents = this.contents.filter((content) => content.id !== found.id);
    // }
    //content의 id값과 user정보로 확인하기
    async deleteContent(id: number, user: User): Promise<void> {
        const result = await this.contentRepository.delete({ id, user });
        //해당id가 없거나 user정보가 일치하지않으면 에러메시지반환
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Content with id ${id}`)
        }
    }

    // //updateStatus
    // updateContentStatus(id: string, status: ContentStatus): Content {
    //     const content = this.getContentById(id);
    //     content.status = status;
    //     return content;
    // }
    async updateContentStatus(id: number, status: ContentStatus): Promise<Content> {
        const content = await this.getContentById(id);
        content.status = status;
        await this.contentRepository.save(content);
        return content;
    }
}
