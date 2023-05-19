import React, { useState, useRef, useEffect} from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import styles from './Carousel.module.scss'

type Props = {
  /**
   * content for the carousel
   */
  children: any;

  /**
   * previous button content (icon or text)
   */
  prevBtn: React.ReactNode;

  /**
   * next button content (icon or text)
   */
  nextBtn: React.ReactNode;

  /**
   * label for the carousel (a11y)
   */
  label: string;
  current?:any;
}


const Carousel = ({ children, prevBtn, nextBtn, label, current }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const carouselRef = useRef<any>(null)
   
  current?.(currentSlide+1,children.length)
  // check if children prop is wrapped in a fragment container
  let carouselItems = children;
  if (children.type == React.Fragment) {
    carouselItems = children.props.children;
  }
  // if it's a single element, put it in a array
  carouselItems = !Array.isArray(carouselItems) ? [carouselItems] : carouselItems;

  function handleArrowKeys(e:any) {
    if (e.key == 'ArrowRight') {
      instanceRef.current?.next();
      carouselRef.current?.querySelector('.carouselNextBtn').focus();
    } else if (e.key == 'ArrowLeft') {
      instanceRef.current?.prev();
      carouselRef.current?.querySelector('.carouselPrevBtn').focus();
    }
  }
  useEffect(() => {
    if(carouselRef.current)
    carouselRef.current?.addEventListener('keydown', handleArrowKeys);
  }, []);

  const [refCallback, instanceRef] = useKeenSlider({
    // carousel methods
    rubberband: false,
    dragSpeed: 0.1,
    defaultAnimation: {
      duration: 800,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);    
      var slidys = carouselRef.current.querySelectorAll('.keen-slider__slide');
      slidys.forEach(function (slidy:any, idx:any) {
        if (idx === slider.track.details.rel) {
          slidy.setAttribute('data-hidden', 'false');
          slidy.setAttribute('tabindex', '0');
        } else {
          slidy.setAttribute('data-hidden', 'true');
          slidy.removeAttribute('tabindex');
        }
      });
    },
    created() {
      setLoaded(true);
      setTimeout(() => {
        var slide = carouselRef.current.querySelector('.keen-slider__slide');
        slide.setAttribute('data-hidden', 'false');
        slide.setAttribute('tabindex', '0');
      }, 10);
    },
  });

  return (
    <div
      ref={carouselRef}
      role="group"
      aria-roledescription="slider"
      aria-label={label}
      className={styles.Carousel}
    >
      <span className="sr-only" aria-live="polite">{`Showing slide ${
        currentSlide + 1
      } of ${carouselItems.length}`}</span>
      <div className="keen-slider" ref={refCallback}>
        {carouselItems.map((item:any, index:any) =>
          React.cloneElement(item, {
            key: `carouselItem-${index}`,
            className: 'keen-slider__slide',
            'data-hidden': 'true',
            'aria-roledescription': 'slide',
            role: 'group',
          })
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className="carouselBtnWrapper">
          <button
            className={styles.CarouselPrevBtn}
            aria-label="Previous Slide"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            aria-disabled={currentSlide === 0 ? 'true' : undefined}
            tabIndex={currentSlide === 0 ? -1 : undefined}
          >
            {prevBtn}
          </button>
          <button
            className={styles.CarouselNextBtn}
            aria-label="Next Slide"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            aria-disabled={
              currentSlide === carouselItems.length - 1 ? 'true' : undefined
            }
            tabIndex={
              currentSlide === carouselItems.length - 1 ? -1 : undefined
            }
          >
            {nextBtn}
          </button>
        </div>
      )}
    </div>
  );
};

export { Carousel };