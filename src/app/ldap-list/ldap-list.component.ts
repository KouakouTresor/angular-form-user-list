import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'email', 'Action'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any; 
  
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter)
    this.getUsers()
  }
  
  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit()');
    console.log("Mat Paginator:", this.paginator);
  }
  
  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
   }
 
   applyFilter($event: KeyboardEvent): void {
     const filterValue = ($event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   unactiveSelected = false;

   private getUsers(): void {
    this.usersService.getUsers().subscribe(
      users=>{
        if(this.unactiveSelected){
          this.dataSource.data = users.filter(user=>
            user.active === false
            );
        } else {
          this.dataSource.data = users
        }
      }
    );
  }

    unactivedChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(id: number){
    this.router.navigate(['/users', id]).then((e)=>{
      if(!e){
        console.log('Navigation has failed!');
      }
    });
  
  }  
  addUser(){
    this.router.navigate(['/users/add']).then((e)=>{
      if(!e){
        console.log('Navigations has failed')
      }
    })
  }
}
