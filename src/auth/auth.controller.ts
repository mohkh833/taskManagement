import { Controller, Post ,ValidationPipe, Body, UseGuards, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post('/signUp')
    signUp (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto){
        return this.authService.signup(authCredentialsDto)
    }

    @Post('/signIn')
    signIn (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user)
    }
}
