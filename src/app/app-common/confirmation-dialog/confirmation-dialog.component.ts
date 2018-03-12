import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ConfirmationDialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>
  ) { }

  ngOnInit() {
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
