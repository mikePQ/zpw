import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-admin-add-image',
  templateUrl: './admin-add-image.component.html',
  styleUrls: ['./admin-add-image.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddImageComponent implements OnInit {

  uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/images'});

  constructor() {
  }

  ngOnInit() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status);
      console.log(response);
      let response2 = JSON.parse(response);
      alert(response2.filePath);
    };
  }

}
