import { Service } from '@angular/core';
import { Coupon, ICouponData } from '../models/coupon.model';

@Service()
export class CouponService {

  async getCoupons(): Promise<Coupon[]> {
    return await fetch('./assets/data/coupons.json')
      .then(response => response.json())
      .then(data => this.processCoupons(data))
      .catch(error => []);
  }

  processCoupons(couponsData: ICouponData[]): Coupon[] {
    return couponsData.map(data => {
      return new Coupon({
        ...data,
        active: data.active ?? false
      });
    });
  }
}
