import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndexService } from './index.service';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';

@Controller('index')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Post()
  create(@Body() createIndexDto: CreateIndexDto) {
    return this.indexService.create(createIndexDto);
  }

  @Get()
  findAll() {
    return this.indexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndexDto: UpdateIndexDto) {
    return this.indexService.update(+id, updateIndexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indexService.remove(+id);
  }
}
