import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  empList: Array<any> = [];
  editingEmpId: string | null = null;

  constructor(private apiservice: ApiService) {
    this.empForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
    });
  }

  getEmpList() {
    this.apiservice.getEmp().subscribe((res: any) => {
      this.empList = res;
    });
  }

  openForm() {
    this.empForm.reset();
    this.editingEmpId = null;
  }

  saveForm() {
    const formData = this.empForm.value;

    if (this.editingEmpId) {
      this.apiservice.editEmp(this.editingEmpId, formData).subscribe(res => {
        this.getEmpList();
        console.log(res);
      });
    } else {
      this.apiservice.addEmp(formData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.getEmpList();
        }
      });
    }
  }

  deleteEmp(id: string) {
    this.apiservice.deleteEmp(id).subscribe(res => {
      this.getEmpList();
      console.log(res);
    });
  }

  editEmp(data: any) {
    this.empForm.patchValue(data);
    this.editingEmpId = data.id;
  }

  ngOnInit(): void {
    this.getEmpList();
  }
}
