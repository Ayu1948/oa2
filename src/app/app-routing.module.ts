import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SealRecordComponent } from './seal/seal-record/seal-record.component';
import { TeamDepartmentComponent } from './team/team-department/team-department.component';
import { TeamEmployeeComponent } from './team/team-employee/team-employee.component';
import { AttenceRecordComponent } from './attence/attence-record/attence-record.component';
import { AttenceCalendarComponent } from './attence/attence-calendar/attence-calendar.component';
import { AttenceSignComponent } from './attence/attence-sign/attence-sign.component';

const routes: Routes = [
    {
        path: 'seal-record',
        component: SealRecordComponent,
        data: {
            breadcrumb: '/ seal-record'
        }
    }, {
        path: 'team-department',
        component: TeamDepartmentComponent,
        data: {
            breadcrumb: '/ team-department'
        }
    }, {
        path: 'team-employee',
        component: TeamEmployeeComponent,
        data: {
            breadcrumb: '/ team-employee'
        }
    }, {
        path: 'team-employee/:id',
        component: TeamEmployeeComponent,
        data: {
            breadcrumb: '/ team-employee'
        }
    }, {
        path: 'attence-record',
        component: AttenceRecordComponent,
        data: {
            breadcrumb: '/ attence-record'
        }
    }, {
        path: 'attence-calendar',
        component: AttenceCalendarComponent,
        data: {
            breadcrumb: '/ attence-calendar'
        }
    }, {
        path: 'attence-sign',
        component: AttenceSignComponent,
        data: {
            breadcrumb: '/ attence-sign'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
