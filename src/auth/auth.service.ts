import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AuthService {
  constructor(
  ) {}
  async logIn(req) {
    await new Promise((resolve, reject) => {
      req.logIn(req.user, (err) => err ? reject(err) : resolve())
    })
  }
}
