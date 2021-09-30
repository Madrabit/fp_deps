import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department.model';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpDepartment {

  BASE_URL = environment.apiUrl

  constructor(private http: HttpClient
  ) {
  }

  getDepartments(): Observable<Department[]> {
    const headers = new HttpHeaders( {
  //    authorization : 'Basic ' + btoa("3:3")
    } );
    return this.http.get<Department[]>(this.BASE_URL+'deps/')
      .pipe(
        map((data: Department[]) =>
          data.map(
            (dep: Department) =>
              new Department(dep.depName, dep.depNumber, dep.amountSng, dep.amountBanks,
                dep.amountNfo, dep.amountBanksBranches))
        )
      );
  }

  getChecked(): Observable<Object> {
    const headers = new HttpHeaders( {
    //  authorization : 'Basic ' + btoa("3:3")
    } );
    return this.http.get(this.BASE_URL+'checked/', {responseType: 'json'})
      .pipe(map(res => res));
  }

  getEmpList(deps: number[], orgType: number[]): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}${(deps)}/${(orgType)}`)
      .pipe(
        map((data: Employee[]) =>
          data.map(
            (emp: Employee) =>
              new Employee(emp.objectId, emp.name, emp.lastname, emp.email, emp.depName, emp.departmentNumber))
        )
      );
  }

  downloadFile(deps: number[], orgType: number[]): void {
    this.http.get(this.BASE_URL+`download/${(deps)}/${(orgType)}`, {
        responseType: 'arraybuffer'
      }
    ).subscribe(response => this.downLoad(response, "application/ms-excel"));
  }

  downLoad(data: any, type: string) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    // @ts-ignore
    a['style'] = "display: none";
    let blob = new Blob([data], {type: type}),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'some.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove()
  }

  postData(data: any) {
    return this.http.post(this.BASE_URL+'send/', data);
  }
}
