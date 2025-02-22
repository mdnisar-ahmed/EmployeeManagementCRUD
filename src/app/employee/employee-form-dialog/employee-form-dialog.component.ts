import { Component,Inject } from '@angular/core';
import {  FormBuilder,FormGroup, Validators } from "@angular/forms"
import {  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import type { Employee } from "../../shared/employee.model";
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form-dialog',
  imports: [CommonModule, MatDialogModule,MatFormFieldModule,MatInputModule,MatError,ReactiveFormsModule],
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
