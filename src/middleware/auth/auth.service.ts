import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dtos/auth';

@Injectable()
export class AuthService {
    async login(data: LoginDTO) {

    }

    async register(data: LoginDTO) {
        
    }
}
