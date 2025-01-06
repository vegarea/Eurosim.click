export interface DeviceModel {
  name: string;
  compatible: boolean;
}

export interface BrandDevices {
  name: string;
  models: DeviceModel[];
}

export const compatibleDevices: BrandDevices[] = [
  {
    name: "Apple",
    models: [
      { name: "iPhone XR", compatible: true },
      { name: "iPhone XS/XS Max", compatible: true },
      { name: "iPhone 11/11 Pro/11 Pro Max", compatible: true },
      { name: "iPhone SE (2ª y 3ª generación)", compatible: true },
      { name: "iPhone 12 Series", compatible: true },
      { name: "iPhone 13 Series", compatible: true },
      { name: "iPhone 14 Series", compatible: true },
      { name: "iPhone 15 Series", compatible: true },
    ]
  },
  {
    name: "Samsung",
    models: [
      { name: "Galaxy Fold/Z Fold Series", compatible: true },
      { name: "Galaxy Z Flip Series", compatible: true },
      { name: "Galaxy S20 Series", compatible: true },
      { name: "Galaxy Note 20 Series", compatible: true },
      { name: "Galaxy S21 Series", compatible: true },
      { name: "Galaxy S22 Series", compatible: true },
      { name: "Galaxy S23 Series", compatible: true },
      { name: "Galaxy S24 Series", compatible: true },
    ]
  },
  {
    name: "Google",
    models: [
      { name: "Pixel 2/2 XL", compatible: true },
      { name: "Pixel 3/3 XL/3a/3a XL", compatible: true },
      { name: "Pixel 4/4a/4 XL", compatible: true },
      { name: "Pixel 5/5a", compatible: true },
      { name: "Pixel 6/6a/6 Pro", compatible: true },
      { name: "Pixel 7/7a/7 Pro", compatible: true },
      { name: "Pixel 8/8 Pro", compatible: true },
    ]
  }
];