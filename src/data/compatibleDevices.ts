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
      { name: "iPhone 16 Series", compatible: true },
      { name: "iPad Pro 11/12.9 (2020+)", compatible: true },
      { name: "iPad Air (2019+)", compatible: true },
      { name: "iPad (2019+)", compatible: true },
      { name: "iPad Mini (2019+)", compatible: true },
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
      { name: "Galaxy A54/A55", compatible: true },
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
      { name: "Pixel 8/8 Pro/8a", compatible: true },
      { name: "Pixel 9 Pro/9 Pro XL", compatible: true },
      { name: "Pixel Fold", compatible: true },
    ]
  },
  {
    name: "Otros",
    models: [
      { name: "Huawei P40/P40 Pro/P40 Pro+", compatible: true },
      { name: "Huawei Mate 40 Pro", compatible: true },
      { name: "Motorola Razr (2019/5G)", compatible: true },
      { name: "OPPO Find X3 Pro", compatible: true },
      { name: "Sony Xperia 10 III Lite", compatible: true },
      { name: "Xiaomi Mi 11 Lite 5G", compatible: true },
      { name: "DOOGEE V30", compatible: true },
      { name: "Fairphone 4", compatible: true },
    ]
  }
];