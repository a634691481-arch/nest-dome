import { Controller, Get, Post, Body } from '@nestjs/common'
import { CoreService } from './core.service'
import { CreateCoreDto } from './dto/create-core.dto'
// import { UpdateCoreDto } from './dto/update-core.dto'

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() createCoreDto: CreateCoreDto) {
    return this.coreService.create(createCoreDto)
  }
  @Get('8888')
  55555() {
    return {
      message: 'This action returns all core',
      data: [
        {
          id: 1,
          name: 'Core 1',
          description: 'This is core 1'
        },
        {
          id: 2,
          name: 'Core 2',
          description: 'This is core 2'
        }
      ],
      statusCode: 200
    }
  }

  @Get()
  findAll() {
    return {
      message: 'This action returns all core',
      // query: query,
      data: [
        {
          id: 1,
          name: 'Core 1',
          description: 'This is core 1'
        },
        {
          id: 2,
          name: 'Core 2',
          description: 'This is core 2'
        }
      ],
      statusCode: 200
    }
  }
}
