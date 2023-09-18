import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'comp-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  formState: string = 'Add New';

  constructor(private passwordManagerService: PasswordManagerService, private toastr: ToastrService) {
    this.loadSites();
  }

  resetForm(){
    this.siteName = '';
    this.siteURL = '';
    this.siteImgURL = '';
    this.siteId = '';
    this.formState = 'Add New';
  }

  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addSite(values)
        .then(() => {
          this.toastr.success('Website added successfully !');
          this.resetForm();
        })
        .catch(() => {
          this.toastr.warning('Please try again','Something went wrong !')
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, values)
        .then(() => {
          this.toastr.info('Website edited successfully !');
          this.resetForm();
        })
        .catch(() => {
          this.toastr.warning('Please try again', 'Something went wrong !');
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;
    this.formState = 'Edit';
  }

  deleteSite(id: string) {
    this.passwordManagerService
      .deleteSite(id)
      .then(() => {
        this.toastr.error('Website deleted successfully !');

      })
      .catch(() => {
          this.toastr.warning('Please try again', 'Something went wrong !');
      });
  }

  onCancel() {
    this.resetForm();
  }
}
