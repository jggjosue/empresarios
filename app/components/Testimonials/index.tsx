"use client"
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { DataAll } from '../../data/DataAll';

const settings1 = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    //centerMode: true,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        }
    ]
};

const animation = { duration: 12000, easing: (t: number) => t }

const onClickDataCode = (value:any) => {
    console.log('value = ', value);
}

// CAROUSEL SETTINGS
const MultipleItems = () => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: false,
        renderMode: "performance",
        drag: true,
        breakpoints: {
            "(min-width: 1200px)": {
              slides: { perView: 2 },
            },
            "(min-width: 850px)": {
              slides: { perView: 2 },
            },
        },
        slides: { perView: 1 },
        created(s) {
          s.moveToIdx(1, false, animation)
        },
        updated(s) {
          s.moveToIdx(s.track.details.abs + 1, false, animation)
        },
        animationEnded(s) {
          s.moveToIdx(s.track.details.abs + 1, false, animation)
        },
      })

    return (
        <div className="bg-testimonial pt-8 pb-32 lg:py-32" id="marcas-section">
            <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>

                <div className="text-center">
                    <h3 className="text-blue text-lg font-normal tracking-widest">Promociones</h3>
                    <h3 className="text-4xl sm:text-6xl font-bold">+ de <b>450</b> Marcas</h3>
                </div>

                <div className="text-center">
                    <h5 className="text-xl sm:text-3xl font-bold">En todo el mundo</h5>
                </div>

                <div className='blog-section-data grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 my-16 gap-x-16 lg:gap-x-32'>
                        {DataAll.map((item: any, i: any) => (
                            <div key={i} className='bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
                                <div className='blog-section-data center'>
                                    <Image
                                        src={`https://ui.awin.com/images/upload/merchant/profile/` + `${item?.advertiser?.id}` + '.png'}
                                        alt={item.description}
                                        width={100}
                                        height={85} />
                                </div>
                            </div>

                        ))}
                    </div>
                {
                    /**
                     *                 <div ref={sliderRef} className="keen-slider">
                        {DataUS.map((item, i) => (
                            <div key={i} className="relative" >
                                <div className='bg-white test-sha m-3 p-10 my-20 rounded-3xl keen-slider__slide number-slide1'>
                                <Image 
                                    src={`https://ui.awin.com/images/upload/merchant/profile/` + `${item?.advertiser?.id}` + '.png'}
                                    alt={item.description}
                                    width={85} 
                                    height={75} 
                                    className="inline-block m-auto absolute test-pos" />
                                </div>
                            </div>
                        ))}
                </div>
                     */
                }
            </div>
        </div>

    );
}

export default MultipleItems;