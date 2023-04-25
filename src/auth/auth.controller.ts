import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signIn')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{
    accessToken: string;
  }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  me(@Req() req) {
    console.log(req);
  }
}
