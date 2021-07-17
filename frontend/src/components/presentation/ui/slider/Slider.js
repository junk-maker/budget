import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';


const Slider = props => {
    const {slides, setCurrentCurrency} = props;
    const [current, setCurrent] = useState(0);

    const prevSlideHandler = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
        setCurrentCurrency(slides[current - 1] === undefined ? slides[5] : slides[current - 1]);
    };

    const nextSlideHandler = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
        setCurrentCurrency(slides[current + 1] === undefined ? slides[0] : slides[current + 1]);
    };

    if (!Array.isArray(slides) || slides.length <= 0) return null;

    return(
        <div className={'slider'}>
            <FaArrowAltCircleLeft className={'slider__arrow slider__arrow--left'} onClick={prevSlideHandler} />
            <FaArrowAltCircleRight className={'slider__arrow slider__arrow--right'} onClick={nextSlideHandler}/>
            {slides.map((slide, idx) => {
                return (
                    <div
                        key={idx}
                        className={idx === current ? 'slider__slide active' : 'slider__slide'}
                    >
                        {idx === current && (
                            <div className={'slider__content'}>
                                {/*{setSlide(slide.symbol)}*/}
                                {slide.symbol}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


Slider.propTypes = {
    slides: PropTypes.array,
    setCurrentCurrency: PropTypes.func,
};


export default Slider;