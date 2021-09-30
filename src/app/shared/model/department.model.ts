export class Department {
  depName: string;
  depNumber: number;
  amountSng: number;
  amountBanks: number;
  amountNfo: number;
  amountBanksBranches: number;

  orgTypes: number[] = []
  checked: boolean = false;


  constructor(depName: string, depNumber: number, amountSng: number,
              amountBanks: number, amountNfo: number, amountBanksBranches: number) {
    this.depName = depName;
    this.depNumber = depNumber;
    this.amountSng = amountSng;
    this.amountBanks = amountBanks;
    this.amountNfo = amountNfo;
    this.amountBanksBranches = amountBanksBranches;
    this.fillOrgTypes(amountSng,amountBanks, amountNfo, amountBanksBranches)
  }

  fillOrgTypes(amountSng: number, amountBanks: number,
               amountNfo: number, amountBanksBranches: number) {
    if (amountSng > 0) {
      this.orgTypes.push(0)
    } else if (amountBanks > 0) {
      this.orgTypes.push(1)
    } else if (amountNfo > 0) {
      this.orgTypes.push(2)
    } else if (amountBanksBranches > 0) {
      this.orgTypes.push(3)
    }
  }
}
