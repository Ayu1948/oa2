import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../team.service';
import { Employee, Department, EmpInDep } from '../team';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-team-employee',
    templateUrl: './team-employee.component.html',
    styleUrls: ['./team-employee.component.less']
})
export class TeamEmployeeComponent implements OnInit {

    empList: Employee[];
    depList: Department[];
    empInDepList: EmpInDep[];
    @Input() emp: Employee = null;
    sexValue = '男';
    // constructor(private teamService: TeamService) { }

    getEmpList(): void {
        this.teamService.getEmpList()
            .subscribe((empList: Employee[]) => {
                this.empList = empList;
                console.log(empList)
            });
        // this.empList = this.teamService.getEmpList();
    }

    getDepList(): void {
        this.teamService.getDepList()
            .subscribe((depList: Department[]) => this.depList = depList);
    }

    getEmpInDep(): void {
        this.teamService.getEmpInDep()
            .subscribe((empInDepList: EmpInDep[]) => this.empInDepList = empInDepList);
    }
    getEmpId(id: number): void {
        this.emp = null;
        this.teamService.getEmpId(id)
            .subscribe((emp: Employee) => this.emp = emp);
    }

    validateForm: FormGroup;
    submitForm = ($event: any, value: any) => {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        console.log(this.emp)
        console.log(value);
        console.log(!(this.emp.name === value.name));
        console.log(!(this.emp.birth === value.birth));
        console.log(!(this.emp.department === value.department));
        console.log(!(this.emp.sex === value.sex));
        console.log(!(this.emp.position === value.position));
        if (
            !(this.emp.name === value.name) ||
            !(this.emp.birth === value.birth) ||
            !(this.emp.department === value.department) ||
            !(this.emp.sex === value.sex) ||
            !(this.emp.position === value.position)
        ) {
            this.saveEmp(value);
        } else {
            console.log("没有更改数据，不提交")
        }
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }

    saveEmp(data): void {
        const index = this.empList.findIndex(item => item.id === data.id);
        Object.assign(this.empList[index], data);
        console.log("提交成功");
    }

    // 表单验证

    // id
    // userIdAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors | null>) => {
    //     setTimeout(() => {
    //         let red = false;
    //         // for(let emp of this.empList) {
    //         //     if (emp.id === control.value) {
    //         //         red = true;
    //         //         break;
    //         //     }
    //         // };
    //         if (red) {
    //             observer.next({ error: true, duplicated: true });
    //         } else {
    //             observer.next(null);
    //         }
    //         observer.complete();
    //     }, 1000);
    // })
    // name
    nameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors | null>) => {
        setTimeout(() => {
            if (control.value === 'JasonWood') {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 1000);
    })

    // confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    //     if (!control.value) {
    //         return { required: true };
    //     } else if (control.value !== this.validateForm.controls.password.value) {
    //         return { confirm: true, error: true };
    //     }
    //     return {};
    // }

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private teamService: TeamService,
        private fb: FormBuilder
    ) {
        this.validateForm = this.fb.group({
            id: ['', [Validators.required]],
            name: ['', [Validators.required], [this.nameAsyncValidator]],
            sex: ['', [Validators.required]],
            birth: ['', [Validators.required]],
            // email: ['', [Validators.email, Validators.required]],
            department: ['', [Validators.required]],
            position: ['', [Validators.required]]
        });
    }
    getEmpUrl(): void {
        // this.emp = null;
        const id = +this.route.snapshot.paramMap.get('id');
        if (id !== 0) {
            this.getEmpId(id);
        }
    }


    // 向服务器主动发送消息
    sendMessagegToServer() {
        this.teamService.sendMess("这是客户端发过来的消息");
    }

    ngOnInit() {
        // 订阅服务器发来消息产生的流
        this.teamService.creatObservableSocket("ws://localhost:8085")
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log("流已经结束")
            )
        this.getEmpList();
        this.getDepList();
        this.getEmpInDep();
        this.getEmpUrl();
    }
}
