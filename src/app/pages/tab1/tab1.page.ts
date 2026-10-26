import { Component, inject } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { Coupon } from '../../models/coupon.model';
import { FilterCouponCategoryPipe } from '../../pipes/filter-coupon-category-pipe';
import { CouponService } from '../../services/coupon';

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
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
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
