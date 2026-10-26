import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { CouponService } from '../../services/coupon';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, QRCodeComponent, IonGrid, IonRow, IonCol, IonText]
})
export class Tab2Page {
  public qrCode = signal<string | null>(null);
  private couponSvc = inject(CouponService);

  async ionViewWillEnter() {
    const coupons = await this.couponSvc.getCoupons();
    const couponsActive = coupons.filter(coupon => coupon.active);
    if (couponsActive.length === 0) {
      this.qrCode.set(null);
      return;
    }

    this.qrCode.set(JSON.stringify(couponsActive));
  }

}
