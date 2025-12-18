'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { TestimonialData } from '@/lib/types';
import { QuoteIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';

const testimonials: TestimonialData[] = [
  {
    quote:
      'An invaluable tool for any student feeling lost about their career. The insights are practical and immediately actionable.',
    name: 'Amit',
    title: 'B.Com, Delhi',
    image: '/Slider.png',
  },
  {
    quote:
      "Origin BI's test gave me clarity on my strengths, and the roadmap guided me step-by-step toward UI/UX design.",
    name: 'Sneha',
    title: 'B.Sc. Computer Science, Chennai',
    image: '/Slider.png',
  },
  {
    quote:
      'The personalized feedback was a game-changer. I finally understood where to focus my learning efforts for a career in data science.',
    name: 'Rajesh',
    title: 'B.Tech IT, Bangalore',
    image: '/Slider.png',
  },
  {
    quote:
      'I never thought I could pivot into product management, but OriginBI provided the exact guidance I needed to start my journey.',
    name: 'Priya',
    title: 'MBA, Mumbai',
    image: '/Slider.png',
  },
];

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  const current = testimonials[currentIndex];

  useEffect(() => {
    const timer = setTimeout(nextTestimonial, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, nextTestimonial]);

  return (
    <div className="relative w-full h-full bg-brand-dark-secondary rounded-3xl overflow-hidden p-6 md:p-8 lg:p-[5%] flex flex-col justify-end">
      {/* Origin Fav Icon Overlay */}
      <img
        src="/Origin_Fav_Icon.svg"
        alt="Origin BI Icon"
        className="absolute top-8 left-8 w-[clamp(32px,3vw,56px)] h-[clamp(32px,3vw,56px)] z-30 select-none"
      />
      <div className="absolute inset-0 z-0">
        <img
          src="/Slider.png"
          alt="Testimonial background"
          className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      <div key={currentIndex} className="relative z-20 flex flex-col justify-end h-full">
        {/* Fill Animation Style */}
        <style jsx global>{`
          @keyframes fillProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-fill {
            animation: fillProgress 5000ms linear forwards;
          }
        `}</style>

        <div className="mt-auto space-y-3 md:space-y-4 animate-fade-in">
          <QuoteIcon className="w-[clamp(20px,2vw,32px)] h-[clamp(20px,2vw,32px)] text-brand-green" />

          <p className="font-sans text-[clamp(16px,1.5vw,28px)] font-normal leading-[1.2] tracking-[0%] text-white">
            {current.quote}
          </p>

          <div className="flex items-end justify-between pt-2">
            <div>
              <p className="font-sans text-[clamp(16px,1.25vw,24px)] font-bold leading-none tracking-[0%] mb-1 text-white">{current.name},</p>
              <p className="font-sans text-[clamp(14px,1.05vw,20px)] font-normal leading-none tracking-[0%] text-white/80">{current.title}</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-[clamp(10px,0.8vw,14px)] transition-all transform hover:scale-105"
              >
                <ArrowLeftIcon className="w-[clamp(18px,1.2vw,24px)] h-[clamp(18px,1.2vw,24px)]" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full p-[clamp(10px,0.8vw,14px)] transition-all transform hover:scale-105 shadow-lg shadow-brand-green/30"
              >
                <ArrowRightIcon className="w-[clamp(18px,1.2vw,24px)] h-[clamp(18px,1.2vw,24px)]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-2 mt-6">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-[3px] rounded-full flex-1 bg-white overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {index === currentIndex && (
                <div className="h-full bg-brand-green animate-fill" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
