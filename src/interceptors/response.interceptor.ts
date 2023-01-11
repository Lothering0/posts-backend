import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
  HttpStatus
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface Response<T> {
  statusCode: HttpStatus;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();

    const mapCallback = (data: T): Response<T> => ({
      statusCode: response.statusCode,
      data
    });

    return next
      .handle()
      .pipe(map(mapCallback));
  }
}
