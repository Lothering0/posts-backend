import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Response } from "express";
import { AuthRequest } from "./auth.types";
import { TokenPayload, TokensService } from "src/tokens";
import { UserUnauthorizedException } from "./exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  private _unauthorized = new UserUnauthorizedException();

  public constructor(private readonly tokensService: TokensService) {}

  public canActivate(context: ExecutionContext): true {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    try {
      return this._tryAuthorizate(request, response);
    } catch (error) {
      throw this._unauthorized;
    }
  }

  private _tryAuthorizate(request: AuthRequest, response: Response): true {
    const { access_token } = request.cookies;

    if (!access_token) throw this._unauthorized;

    const user: TokenPayload =
      this.tokensService.verifyAccessToken(access_token);
    request.user = user;
    // response.cookie("hello", "world");

    return true;
  }
}
