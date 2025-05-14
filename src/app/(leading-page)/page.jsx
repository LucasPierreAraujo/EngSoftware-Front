'use client'
import { Navbar } from "./(components)/Navbar";
import { Hero } from "./(components)/Hero";
import { Features } from "./(components)/Features";
import { Video } from "./(components)/Video";
import { Benefits } from "./(components)/Benefits";
import { CTA } from "./(components)/CTA";
import { Footer } from "./(components)/Footer";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
      <Features />
      <Video />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
} 