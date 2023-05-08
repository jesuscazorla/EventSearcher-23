import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumCircleComponent } from './num-circle/num-circle.component';
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
import { MenuComponent } from './menu/menu.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import { EventComponent } from './event/event.component';
import { EventClassificationComponent } from './event-classification/event-classification.component';
import { EventpriceComponent } from './eventprice/eventprice.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { MockeventapiService } from './services/mockeventapi.service';
import { EventService } from './services/event.service';
import { MatPaginatorModule }   from '@angular/material/paginator';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        NumCircleComponent,
        DeleteDialogComponent,
        HeaderComponent,
        MenuComponent,
        NotFoundComponent,
        AutocompleteComponent,
        EventComponent,
        EventClassificationComponent,
        EventpriceComponent,
        NavigationbarComponent
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
