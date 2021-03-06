import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public navSet: Array<any> = NAVS.navSet;
  public currentNav: string = NAVS.nav;
  @Input() isShowNavbar: boolean;
  @Input() isLogin: boolean;
  @Input() loginUser: any;
  @Output() onToggle = new EventEmitter<boolean>();
  @Output() onNavigate = new EventEmitter<string>();
  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    // let tab = this.route.toString(); 
    // debugger
  }
  navigatorTo($event, tab) {
    let title: string = '';
    $event.stopPropagation();
    this.isShowNavbar = false;
    this.onToggle.emit(false);
    switch (tab) {
      case 'all':
        title = '全部';
        break;
      case 'good':
        title = '精华';
        break;
      case 'share':
        title = '分享';
        break;
      case 'ask':
        title = '问答';
        break;
      case 'job':
        title = '招聘';
        break;
      case 'message':
        title = '消息';
        break;
      case 'about':
        title = '关于';
        break;
      case 'perinfo':
        title = '个人信息';
        break;
      case 'newtopic':
        title = '发帖';
        break;
      default:
        title = '全部';
        break;
    }
    this.onNavigate.emit(title);
  }
  login($event) {
    // accessToken   af708afd-582b-4139-b06f-4cc65c7e67ef
    $event.stopPropagation();
    this.router.navigate(['/login']);
    this.onNavigate.emit('登录');
    this.onToggle.emit(false);
  }
  hide() {
    this.isShowNavbar = false;
    this.onToggle.emit(false);
  }
}

const NAVS: any  = {
  nav: 1,
  navSet: [
    [
      {
        icon: '&#xe602;',
        name: '全部',
        view: 'list',
        tab: 'all'
      }, {
        icon: '&#xe605;',
        name: '精华',
        view: 'list',
        tab: 'good'
      }, {
        icon: '&#xe600;',
        name: '分享',
        view: 'list',
        tab: 'share'
      }, {
        icon: '&#xe608;',
        name: '问答',
        view: 'list',
        tab: 'ask'
      }, {
        icon: '&#xe606;',
        name: '招聘',
        view: 'list',
        tab: 'job'
      }],
    [{
      icon: '&#xe607;',
      accessToken: true,
      name: '消息',
      view: 'message'
    }, {
        icon: '&#xe608;',
        name: '关于',
        view: 'about'
      }],
    [{
      icon: '&#xe608;',
      name: '个人信息',
      accessToken: true,
      view: 'perinfo'
    }, {
        icon: '&#xe608;',
        name: '发帖',
        accessToken: true,
        view: 'newtopic'
      }]]
}