import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { Charge, Source } from '../../_shared/models/payment.model';
import { PaymentService } from '../../_shared/services/payment.service';
import { ShopService } from '../../_shared/services/shop.service';

@Component({
  selector: 'shop-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class ShopPaymentComponent implements AfterViewInit, OnDestroy {
  @Input()
  paymentAmount;
  @Input()
  paymentMetadata = {};
  @Output()
  stripeResult = new EventEmitter<Charge | Source>();

  // Result used locacally to display status.
  result: Charge | Source | Error | any = null;

  // The Stripe Elements Card
  @ViewChild('cardElement')
  cardElement: ElementRef;
  card: any;
  email = '';
  name = '';
  ref = '';
  formError: string;
  formComplete = false;
  purchaseComplete = false;

  // State of async activity
  loading = false;

  constructor(
    private cd: ChangeDetectorRef,
    private shopService: ShopService,
    public paymentService: PaymentService
  ) {}

  ngAfterViewInit() {
    this.card = this.paymentService.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    // Listens to change event on the card for validation errors
    this.card.on('change', evt => {
      this.formError = evt.error ? evt.error.message : null;
      this.formComplete = evt.complete;
      this.cd.detectChanges();
    });
  }
  // Called when the user submits the form
  formHandler(): void {
    if (!this.loading) {
      this.loading = true;
      let action;
      const basket = this.shopService.orderConfirm(this.email, this.name, this.ref);
      if (this.paymentAmount) {
        action = this.paymentService.createPayment(
          this.card,
          this.paymentAmount,
          this.email,
          this.name,
          '£' + this.paymentAmount / 100 + ' Spa Voucher Shop',
          this.paymentMetadata
        );
      }

      action.subscribe(
        data => {
          this.result = data;
          this.shopService.orderPayment(data.id);
          this.stripeResult.emit(data);
          this.loading = false;
          this.purchaseComplete = true;
        },
        err => {
          this.result = err;
          this.loading = false;
        }
      );
    }
  }

  ngOnDestroy() {
    this.card.destroy();
  }
}
