import { Component, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonText, Platform } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { CouponService } from '../../services/coupon';
import { ScreenBrightness, GetBrightnessReturnValue } from '@capacitor-community/screen-brightness';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, QRCodeComponent, IonGrid, IonRow, IonCol, IonText]
})
export class Tab2Page {
  public qrCode = signal<string | null>(null);
  private curretBrightness!: GetBrightnessReturnValue;

  private platform = inject(Platform);
  private couponSvc = inject(CouponService);

  async ionViewWillEnter() {
    await this.setBrightnessToMax();
    const coupons = await this.couponSvc.getCoupons();
    const couponsActive = coupons.filter(coupon => coupon.active);
    if (couponsActive.length === 0) {
      this.qrCode.set(null);
      return;
    }

    this.qrCode.set(JSON.stringify(couponsActive));
  }

  async ionViewDidLeave() {
    await this.restoreBrightness();
  }

  async setBrightnessToMax() {
    if (this.platform.is('capacitor')) {
      this.curretBrightness = await ScreenBrightness.getBrightness();
      await ScreenBrightness.setBrightness({ brightness: 1 });
    }
  }

  async restoreBrightness() {
    if (this.platform.is('capacitor') && this.curretBrightness) {
      await ScreenBrightness.setBrightness({ brightness: this.curretBrightness.brightness });
    }
  }

}
