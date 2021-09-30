import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../model/department.model';

@Pipe({
  name: 'orgTypeFilter',
  pure: false
})
export class OrgTypeFilterPipe implements PipeTransform {

  transform(departments: any, depTypes: any): any {
    let orgs: number[] = depTypes.filter((value: { checked: any; }) => value.checked)
      .map((value: { depType: any; }) => value.depType);
    return departments.filter((value: Department) => {
      // orgs.includes(value.depType)
      if (value.amountSng > 0 && orgs.includes(0)) {
        return value
      } else if (value.amountBanks > 0 && orgs.includes(1)) {
        return value
      } else if (value.amountNfo > 0 && orgs.includes(2)) {
        return value
      } else if (value.amountBanksBranches > 0 && orgs.includes(3)) {
        return value
      }
      else {
        return null;
      }});

  };
}
