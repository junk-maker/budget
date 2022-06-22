import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/Tooltip';
import useSlide from '../../../../hooks/slide-hook';


const Slider = props => {
    const {slide, setSlide} = useSlide();
    const {type, slides, appService, markupService, setCurrentCurrency} = props;


    const arrowHandler = direction => {
        if (direction === 'left') {
            return {
                currency: () => {
                    setSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
                    setCurrentCurrency(slides[slide - 1] === undefined ? slides[5] : slides[slide - 1]);
                },
            }[type]();
        } else {
            return {
                currency: () => {
                    setSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
                    setCurrentCurrency(slides[slide + 1] === undefined ? slides[0] : slides[slide + 1]);
                }, 
            }[type]();
        };
    };

    if (!Array.isArray(slides) || slides.length <= 0) return null;

    return (
        <div className={'slider'}>
            <img 
                onClick={() => arrowHandler('left')}
                className={'slider__arrow slider__arrow--left'}
                alt={markupService.svgHeadingTemplate()['left']}
                src={markupService.sliderHeadingTemplate()['icon']}
            />
            <img 
                onClick={() => arrowHandler('right')}
                className={'slider__arrow slider__arrow--right'}
                alt={markupService.svgHeadingTemplate()['right']}
                src={markupService.sliderHeadingTemplate()['icon']}
            />

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
    markupService: PropTypes.object,
    setCurrentCurrency: PropTypes.func,
};


export default Slider;