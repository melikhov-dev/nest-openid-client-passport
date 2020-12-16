import { Module } from '@nestjs/common';
import { CLIENT, PASSPORT } from './auth.constants';
import { Issuer } from 'openid-client';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import { Strategy } from 'openid-client';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CLIENT,
      useFactory: async (configService: ConfigService) => {
        const oneLoginIssuer = await Issuer.discover('https://devschacht-dev.onelogin.com/oidc/2');
        return new oneLoginIssuer.Client({
          'client_id': configService.get<string>('CLIENT_ID'),
          'client_secret': configService.get<string>('CLIENT_SECRET'),
          'redirect_uris': ['http://localhost:3000/auth/callback'],
          'response_types': ['code'],
        });
      },
      inject: [ConfigService]
    },
    {
      provide: PASSPORT,
      useFactory: (client) => {
        passport.use(
          'sso',
          new Strategy({ client }, (tokenSet, userinfo, done) => {
            return done(null, userinfo);
          })
        )
        return passport;
      },
      inject: [CLIENT]
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {

}
