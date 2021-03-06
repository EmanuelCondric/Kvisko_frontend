import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() confirmQuestion!: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    
  }

  close() {
    this.activeModal.close('Zatvoreno');
  }

  confirm(){
    this.activeModal.close(true);
  }

}

