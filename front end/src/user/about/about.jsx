import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import HeroSection from "./1-HeroSection";
import BrandStorySection from "./2-BrandStorySection";
import CoreValues from "./3-CoreValues";
import TeamSection from "./4-TeamSection";
import CTASection from "./5-CTASection";

const About = () => {
  // Team Data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    },
    {
      name: "Sarah Mitchell",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    },
    {
      name: "Emily Davis",
      role: "Marketing Lead",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    },
  ];

  // Values Data
  const coreValues = [
    {
      title: "Quality First",
      description:
        "We source only the finest materials to ensure every piece feels premium and lasts for years.",
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    },
    {
      title: "Sustainable Fashion",
      description:
        "Committed to ethical practices and reducing our environmental footprint at every step.",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Customer Centric",
      description:
        "Your satisfaction is our priority. We strive to provide an unmatched shopping experience.",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Innovation",
      description:
        "Constantly evolving our designs to bring you the latest trends and timeless classics.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - SHOP.CO</title>
      </Helmet>

      <div className="bg-texture">
        {/* Hero Section */}
        <HeroSection />

        {/* Brand Story Section */}
        <BrandStorySection />

        {/* core Values */}
        <CoreValues coreValues={coreValues} />

        {/* Team Section */}
        <TeamSection teamMembers={teamMembers} />

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
};

export default About;
