import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload, AuthRequest } from "./auth.types";
import { UserUnauthorizedException } from "./exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  private _unauthorized = new UserUnauthorizedException();

  public constructor(private readonly jwtService: JwtService) {}

  private _tryAuthorizate(request: AuthRequest): true {
    const { authorization } = request.headers;
    const [authType, token] = authorization.split(" ");

    if (authType !== "Bearer" || !token) throw this._unauthorized;

    const user: AuthTokenPayload = this.jwtService.verify(token);
    request.user = user;

    return true;
  }

  public canActivate(context: ExecutionContext): true {
    const request: AuthRequest = context.switchToHttp().getRequest();

    try {
      return this._tryAuthorizate(request);
    } catch (error) {
      throw this._unauthorized;
    }
  }
}
