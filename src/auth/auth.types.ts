import { Request } from "express";
import { TokenPayload } from "src/tokens/tokens.types";

export interface AuthRequest extends Request {
  user: TokenPayload;
}
