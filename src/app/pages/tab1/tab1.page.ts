import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { Coupon } from '../../models/coupon.model';
import { CouponService } from '../../services/coupon';
import { FilterCouponCategoryPipe } from '../../pipes/filter-coupon-category-pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSegmentView,
    IonSegmentContent,
    FilterCouponCategoryPipe,
    JsonPipe,
  ],
})
export class Tab1Page {
  couponSvc = inject(CouponService);
  coupons: Coupon[] = [];

  async ionViewWillEnter() {
    this.coupons = await this.couponSvc.getCoupons();
    console.log(this.coupons);
  }
}
