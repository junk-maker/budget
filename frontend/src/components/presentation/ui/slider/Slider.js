import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/Tooltip';
import useSlide from '../../../../hooks/slide-hook';


const Slider = props => {
    const {slide, setSlide} = useSlide();
    const {type, slides, appService, setCurrentCurrency} = props;

    const prevSlideHandler = () => {
        return {
            currency: () => {
                setSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
                setCurrentCurrency(slides[slide - 1] === undefined ? slides[5] : slides[slide - 1]);
            },
        }[type]();
    };

    const nextSlideHandler = () => {
        return {
            currency: () => {
                setSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
                setCurrentCurrency(slides[slide + 1] === undefined ? slides[0] : slides[slide + 1]);
            }, 
        }[type]();
    };

    if (!Array.isArray(slides) || slides.length <= 0) return null;

    return (
        <div className={'slider'}>
            <i className={'slider__arrow slider__arrow--left fas fa-chevron-left'} onClick={prevSlideHandler}/>
            <i className={'slider__arrow slider__arrow--right fas fa-chevron-right'} onClick={nextSlideHandler}/>

            {slides.map((val, idx) => (
                <div
                    key={val.id}
                    className={idx === {currency: slide}[type] ? 'slider__slide active' : 'slider__slide'}
                >
                    {
                        idx === {currency: slide}[type] && <div className={'slider__content'}>
                            <Tooltip text={appService.checkLanguage() ? val.symbol : val.translate}>
                                {val.cut} {val.currency}
                            </Tooltip> 
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};


Slider.propTypes = {
    type: PropTypes.string,
    slides: PropTypes.array,
    appService: PropTypes.object,
    setCurrentCurrency: PropTypes.func,
};


export default Slider;