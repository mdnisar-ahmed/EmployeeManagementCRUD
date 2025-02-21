import { Component,Inject } from '@angular/core';
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { type MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import type { Employee } from "../../shared/employee.model";

@Component({
  selector: 'app-employee-form-dialog',
  imports: [],
  templateUrl: './employee-form-dialog.component.html',
  styleUrl: './employee-form-dialog.component.css'
})
export class EmployeeFormDialogComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employeeForm = this.fb.group({
      id: [data.id],
      firstName: [data.firstName || '', Validators.required],
      lastName: [data.lastName || '', Validators.required],
      email: [data.email || '', [Validators.required, Validators.email]],
      position: [data.position || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value)
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
