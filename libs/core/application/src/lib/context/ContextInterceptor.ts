import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {RequestContextService} from "./AppRequestContext";

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> | Promise<Observable<unknown>> {

    const request = context.switchToHttp().getRequest();

    /**
     * generate an ID in global context of each request.
     * This can be used as correlation id
     */
    const requestId = request?.body?.requestId;


    RequestContextService.setRequestId(requestId);

    return next.handle();
  }
}
