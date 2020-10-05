import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

export class TextResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            responseType: 'text'
        });

        return next.handle(clonedRequest)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        return event.clone({
                            body: JSON.parse(event.body),
                        });
                    }
                }, catchError(
                    (error: HttpErrorResponse) => {
                        const parsedError = Object.assign({}, error, { error: JSON.parse(error.error) });
                        return Observable.throw(new HttpErrorResponse(parsedError));
                    }))
            );
    }

}