'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react';

/* ───────────────── Review Data ───────────────── */
interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  initials: string;
}

const reviews: Review[] = [
  {
    name: 'Nick Centineo',
    rating: 5,
    date: '3 months ago',
    text: 'Dan has been excellent to work with as an AE and lender. He is always readily available and provides quick, knowledgeable responses.',
    initials: 'NC',
  },
  {
    name: 'Marcuse Ohm',
    rating: 5,
    date: '5 months ago',
    text: 'I am so happy with the service I received from Daniel Shepherd. Professional, responsive, and made the entire process seamless.',
    initials: 'MO',
  },
  {
    name: 'Cory Williamson',
    rating: 5,
    date: '5 months ago',
    text: 'Highly recommend. Great rates, great service, quick closings.',
    initials: 'CW',
  },
  {
    name: 'David Stein',
    rating: 5,
    date: '9 months ago',
    text: 'Daniel is the best! He was so helpful and communicative throughout the entire process. I would recommend him to anyone.',
    initials: 'DS',
  },
  {
    name: 'Teresa Smith',
    rating: 5,
    date: '1 year ago',
    text: "Dan ROCKS! Probably the best we've ever worked with. Extremely responsive and always looking out for our best interest.",
    initials: 'TS',
  },
  {
    name: 'Eugene Nilus',
    rating: 5,
    date: '1 year ago',
    text: 'Daniel is great to work with. Always available and makes the process as smooth as possible.',
    initials: 'EN',
  },
  {
    name: 'Brandon Yarnovich',
    rating: 5,
    date: '2 years ago',
    text: 'Daniel and Shepherd Mortgage were great to work with. He was very responsive and kept us informed throughout.',
    initials: 'BY',
  },
  {
    name: 'Ronald Davis',
    rating: 5,
    date: '2 years ago',
    text: 'Daniel is amazing to work with. Extremely knowledgeable and always has your best interest at heart.',
    initials: 'RD',
  },
  {
    name: 'Stephen Herbert',
    rating: 5,
    date: '2 years ago',
    text: 'Daniel Shepherd is a true professional who cares deeply about his clients and delivers exceptional results.',
    initials: 'SH',
  },
  {
    name: 'Ian Wright',
    rating: 5,
    date: '2 years ago',
    text: 'Working with Dan was awesome! He outlined every step clearly and made the entire experience stress-free.',
    initials: 'IW',
  },
  {
    name: 'Andre Stewart',
    rating: 5,
    date: '2 years ago',
    text: 'Great company. I have been working with Daniel for years and he always delivers.',
    initials: 'AS',
  },
  {
    name: 'Emily Russell',
    rating: 5,
    date: '2 years ago',
    text: 'A very good broker. Takes care of his family, so you know he will take care of yours. A+.',
    initials: 'ER',
  },
  {
    name: 'Joy Rides',
    rating: 5,
    date: '2 years ago',
    text: 'Shepherd saved my investment property! My credit is bad and my income did not qualify me for a traditional mortgage. Daniel made it happen.',
    initials: 'JR',
  },
  {
    name: 'William Haney',
    rating: 5,
    date: '2 years ago',
    text: "Dan's a great guy! If he says he can get it done, he will get it done!",
    initials: 'WH',
  },
  {
    name: 'Price Breville',
    rating: 5,
    date: '4 years ago',
    text: 'Excellent group to work with. Each transaction our team has worked on has always been an above average experience.',
    initials: 'PB',
  },
];

const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?q=Shepherd+Mortgage+reviews';

/* ───────────────── Stars Component ───────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

/* ───────────────── Google "G" Icon ───────────────── */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive visible count
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, maxIndex]);

  const goNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  // Handle edge: if we're near the end, wrap
  if (visibleReviews.length < visibleCount) {
    const needed = visibleCount - visibleReviews.length;
    visibleReviews.push(...reviews.slice(0, needed));
  }

  const overallRating = '5.0';
  const totalReviews = reviews.length;

  return (
    <div>
      {/* Header: Google branding + overall rating */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <GoogleIcon className="w-8 h-8" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-navy">
                {overallRating}
              </span>
              <Stars count={5} />
            </div>
            <p className="text-sm text-text-secondary">
              Based on {totalReviews} Google reviews
            </p>
          </div>
        </div>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:underline"
        >
          View all on Google
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-surface-secondary transition-colors cursor-pointer"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-5 h-5 text-navy" />
        </button>
        <button
          onClick={goNext}
          className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-surface-secondary transition-colors cursor-pointer"
          aria-label="Next review"
        >
          <ChevronRight className="w-5 h-5 text-navy" />
        </button>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
          {visibleReviews.map((review, idx) => (
            <div
              key={`${review.name}-${idx}`}
              className="bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-all animate-fade-in"
            >
              {/* Reviewer header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-navy text-sm truncate">
                    {review.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{review.date}</p>
                </div>
                <GoogleIcon className="w-5 h-5 shrink-0 ml-auto" />
              </div>

              {/* Stars */}
              <div className="mb-3">
                <Stars count={review.rating} />
              </div>

              {/* Review text */}
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: Math.min(maxIndex + 1, 10) }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(i);
            }}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              i === currentIndex % (maxIndex + 1)
                ? 'bg-navy w-6'
                : 'bg-border hover:bg-text-tertiary'
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
