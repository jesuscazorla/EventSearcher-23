import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchNotFoundComponent } from './search-not-found/search-not-found.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import { EventComponent } from './event/event.component';
import { EventClassificationComponent } from './event-classification/event-classification.component';
import { EventpriceComponent } from './eventprice/eventprice.component';
import { EventListComponent } from './event-list/event-list.component';
import { MockeventapiService } from './services/mockeventapi.service';
import { EventService } from './services/event.service';
import { MatPaginatorModule }   from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventDetailComponent } from './event-detail/event-detail.component';


@NgModule({
    declarations: [
        AppComponent,
        DeleteDialogComponent,
        HeaderComponent,
        SearchNotFoundComponent,
        EventComponent,
        EventClassificationComponent,
        EventpriceComponent,
        EventListComponent,
        LogInComponent,
        SignUpComponent,
        NotFoundComponent,
        EventDetailComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatSidenavModule,
        HttpClientModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        DragDropModule,
        MatTabsModule,
        MatPaginatorModule,
        CommonModule
    ],
    //Select between Mock and Remote APIs
    providers: [
        { provide: EventService, useClass:MockeventapiService },
        ],
    bootstrap: [AppComponent],
})
export class AppModule {}
