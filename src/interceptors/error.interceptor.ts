import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isObject, isString } from 'util';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: any) => {
                //console.log(error);
                //Means its an error comming from API
                
                if (error instanceof HttpErrorResponse) {
                    //appError represents unhandled exceptions in the applications
                    //global exception filter on backend add App-Error header with error string if an unhandled error occurs
                    if(error.status == 200 || error.statusText == "Found"){
                        return throwError(error);
                    }
                    const appError = error.headers.get("App-Error");
                    if (appError)
                        return throwError(appError);

                    if (error.status == 401) {
                        return throwError(error.statusText);
                    }

                    if(error.status == 0){
                        return throwError("No Internet Connection");
                    }

                    //An Http Status Code error which can have content of array of errors or a single string
                    let serverError;
                    if (isString(error.error))
                        serverError = error.error;
                    else if (error && Array.isArray(error.error))
                        serverError = error.error;
                    else if (error.error && Array.isArray(error.error.errors))
                        serverError = error.error.errors;
                    else if (error.message) {
                        serverError = error.message;
                    }
                    else
                        serverError = error.error

                    let ModelStateErrors = "";

                    if (serverError && typeof serverError == "object") {
                        if (serverError['isTrusted']) {
                            //This is reached if the backend is not responding
                            return throwError("Server not responding");
                        }

                        for (const key in serverError) {
                            if (serverError[key]) {
                                if (serverError[key]['description']) {
                                    ModelStateErrors += serverError[key]['description'] + "\n";
                                }
                                else
                                    ModelStateErrors += serverError[key] + "\n";
                            }
                        }
                    }

                    return throwError(ModelStateErrors || serverError || error || "Sorry An Error Occured");
                }
            }
            )
        )
    }

}
