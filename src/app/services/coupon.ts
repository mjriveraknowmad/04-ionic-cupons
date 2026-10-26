import { Service } from '@angular/core';
import { Coupon, ICouponData } from '../models/coupon.model';
import { Preferences } from '@capacitor/preferences';

@Service()
export class CouponService {
  private readonly COUPONS_KEY = 'mjrs-ionic-coupons';

  async getCoupons(): Promise<Coupon[]> {
    const storedCoupons = await this.recoverCoupons();
    if (storedCoupons.length > 0) {
      return storedCoupons;
    }
    return await fetch('./assets/data/coupons.json')
      .then((response) => response.json())
      .then((data) => this.processCoupons(data))
      .catch((error) => []);
  }

  private processCoupons(couponsData: ICouponData[]): Coupon[] {
    return couponsData.map((data) => {
      return new Coupon({
        ...data,
        active: data.active ?? false,
      });
    });
  }

  public saveCoupons(coupons: Coupon[]) {
    const couponsData: ICouponData[] = coupons.map((coupon: Coupon) =>
      coupon.toCouponData()
    );
    Preferences.set({
      key: this.COUPONS_KEY,
      value: JSON.stringify(couponsData),
    });
  }

  public recoverCoupons(): Promise<Coupon[]> {
    return Preferences.get({ key: this.COUPONS_KEY })
      .then((result) => {
        const couponsData: ICouponData[] = result.value
          ? JSON.parse(result.value)
          : [];
        return this.processCoupons(couponsData);
      })
      .catch((error) => []);
  }
}
