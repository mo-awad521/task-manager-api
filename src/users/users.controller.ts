import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser('id') userId: number) {
    return this.userService.findById(userId);
  }

  @Patch('me')
  updateMe(@CurrentUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateName(userId, dto.name);
  }
}
