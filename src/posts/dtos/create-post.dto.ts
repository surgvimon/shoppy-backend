import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        example: 'This is a title',
        description: 'This is the title for the blog post',
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        enum: postType,
        description: "Possible values  'post', 'page', 'story', 'series'",
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({
        description: "For example 'my-url'",
        example: 'my-blog-post',
      })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example "my-url" ',
    })
    slug: string;

    @ApiProperty({
        enum: postStatus,
        description: "Possible value 'draft', 'scheduled', 'review', 'published' "
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus;

    @ApiPropertyOptional({
        description: 'This is post content',
        example: 'The post content'
    })
    @IsString()
    @IsOptional()
    content?: string;
    
    @ApiPropertyOptional({
        description: 'Serialize your JSON object else a validation error will be thrown',
        example: '{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }',
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true})
    @MinLength(3, { each: true})
    tags?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions: CreatePostMetaOptionsDto[]
}