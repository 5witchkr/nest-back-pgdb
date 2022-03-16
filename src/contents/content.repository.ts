import { EntityRepository, Repository } from "typeorm";
import { ContentStatus } from "./content-status.enum";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create-content.dto";

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
    //기존에 service에서 하던 create부분을 repository로 가져옴
    async createContent(createContentDto: CreateContentDto): Promise<Content> {
        const {title, description} = createContentDto;

        const content = this.create({
            title,
            description,
            status: ContentStatus.PUBLIC
        })
        await this.save(content);
        return content;
    }

}