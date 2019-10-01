import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './bug';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class BugService {

  // Base url
  //baseurl = 'http://wp.sites-test.s-cloud.fi';
  baseurl = 'http://localhost:88/Sgroup';
 
  basic = '';

  constructor(private http: HttpClient) { }


  token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODhcL1Nncm91cCIsImlhdCI6MTU2OTkyNzAxMCwibmJmIjoxNTY5OTI3MDEwLCJleHAiOjE1NzA1MzE4MTAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.RbJxc04YOIDeXzJ-7xHF652FLaZWLiqaoq8xc6iFG-o';


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.token,
    })
  }

 
  // // POST
  CreateBug(data): Observable<Bug> {
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer' + this.token,
    //     //'Bearer ' + globals.currentUser.token  
    // });
     //// let options = { headers: headers };
     // let options = new RequestOptions({headers:headers});
    return this.http.post<Bug>(this.baseurl + '/wp-json/wp/v2/posts/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

   // POST
  //  CreateBug(data): Observable<Bug> {
  //   return this.http.post<Bug>(this.baseurl + '/blogstest/add/', JSON.stringify(data),  {
  //     headers: new HttpHeaders({
  //          'Content-Type':  'application/json',
  //        })
  //   } )
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorHandl)
  //   )
  // }  



  // GET Single Blog
  GetIssue(id): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl + '/wp-json/wp/v2/posts/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetIssues(): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl + '/wp-json/wp/v2/posts')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateBug(id, data): Observable<Bug> {
    return this.http.put<Bug>(this.baseurl + '/wp-json/wp/v2/posts/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // DELETE
  DeleteBug(id){
    return this.http.delete<Bug>(this.baseurl + '/wp-json/wp/v2/posts/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}