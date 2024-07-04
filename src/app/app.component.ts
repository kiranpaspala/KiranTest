//import { NgFor, NgIf } from '@angular/common';
//import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { DataService } from '../data/data';
//import { TableData } from '../data/table';

//@Component({
//  selector: 'app-root',
//  standalone: true,
//  imports: [NgFor, NgIf, FormsModule],
//  templateUrl: './app.component.html',
//  styleUrl: './app.component.scss',
//})
//export class AppComponent {
//  title = 'MOH Test';
//  tableData: TableData | undefined;
//  constructor(private data: DataService) {
//    this.getData();
//  }

//  async getData() {
//    this.tableData = await this.data.getTableData();
//    console.log(this.tableData);
//  }
//}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe, formatDate as angularFormatDate } from '@angular/common';
import { DataService } from '../data/data';
import { TableData, Header } from '../data/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MOH Test';
  tableData: TableData | undefined;

  constructor(private data: DataService) {
    this.getData();
  }

  async getData() {
    this.tableData = await this.data.getTableData();
    console.log(this.tableData);
  }

  formatDate(date: string, format: string): string {
    return angularFormatDate(new Date(date), format, 'en-US');
  }

  getDropdownText(options: { value: number; displayText: string }[], value: number): string {
    const option = options.find(option => option.value === value);
    return option ? option.displayText : '';
  }

  isDateTimeHeader(header: Header): header is Header & { uiType: 'dateTime'; format: string } {
    return header.uiType === 'dateTime';
  }

  isDropdownHeader(header: Header): header is Header & { uiType: 'dropdown'; options: { value: number; displayText: string }[] } {
    return header.uiType === 'dropdown';
  }
}

