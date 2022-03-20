import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateContentDto {
    @IsNotEmpty()
    @MaxLength(40)
    title: string;
    
    @IsNotEmpty()
    description: string;
}