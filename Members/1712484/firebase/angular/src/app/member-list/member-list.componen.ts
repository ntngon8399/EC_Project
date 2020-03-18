import { Component } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html"
})
export class MemberListComponent {
  
  memberList = [];

  constructor(){
    this.getMembers();
  }

  async getMembers() {
    try {
      console.log(environment.getMemberList);
      console.log('calling get member list endpoint');

      this.memberList = [];
      const output = await fetch(environment.getMemberList);
      const outputJSON = await output.json();
      this.memberList = outputJSON;
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  }
}
