import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  login(
    @Body()
    body: {
      username: string;
      password: string;
    },
  ) {
    const token = this.jwtService.sign({
      username: body.username,
    });

    return {
      accessToken: token,
    };
  }
}