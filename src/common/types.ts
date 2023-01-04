export type id<T extends number | string = number> = T;
import { Observable } from "rxjs";

export type canActivateReturnableType =
  | boolean
  | Promise<boolean>
  | Observable<boolean>;
