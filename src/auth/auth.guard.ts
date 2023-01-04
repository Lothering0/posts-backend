import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "./auth.types";

interface Request {
  headers: {
    authorization: string;
  };
  user: AuthTokenPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private _unauthorized = new UnauthorizedException({
    message: "Unauthorized",
    statusCode: HttpStatus.UNAUTHORIZED
  });

  public constructor(private readonly jwtService: JwtService) {}

  private _tryAuthorizate(request: Request): true {
    const { authorization } = request.headers;
    const [authType, token] = authorization.split(" ");

    if (authType !== "Bearer" || !token) throw this._unauthorized;

    const user: AuthTokenPayload = this.jwtService.verify(token);
    request.user = user;

    return true;
  }

  public canActivate(context: ExecutionContext): true {
    const request: Request = context.switchToHttp().getRequest();

    try {
      return this._tryAuthorizate(request);
    } catch (error) {
      throw this._unauthorized;
    }
  }
}
