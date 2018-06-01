import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { appRoutes } from './routes';

import { InMemoryDataService } from './services/in-memory-data.service';
import { CompanyService } from './services/company.service';

import { AppComponent } from './app.component';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { LogoBlockComponent } from './components/logo-block/logo-block.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TabComponent } from './components/sidebar/tab/tab.component';
import { AddCompanyTabComponent } from './components/sidebar/tab/add-company-tab/add-company-tab.component';

import { PrimaryComponent } from './components/primary/primary.component';
import { DefaultPageComponent } from './components/primary/page/default-page/default-page.component';
import { AddCompanyComponent } from './components/primary/page/add-company/add-company.component';
import { CompanyPageComponent } from './components/primary/page/company-page/company-page.component';
import { StatusBoxComponent } from './components/primary/page/company-page/status-box/status-box.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    LogoBlockComponent,
    SidebarComponent,
    TabComponent,
    AddCompanyTabComponent,
    PrimaryComponent,
    DefaultPageComponent,
    AddCompanyComponent,
    CompanyPageComponent,
    StatusBoxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    InMemoryDataService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
