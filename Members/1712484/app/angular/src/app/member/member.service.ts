import { Injectable } from "@angular/core";
import { Member } from "./member.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class MemberService {
  private members: Member[] = [];
  private memberUpdated = new Subject<Member[]>();

  constructor(private httpClient: HttpClient) {}

  getData() {
      this.httpClient.get<{members: Member[]}>("http://localhost:3000/")
      .subscribe(data => {
          this.members = data.members;
          this.memberUpdated.next([...this.members]);
    })
  }

  getMembers() {
      return this.memberUpdated.asObservable();
  }
}
