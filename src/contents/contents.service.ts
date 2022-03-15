import { Injectable } from '@nestjs/common';
import { Content, ContentStatus } from './content.model';
import { v1 as uuid } from 'uuid';
import { CreateContentDto } from './dto/create-content.dto';


@Injectable()
export class ContentsService {
    //다른컴포넌트에서 contents값 수정을 차단하기위해 private 사용
    private contents: Content[] = [];

    //모든contents를 가져오는함수
    getAllContents(): Content[] {
        return this.contents;
    }

    createContent(createContentDto: CreateContentDto) {
        const { title, description } = createContentDto
        const content: Content = {
            //uuid를 설치해서 유니크값으로 설정하게해줌
            id: uuid(),
            //원래 title: title이지만 두개가 같으면 JS에서는 title만 적어줘도 인식함
            title,
            description,
            status: ContentStatus.PUBLIC
        }
        this.contents.push(content);
        return content;
    }

    //id로 content 찾음
    getContentById(id: string): Content {
        return this.contents.find((content) => content.id === id);
    }

    //삭제 return값을 안줄것이기때문에 void로 줬음
    deleteContent(id: string): void {
        this.contents = this.contents.filter((content) => content.id !== id);
    }

    //updateStatus
    updateContentStatus(id: string, status: ContentStatus): Content {
        const content = this.getContentById(id);
        content.status = status;
        return content;
    }
}
