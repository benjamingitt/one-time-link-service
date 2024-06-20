import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('links')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать одноразовую ссылку',
    requestBody: {
      description: 'Значение для создания одноразовой ссылки',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              value: {
                type: 'string',
                description:
                  'Значение, которое будет связано с одноразовой ссылкой',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Ссылка успешно создана.' })
  @ApiResponse({ status: 400, description: 'Неверный запрос.' })
  async createLink(@Body('value') value: string): Promise<string> {
    if (!value) {
      throw new HttpException('Value is required', HttpStatus.BAD_REQUEST);
    }
    return this.linkService.createLink(value);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить значение по одноразовой ссылке' })
  @ApiResponse({ status: 200, description: 'Значение успешно получено.' })
  @ApiResponse({
    status: 404,
    description: 'Ссылка не найдена или уже использована.',
  })
  async getLink(@Param('id') id: string): Promise<string> {
    try {
      return await this.linkService.getLink(id);
    } catch (error) {
      throw new HttpException(
        'Link not found or already used',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
