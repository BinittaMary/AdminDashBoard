import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public searchCourseTitle: any = '';
  public searchCourseCategory : any ='';
  registeredUsers : any;
  toDate : any;
  fromDate : any;
  srchTitle ='';
  srchCategory ='';
  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) {
 
   }

  ngOnInit(): void {
    this.courseObj.getCourseRegistrationList()
    .subscribe((users)=>{
      this.registeredUsers = users;
      console.log(this.registeredUsers);
    });
  }



  resetSearch(){
    this.srchTitle='';
    this.srchCategory='';
  }

}
