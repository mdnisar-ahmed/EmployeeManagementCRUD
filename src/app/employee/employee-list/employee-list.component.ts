import { Component, type OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import type { MatDialog } from "@angular/material/dialog"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { Employee } from "../../shared/employee.model"
import type { EmployeeService } from "../employee.service"
import { EmployeeFormDialogComponent } from "../employee-form-dialog/employee-form-dialog.component"
import { ConfirmDialogComponent } from "../../shared/confirm-dialog.component.ts"

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ["firstName", "lastName", "email", "position", "actions"]
  dataSource!: MatTableDataSource<Employee>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator
  @ViewChild(MatSort)
  sort!: MatSort

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadEmployees()
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.dataSource = new MatTableDataSource(employees)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      (error) => {
        console.error("Error loading employees", error)
        this.showSnackBar("Error loading employees")
      },
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  openEmployeeDialog(employee?: Employee) {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: "400px",
      data: employee || {},
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.updateEmployee(result)
        } else {
          this.addEmployee(result)
        }
      }
    })
  }

  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee).subscribe(
      () => {
        this.loadEmployees()
        this.showSnackBar("Employee added successfully")
      },
      (error) => {
        console.error("Error adding employee", error)
        this.showSnackBar("Error adding employee")
      },
    )
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(
      () => {
        this.loadEmployees()
        this.showSnackBar("Employee updated successfully")
      },
      (error) => {
        console.error("Error updating employee", error)
        this.showSnackBar("Error updating employee")
      },
    )
  }

  deleteEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: { message: "Are you sure you want to delete this employee?" },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.deleteEmployee(employee.id).subscribe(
          () => {
            this.loadEmployees()
            this.showSnackBar("Employee deleted successfully")
          },
          (error) => {
            console.error("Error deleting employee", error)
            this.showSnackBar("Error deleting employee")
          },
        )
      }
    })
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    })
  }
}

