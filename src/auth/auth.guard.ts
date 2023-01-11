import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload, AuthRequest } from "./auth.types";
import { UserUnauthorizedException } from "./exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  private _unauthorized = new UserUnauthorizedException();

  public constructor(private readonly jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): true {
    const request: AuthRequest = context.switchToHttp().getRequest();

    try {
      return this._tryAuthorizate(request);
    } catch (error) {
      throw this._unauthorized;
    }
  }

  private _tryAuthorizate(request: AuthRequest): true {
    const { auth_token } = request.cookies;

    if (!auth_token) throw this._unauthorized;

    const user: AuthTokenPayload = this.jwtService.verify(auth_token);
    request.user = user;

    return true;
  }
}
