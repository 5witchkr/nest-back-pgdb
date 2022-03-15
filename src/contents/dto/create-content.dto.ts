import { IsNotEmpty } from "class-validator";

export class CreateContentDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;
}