'use client';

import HeroSection from '@/components/sections/HeroSection';
import VideoSection from '@/components/sections/VideoSection';
import CoupleStorySection from '@/components/sections/CoupleStorySection';
import BrideGroomSection from '@/components/sections/BrideGroomSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import LiveStreamSection from '@/components/sections/LiveStreamSection';
import VenueSection from '@/components/sections/VenueSection';
import FamilySection from '@/components/sections/FamilySection';
import GiftsSection from '@/components/sections/GiftsSection';
import CountdownSection from '@/components/sections/CountdownSection';
import MusicSection from '@/components/sections/MusicSection';
import QuotesSection from '@/components/sections/QuotesSection';
import SocialShareSection from '@/components/sections/SocialShareSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon via-[#5a0016] to-[#2d000b] text-cream">
      {/* Hero Section */}
      <HeroSection />

      {/* Wedding Invitation Video */}
      <VideoSection />

      {/* Couple Story */}
      <CoupleStorySection />

      {/* Bride & Groom */}
      <BrideGroomSection />

      {/* Wedding Events Timeline */}
      <EventsSection />

      {/* Wedding Gallery */}
      <GallerySection />

      {/* Live Wedding Stream */}
      <LiveStreamSection />

      {/* Venue Section */}
      <VenueSection />

      {/* Family Members */}
      <FamilySection />

      {/* Wedding Gifts */}
      <GiftsSection />

      {/* Wedding Countdown */}
      <CountdownSection />

      {/* Music */}
      <MusicSection />

      {/* Telugu Quotes */}
      <QuotesSection />

      {/* Social Sharing */}
      <SocialShareSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}