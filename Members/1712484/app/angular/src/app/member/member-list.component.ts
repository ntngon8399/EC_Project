import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { MemberService } from './member.service';
import { Member } from './member.model';

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html"
})
export class MemberListComponent implements OnInit, OnDestroy{
  members: Member[] = [];
  private memberSub : Subscription;

  constructor(private memberService: MemberService){};

  ngOnInit() {
    this.memberService.getData();
    this.memberSub = this.memberService.getMembers()
    .subscribe((members: Member[]) => {
      this.members = members;
    })
  }

  ngOnDestroy() {
    this.memberSub.unsubscribe();
  }
}
