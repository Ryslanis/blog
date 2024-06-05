import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { api } from 'src/utils/constants';

export class GetPostsDto {
  @ApiProperty({ required: false, default: api.postsGetLimit })
  readonly limit: number = api.postsGetLimit;
  
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  readonly page: number = 1;

  @ApiProperty({ required: false })
  readonly userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly search: string;

  @ApiProperty({ required: false, default: 'id' })
  @IsIn(['createdAt', 'title'])
  @IsOptional()
  readonly sortField: string = 'createdAt';

  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  readonly sortOrder: 'ASC' | 'DESC' = 'ASC';
}