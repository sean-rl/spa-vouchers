import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  // MatBadgeModule,
  // MatCardModule,
  // MatDatepickerModule,
  MatDialogModule,
  // MatExpansionModule,
  MatFormFieldModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  // MatSidenavModule,
  // MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  // MatTooltipModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  // MatChipsModule,
  // MatAutocompleteModule,
  MatCheckboxModule,
  MatMenuModule,
  MatAutocompleteModule,
  // MatBottomSheetModule,
  // MatNativeDateModule,
  // MatTableModule,
  // MatSortModule
} from '@angular/material';
import { MatRippleModule } from '@angular/material';
// import { A11yModule } from '@angular/cdk/a11y';
// import { BidiModule } from '@angular/cdk/bidi';
// import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
// import { PortalModule } from '@angular/cdk/portal';
import { LayoutModule } from '@angular/cdk/layout';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    // MatMomentDateModule,
  ],
  exports: [
    // MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
    // MatButtonToggleModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatCardModule,
    MatCheckboxModule,
    // MatChipsModule,
    // MatTableModule,
    // MatTableModule,
    // MatDatepickerModule,
    MatDialogModule,
    // MatExpansionModule,
    MatFormFieldModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    MatProgressSpinnerModule,
    // MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    // MatSidenavModule,
    // MatSortModule,
    // MatSlideToggleModule,
    // MatSliderModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    // MatTooltipModule,
    // MatNativeDateModule,
    // CdkTableModule,
    // A11yModule,
    // BidiModule,
    ObserversModule,
    // OverlayModule,
    PlatformModule,
    // PortalModule,
    LayoutModule,
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }
  ]
})
export class AppMaterialModule {}
