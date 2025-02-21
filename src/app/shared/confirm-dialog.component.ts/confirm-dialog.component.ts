import { Component , Inject} from '@angular/core';
import { type MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

@Component({
  selector: 'app-confirm-dialog.component.ts',
  imports: [],
  templateUrl: './confirm-dialog.component.ts.component.html',
  styleUrl: './confirm-dialog.component.ts.component.css'
})
export class ConfirmDialogComponentTsComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponentTsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
