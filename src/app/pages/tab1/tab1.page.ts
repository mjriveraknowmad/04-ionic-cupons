import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
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
  IonItem,
  IonIcon,
} from '@ionic/angular';
import { Coupon, ICouponData } from '../../models/coupon.model';
import { FilterCouponCategoryPipe } from '../../pipes/filter-coupon-category-pipe';
import { CouponService } from '../../services/coupon';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner'

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
    IonRow,
    IonCol,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    NgTemplateOutlet,
    IonItem,
    IonIcon,
  ],
})
export class Tab1Page {
  couponSvc = inject(CouponService);
  coupons = signal<Coupon[]>([]);

  constructor() {
    addIcons({
      cameraOutline,
    });
  }

  async ionViewWillEnter() {
    this.coupons.set(await this.couponSvc.getCoupons());
    console.log(this.coupons());
  }

  changeActiveCoupon(coupon: Coupon) {
    coupon.active = !coupon.active;
    this.couponSvc.saveCoupons(this.coupons());
  }

  startCamera() {
    // https://www.the-qrcode-generator.com/ para generar códigos QR de prueba
    CapacitorBarcodeScanner
    .scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE
    })
    .then(result => {
      if (result.ScanResult) {
        try{
          const couponData: ICouponData = JSON.parse(result.ScanResult);
          const coupon = new Coupon(couponData);
          const notIsValidOrBeforeAdded = !coupon.isValid() || this.coupons().some(c => c.idProduct === coupon.idProduct);
          if(notIsValidOrBeforeAdded){
            console.warn('El cupón no es válido o ya ha sido agregado anteriormente');
            return;
          }
          this.coupons.update(coupons => [...coupons, coupon]);
          this.couponSvc.saveCoupons(this.coupons());
          console.log('Cupón agregado correctamente');
        } catch (error) {
          console.error('Error parsing QR code:', error);
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }
}
