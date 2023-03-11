import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CalculatorService } from '../shared/api/calculator.service';

// import fake-db
import TableData from '../../database/database.json';

// import interface
import { UserInterface } from '../shared/models/users';
import { ResultInterface } from '../shared/models/result';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  modalRef?: BsModalRef;

  //table data
  rows: UserInterface[] = TableData;

  // input value
  name: String = '';
  amount: Number = 0;

  //result data
  total: Number = 0;
  equalShare: Number = 0;
  resultRows: ResultInterface[] = [];

  constructor(
    private modalService: BsModalService,
    private calcService: CalculatorService
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  insertUser() {
    let addedData: UserInterface[] = [
      ...this.rows,
      { name: this.name, amount: this.amount },
    ];
    this.rows = addedData;

    this.modalRef?.hide();

    this.amount = 0;
    this.name = '';
  }

  handleSubmit() {
    this.calcService.calculateExpense(this.rows).subscribe((result) => {
      console.log(result);
      
      this.total = result.total;
      this.equalShare = result.equalShare;
      this.resultRows = result.payouts;
    });
  }
}
