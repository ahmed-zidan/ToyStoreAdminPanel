import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalPages =6 ;
  //@Input() end = 2;
  @Input() currActive = 1;
  items:number[] = [];
  ngOnInit(): void {
    let start = this.totalPages-5 >0 ?this.totalPages-5 : 0;
    let end =  this.currActive+5 > this.totalPages ? this.totalPages : this.currActive+5;
    for(let i = start;i<end;i++){
      this.items.push(i+1);
    }
  }

  pageIdxChange(item:number){
    this.pageChanged.emit(item);
  }
  increaseOrDecreas(currActive:number){
    this.pageChanged.emit(currActive);
  }


}
