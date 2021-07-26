import { Component, OnInit } from '@angular/core';

import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { StaffFormComponent } from '../staff-form/staff-form.component';
import { ViewCourseComponent } from '../view-course/view-course.component';

import { ActivatedRoute,Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,  NbCheckboxComponent  } from '@nebular/theme';
import { StaffService } from '../staff.service';

@Component({
  selector: 'ngx-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {

  staffs :any;

  constructor(private windowService:NbWindowService, private staffService:StaffService, private router:Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.staffService.getstaffs().subscribe((data)=>{
      this.staffs=data;
    })
  }

  addStaff() {
    this.router.navigate(['../addstaff'], { relativeTo: this.route });
  }
  
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.staffs, event.previousIndex, event.currentIndex);
  }

  saveStaffIndex(){
    console.log(this.staffs);
    for(let i= 0; i<this.staffs.length; i++){
    this.staffs[i].index=i;  
    this.staffService.updateStaffIndex(this.staffs[i])
    .subscribe((course)=>{
      // console.log(course);
    });
  }
 }

 resetStaffIndex(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
 }
}
