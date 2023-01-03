import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "src/types";

type canActivateReturnableType =
  | boolean
  | Promise<boolean>
  | Observable<boolean>;

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

  public canActivate(context: ExecutionContext): canActivateReturnableType {
    const request: Request = context.switchToHttp().getRequest();

    try {
      return this._tryAuthorizate(request);
    } catch (error) {
      throw this._unauthorized;
    }
  }
}
