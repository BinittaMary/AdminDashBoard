import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient) { }

  item={
    name:"",
    designation:"",
    email:"",
    image:""
  }

  getstaffs(){
    return this.http.get("http://localhost:5000/staffs");
  }


  newStaff(image:any,item:any){

    console.log('inside service upload')
    const formData = new FormData();
    formData.append('file', image);  
    formData.append('name', item.name); 
    formData.append('designation', item.designation); 
    formData.append('email', item.email); 
    formData.append('image', item.image); 
     

    return this.http.post("http://localhost:5000/insert",formData)
    .subscribe(data =>{console.log(data)})
  }

  updateStaffIndex(staff:any){
    return this.http.put("http://localhost:5000/Course/updateStaffIndex/",staff);
  };

}
