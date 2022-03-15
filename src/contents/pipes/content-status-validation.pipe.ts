import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ContentStatus } from "../content.model";

//status를 PUBLIC과 PRIVATE만 올수있게 해주고 이외의값이면 에러를 보내주는 pipe
export class ContentStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        ContentStatus.PRIVATE,
        ContentStatus.PUBLIC
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        //value를 대문자로 바꿔줌
        value = value.toUpperCase();
        //isStatusValid에 value를 넣어서 -1이 아니면 유효한값임
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} 는 유효하지 않은 값입니다.`);
        }
        return value;
    }
    //값이 유효한지(private이나 public인지) 체크
    private isStatusValid(status: any) {
        //indexof는 StatusOptions배열에서 인자가 몇번째 인덱스인지 찍는것, 만약 값이배열에 없으면 -1 이됨
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }

}