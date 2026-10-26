import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { Coupon } from '../../models/coupon.model';
import { CouponService } from '../../services/coupon';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  couponSvc = inject(CouponService);
  coupons: Coupon[] = [];

  async ionViewWillEnter() {
    this.coupons = await this.couponSvc.getCoupons();
    console.log(this.coupons);
  }
}
