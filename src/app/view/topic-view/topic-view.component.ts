import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataServiceService } from '../../api/data-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ReplyListComponent } from './reply-list'
@Component({
  moduleId: module.id,
  selector: 'app-topic-view',
  templateUrl: 'topic-view.component.html',
  providers: [DataServiceService],
  styleUrls: ['topic-view.component.css'],
  directives:[ReplyListComponent]
})
export class TopicViewComponent implements OnInit, OnDestroy {
  public title:string="";
  private sub: Subscription;
  public topic: any = {};
  constructor(
    private api: DataServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let self: TopicViewComponent = this;
    let params:any = {};
    self.sub = this.route.params.subscribe(params => {
       let topId:string = params['id'];
       self.api.getTopic({
         topId: topId,
         mdrender: null,
         accesstoken:null
        }).then(result=>{
          self.topic = result.json().data;
          self.title = self.topic.title;
          self.api.changeTitle(self.topic.title);
        }).catch(Error=>{console.error(Error)})
    });
  }
  submit(){
    this.api.changeTitle(this.topic.title);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
