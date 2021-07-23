import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { TestimonialformComponent } from '../testimonialform/testimonialform.component';
import { TestService } from '../test.service';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  

    testimonials : any;
  
    constructor(private windowService:NbWindowService,private testService:TestService,private router:Router, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
  
        this.testService.gettestimonials().subscribe((data)=>{
          console.log(data);
        this.testimonials=data;
      })
    }
  addTestimonial(){
    this.router.navigate(['../addtestimonial'], { relativeTo: this.route });
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.testimonials, event.previousIndex, event.currentIndex);

  }

  saveTestimonialsIndex(){
    console.log(this.testimonials);
    for(let i= 0; i<this.testimonials.length; i++){
    this.testimonials[i].index=i;  
    this.testimonials.updateCourseIndex(this.testimonials[i])
    .subscribe((testimonials)=>{
      // console.log(course);
    });
  }
 }

 resetTestimonialsIndex(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
 }
  }