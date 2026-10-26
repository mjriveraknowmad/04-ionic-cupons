export interface ICouponData {
  idProduct: number;
  name: string;
  img: string;
  category: string;
  discount: number;
  active?: boolean;
}

export class Coupon {
  private _idProduct!: number;
  private _name!: string;
  private _img!: string;
  private _category!: string;
  private _discount!: number;
  private _active!: boolean;

  constructor(data: ICouponData) {
    // this._idProduct = data.idProduct;
    // this._img = data.img;
    // this._category = data.category;
    // this._discount = data.discount;
    // this._active = data.active ?? false;
    Object.assign(this, data); // Usa los setters para asignar los valores del objeto data
  }

  public get idProduct(): number {
    return this._idProduct;
  }
  public set idProduct(value: number) {
    this._idProduct = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get img(): string {
    return this._img;
  }
  public set img(value: string) {
    this._img = value;
  }
  public get category(): string {
    return this._category;
  }
  public set category(value: string) {
    this._category = value;
  }
  public get discount(): number {
    return this._discount;
  }
  public set discount(value: number) {
    this._discount = value;
  }
  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

  isEqual(other: Coupon): boolean {
    return this.idProduct === other.idProduct;
  }

  isValid(): boolean {
    return !!(this._idProduct && this._name && this.discount && this._category);
  }

  toCouponData(): ICouponData {
    return {
      idProduct: this._idProduct,
      name: this._name,
      img: this._img,
      category: this._category,
      discount: this._discount,
      active: this._active
    };
  }
}
