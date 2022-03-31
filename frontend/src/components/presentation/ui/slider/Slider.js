import React from 'react';
import PropTypes from 'prop-types';
import useSlide from '../../../../hooks/slide-hook';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';


const Slider = props => {
    const {slide, setSlide} = useSlide();
    const {name, slides, monthId, appService, setMonthId, setCurrentCurrency} = props;

    const prevSlideHandler = () => {
        appService.selectSliderHandler(name, {
            month: () => setMonthId(prev => prev === 0 ? slides.length - 1 : prev - 1),
            slide: () => {
                setSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
                setCurrentCurrency(slides[slide - 1] === undefined ? slides[5] : slides[slide - 1]);
            }
        });
    };

    const nextSlideHandler = () => {
        appService.selectSliderHandler(name, {
            month: () => setMonthId(prev => prev === slides.length - 1 ? 0 : prev + 1),
            slide: () => {
                setSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
                setCurrentCurrency(slides[slide + 1] === undefined ? slides[0] : slides[slide + 1]);
            }
        });
    };

    if (!Array.isArray(slides) || slides.length <= 0) return null;

    return (
        <div className={'slider'}>
            <FaArrowAltCircleLeft className={'slider__arrow slider__arrow--left'} onClick={prevSlideHandler}/>
            <FaArrowAltCircleRight className={'slider__arrow slider__arrow--right'} onClick={nextSlideHandler}/>
            
            {slides.map((val, idx) => {
                return (
                    <div
                        key={val.id}
                        className={idx === appService.selectSliderContentSwitch(name, slide, monthId) ?
                            'slider__slide active' : 'slider__slide'
                        }
                    >
                        {idx === appService.selectSliderContentSwitch(name, slide, monthId) && (
                            <div className={'slider__content'}>
                                {appService.checkLanguage() ? val.symbol : val.translate}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


Slider.propTypes = {
    name: PropTypes.string,
    slides: PropTypes.array,
    monthId: PropTypes.number,
    appService: PropTypes.object,
    setCurrentCurrency: PropTypes.func,
};


export default Slider;