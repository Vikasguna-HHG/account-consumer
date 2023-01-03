import { AfterViewInit, Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { ApisService } from '../apis.service';


class getAll {
  sapaccountnumber: any;
  accountdefinition: any;
  sapaccountname: any;
}


@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  getAll!: getAll[];
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  constructor(private Apis: ApisService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };


    // this.Apis.GetData().subscribe((res: any) => {
    //   console.log(res.data);
    //    this.getAll = res.data;
    //    this.dtTrigger.next(this.getAll);
    // });

    setTimeout(() => {
      this.getAll = this.Apis.GetDataJson().result;
      this.dtTrigger.next(this.getAll);
    });



  }

  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.header()).on('keyup change', function (e) {
            if (that.search() !== (this as HTMLInputElement).value) {
              that.search((this as HTMLInputElement).value).draw();
            }
          });
        });
      });
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

}
