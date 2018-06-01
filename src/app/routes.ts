import { Routes } from '@angular/router';

import { DefaultPageComponent } from './components/primary/page/default-page/default-page.component';
import { AddCompanyComponent } from './components/primary/page/add-company/add-company.component';
import { CompanyPageComponent } from './components/primary/page/company-page/company-page.component';

export const appRoutes: Routes = [
  { path: '',
    component: DefaultPageComponent
  },
  { path: 'add-company',
    component: AddCompanyComponent
  },
  { path: 'company/:id',
    component: CompanyPageComponent
  }
  //maybe add 404?
];
