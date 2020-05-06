import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private apiServices:StudentService) { }

  ngOnInit(): void {
  }
stud:any='';

  public fetchData(){
this.stud=this.apiServices.get();
 
}
  public postValue(){ 
    let student = {
      
      "id":"4",
      "name":"dhamu",
      "course":"cse",
      "grade":"A",
      "address":"chennai",
      "phno":"12345"
  }
    this.apiServices.post(student).subscribe(result => {
         console.log(result);
    });
  }
  public putValue(){
    let customer = {
      "id":"1",
      "name":"arun",
      "course":"cse",
      "grade":"A",
      "address":"madurai",
      "phno":"12345" 
  }
  let id = 1;

    this.apiServices.put(customer,id).subscribe(result => {
      console.log(result);
    });
  }
    public deleteValue(){
      let id = 3;
      this.apiServices.delete(id).subscribe(result => {
        console.log(result);
      });
      
    }
    
      
    }
  


