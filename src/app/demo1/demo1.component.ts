import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  constructor(
  ) { }
  ngOnInit() {
    let destPath = 'https://raw.githubusercontent.com/l-lin/angular-datatables/master/demo/src/data/data.json';
    let datatableElement = this.datatableElement;

    this.dtOptions = {
      ajax: destPath,
      columns: [{
        title: 'ID',
        render: function (data: any, type: any, row: any) {
          return '<a target="_blank" href="http://www.uniprot.org/uniprot/' + row["id"] + '">' + row["id"] + '</a>';
        }
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        render: function (data: any, type: any, row: any, meta: any) {
          if (row["lastName"].trim().length > 0) {
            var array = (row["lastName"].trim()).split('<br>');
            array.forEach(function (element: any, index: any) {
              array[index] = '<button routerLinkActive="active" seq-link-id=' + element + '>' + element + '</button>';
            });
            return array.join("<br>");
          } else {
            return 'No';
          }
        }
      }, {
        title: 'Search Last name',
        data: 'lastName'
      }

      ],
      // Declare the use of the extension in the dom parameter
      dom: 'lBrtip',
      // Configure the buttons
      buttons: [
        'colvis'
      ],
      orderCellsTop: true,
      scrollX: true,
      scrollY: 300,
      scrollCollapse: true,
      initComplete: function () {
        var api = this.api();
        // Setup - add a text input to each header cell
        $('.filterhead', api.table().header()).each(function () {
          var title = $(this).text();
          $(this).html('<input type="text" placeholder="Search ' + title + '" class="column_search" />');
        });

      }
    };
    console.log(datatableElement);
  }

  ngAfterViewInit(): void {
    listenGlobal('document', 'click', (event: any) => {
      if (event.target.hasAttribute("seq-link-id")) {
        let protvistaQuery = event.target.getAttribute("seq-link-id");
        window.open('https://www.google.ca/', '_blank');
      }
    });

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        console.log('test');
        var table = $("#example").DataTable();
        $('table thead').on('keyup', ".column_search", function () {

          table
            .column($(this).parent().index())
            .search(this.value)
            .draw();
        });
      });
    });

  }


  ngOnDestroy() {
  }

}
function listenGlobal(arg0: string, arg1: string, arg2: (event: any) => void) {
  throw new Error('Function not implemented.');
}

