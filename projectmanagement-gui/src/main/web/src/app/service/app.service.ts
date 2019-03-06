import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';  
import { Headers, RequestOptions } from '@angular/http';
import { Config } from '../env/index';
import { RouterModule , Router } from '@angular/router';

@Injectable()
export class appService {
  
    updatetask : any = {};
    
    constructor(private http: Http, private router : Router) {

    } 

    getUsers(): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Config.API+ "api/users", options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    getProjects(): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Config.API+ "api/projects", options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    getParentTask(): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Config.API+ "api/parenttasks", options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    getParentTaskForProjectId(projectId): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Config.API+ "api/parenttasks/projects/" + projectId, options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    updateParentTasks(inputParam : {}): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.API+ "api/parenttasks", inputParam, options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    updateProjects(inputParam : {}): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.API+ "api/projects", inputParam, options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    updateUsers(inputParam : {}): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.API+ "api/users", inputParam, options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    updateTasks(inputParam : {}): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.API+ "api/tasks", inputParam, options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    getTasks(): Observable<string[]> {
        let headers = new Headers({ 'Accept': '*/*', 'Content-Type':'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Config.API+ "api/tasks", options)
                        .map((res: Response) => res.json())
                        .catch(this.handleErrorNoChange.bind(this));
    }

    private handleErrorNoChange (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log('Error handleErrorNoChange kytpp-service: ' + error);
        return Observable.throw(errMsg);
    }

}