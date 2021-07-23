import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  CourseRegstrn= {
    course_id               : '',
    course_title            : '',
    firstname               : '',
    lastname                : '',
    emailaddress            : '',
    phoneno                 : '',
    employed                : '',
    graduation              : '',
    message                 : ''
};

course : any;

RegisterError ={
  error : false,
  errorMsg : ''
};

submitted : boolean=false;

  constructor(public courseObj : CourseService, private _router : Router){ }

  ngOnInit(): void {
    this.submitted = false;

    let courseId = localStorage.getItem("CourseReg");
    
    this.courseObj.getCourse(courseId)
    .subscribe((courseItem)=>{
      this.course =courseItem;
      console.log(this.course);
      this.CourseRegstrn.employed='0';
      this.CourseRegstrn.course_id  = this.course._id;
      this.CourseRegstrn.course_title = this.course.course_title;
      });
  }

  Register(){   
    this.courseObj.courseRegistration(this.CourseRegstrn)
    .subscribe(
      res => {
        console.log(res);
        console.log('success registration');
        this.RegisterError.errorMsg= '';
        this.RegisterError.error = false;
        localStorage.setItem('courseAlertMsg', `Successfully registered for the course ${this.CourseRegstrn.course_title}`); 
        this._router.navigate(['/courses'])
      },
      err => {
        console.log(err); 
        console.log('faliure registration');         
        this.RegisterError.errorMsg= err.error;
        this.RegisterError.error = true;        
      }
    ) 
  }

}
