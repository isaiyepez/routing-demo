import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  template: `
    <h3>
      You selected department with id = {{departmentId}}
    </h3>

    <p>
      <button (click)="showOverview()">Overview</button>
      <button (click)="showContact()">Contact</button>
    </p>

    <router-outlet></router-outlet>

    <button (click)="goPrevious()">Previous </button>
    <button (click)="goNext()"> Next</button>

    <div>
      <button (click)="goToDepartments()">Back</button>
    </div>
  `,
  styles: [
  ]
})
export class DepartmentDetailComponent implements OnInit {

  public departmentId;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.departmentId = parseInt(this.route.snapshot.paramMap.get('id'));
    // The line above will not work with the back and previous buttons because with
    // snapshot approach the OnInit is not being called due Angular reuses the component.
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.departmentId = id;
    });
  }

  goPrevious() {
    let previousId = this.departmentId - 1;
    this.router.navigate(['/departments', previousId]);
  }

  goNext() {
    let nextId = this.departmentId + 1;
    this.router.navigate(['/departments', nextId]);
  }

  goToDepartments() {
    let selectedId = this.departmentId ? this.departmentId : null;
    // this.router.navigate(['/departments', {id: selectedId}]);
    this.router.navigate(['../', {id: selectedId}], {relativeTo: this.route});

  }

  showOverview() {
    this.router.navigate(['overview'], { relativeTo: this.route});
  }

  showContact() {
    this.router.navigate(['contact'], {relativeTo: this.route});
  }
}
