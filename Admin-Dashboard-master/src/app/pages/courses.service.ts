import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public http : HttpClient) { }

  getCourses(){
    return this.http.get('http://localhost:5000/CourseList')
  };

  getCourse(id:any){
    return this.http.get("http://localhost:5000/Course/"+id);
  };

  updateCourseIndex(course:any){
    return this.http.put("http://localhost:5000/Course/updateIndex/",course);
  };
}
