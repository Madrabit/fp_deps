import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/model/department.model';
import { HttpDepartment } from '../shared/service/http-department.service';
import { Employee } from '../shared/model/employee';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {

  public result: string = '';

  public depTypes = [
    {depType: 0, name: 'Банки СНГ', checked: false},
    {depType: 1, name: 'Банки', checked: false},
    {depType: 2, name: 'НФО', checked: false},
    {depType: 3, name: 'Филиалы Банков', checked: false}
  ];

  public departments: Department[] = [];
  public employeeList: Employee[] = [];

  public email: string = '';

  emailForm!: FormGroup;

  emailInput: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private httpDepartment: HttpDepartment, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.httpDepartment.getChecked().subscribe(data => {
      // @ts-ignore
      let checkedDeps = JSON.parse(data.deps).map(Number);
      // @ts-ignore
      let checkedOrgs = JSON.parse(data.orgTypes).map(Number);
      this.httpDepartment.getDepartments().subscribe(data => data.map(dep => {
        if (checkedDeps.includes(dep.depNumber)) {
          dep.checked = true
        }
        this.departments.push(dep)

      }));
      this.depTypes.map(value => {
        if (checkedOrgs.includes(value.depType)) {
          value.checked = true
        }
      })
    })

    this.depsToString();

    this.emailForm = this.formBuilder.group({
      email : this.emailInput,
      deps : [],
      orgTypes: []
    });
  }

  public depsToString() {
    this.result = this.departments.filter(value => value.checked).map(value => ' ' + value.depNumber).toString();
  }

  public sumOfChecked() {
    let orgs: number[] = this.depTypes.filter((value: { checked: any; }) => value.checked)
      .map((value: { depType: any; }) => value.depType);
    let filteredDeps = this.departments.filter(value => value.checked);
    let sum = 0;
    for (let filteredDep of filteredDeps) {
      if (orgs.includes(0)) sum += filteredDep.amountSng
      if (orgs.includes(1)) sum += filteredDep.amountBanks
      if (orgs.includes(2)) sum += filteredDep.amountNfo
      if (orgs.includes(3)) sum += filteredDep.amountBanksBranches
    }
    return sum;
  }

  downloadEmp() {
    let deps = this.departments.filter(value => value.checked).map(value => value.depNumber);
    let orgTypes = this.depTypes.filter(value => value.checked).map(value => value.depType);
    this.httpDepartment.getEmpList(deps, orgTypes)
      .subscribe(data => data.map(emp => {
        this.employeeList.push(emp)
        console.log(emp)
      }));
  }

  downloadEmpsFile() {
    let deps = this.departments.filter(value => value.checked).map(value => value.depNumber);
    let orgTypes = this.depTypes.filter(value => value.checked).map(value => value.depType);
    this.httpDepartment.downloadFile(deps, orgTypes);
  };

  changeOrgType($event: any, i: number) {
    if (!$event.checked) {
      this.departments
        .map(value => value.checked = false)
      this.depsToString();
      this.sumOfChecked();
    }
  }

  submit() {
    this.emailForm.value.deps = this.departments.filter(value => value.checked).map(value => value.depNumber);
    this.emailForm.value.orgTypes = this.depTypes.filter(value => value.checked).map(value => value.depType);
    console.log(this.emailForm)


    this.httpDepartment.postData(this.emailForm.value)
      .subscribe(
        (data: any) => {
          data
        },
        error => console.log(error)
      );
  }

  getErrorMessage() {
    if (this.emailInput.hasError('required')) {
      return 'Введите email';
    }
    return this.emailInput.hasError('email') ? 'Неверно введен email' : '';
  }
}
