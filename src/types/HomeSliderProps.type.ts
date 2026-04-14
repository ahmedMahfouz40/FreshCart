interface SlideButton {
  title: string;
  variant: "primary" | "outline";
  href?: string;
}

export interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
  buttons: SlideButton[];
}

export interface SliderPropsTypes {
  listOfSlides?: SlideItem[];
  spaceBetween?: number;
  slidesPerView?: number;
}
