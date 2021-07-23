import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'ngx-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  course ={
    course_title            : '',
    course_image            : '',
    course_short_desc       : '',
    Reg_Status              : 1,
    Category                : '',
    Rating                  : 5,
    about_course            : '',
    dates                   : '' ,
    eligibility             : '',
    course_fee              : '',
    entrance_details        : '',
    refund_policy           : '',
    course_delivery         : '',
    internship_partner      : '',
    knowledge_partner       : '',
    sponser_partner         : '',
    index                   : 0,
    active                  : true 
  }
  images :any= [];

  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }
  alertm(){
    // this.router.navigate(['../viewcourse'], { relativeTo: this.route });
  }
  closeForm(){
    this.router.navigate(['../courses'], { relativeTo: this.route });    
  }
  AddCourse()
  {
    this.course.course_delivery = this.course.course_delivery.replace('C:\\fakepath\\','');
    this.course.internship_partner = this.course.internship_partner.replace('C:\\fakepath\\','');
    this.course.knowledge_partner = this.course.knowledge_partner.replace('C:\\fakepath\\','');
    this.course.sponser_partner = this.course.sponser_partner.replace('C:\\fakepath\\','');
    this.course.course_image = this.course.course_image.replace('C:\\fakepath\\','');
    console.log(this.course)
    this.courseObj.newCourse(this.images, this.course);
    // localStorage.setItem('bookAlertMsg', `The book ${this.course.title} is added`); 
    // this.router.navigate(['../courses'], { relativeTo: this.route }); 
  }

  selectImage(event : any) {
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images.push(file);
      console.log('inside if event')
    }    
  }
}
