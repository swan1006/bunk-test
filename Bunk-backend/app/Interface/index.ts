export interface ExpenseObj {
    name: string;
    amount: number;
  }
export interface StringArr extends Array<string> {}
export interface ExpenseArr extends Array<ExpenseObj> {}
export interface DividedArr {
    lower: ExpenseArr;
    higher: ExpenseArr;
  }
export interface payouts {
    owes: string;
    owed: string;
    amount: number;
  }
export interface payoutsArr extends Array<payouts> {}
export interface resultObj {
    total: number;
    equalShare: number;
    payouts: payoutsArr;
  }