export interface Slide {
  id: string;
  image: string;
  mobileImage: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  headingColor: string;
}

export const slides: Slide[] = [
  {
    id: "earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85",
    heading: "Sound. Style. Power.",
    description: "Hybrid Active Noise Cancellation earbuds with studio fidelity and up to 60 hours of total playtime.",
    ctaText: "Shop Earbuds",
    ctaLink: "/collections/earbuds",
    headingColor: "#ffffff"
  },
  {
    id: "watches",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85",
    heading: "Smart Living on Your Wrist",
    description: "Futuristic AMOLED smartwatches with 24/7 fitness metrics, Bluetooth calling, and ultra-durable battery life.",
    ctaText: "Shop Smart Watches",
    ctaLink: "/collections/smart-watches",
    headingColor: "#ffffff"
  },
  {
    id: "speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85",
    heading: "Acoustic Excellence Anywhere",
    description: "Heavy-bass portable BoomBox speakers and party towers engineered for relentless clarity and power.",
    ctaText: "Shop Speakers",
    ctaLink: "/collections/speakers",
    headingColor: "#ffffff"
  },
  {
    id: "gaming",
    image: "https://images.unsplash.com/photo-1612287233207-6f85d263bba2?auto=format&fit=crop&w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1612287233207-6f85d263bba2?auto=format&fit=crop&w=900&q=85",
    heading: "Pro Esports Gear",
    description: "Zero-latency 7.1 surround gaming headsets and precision hall-effect controllers built for the win.",
    ctaText: "Shop Gaming",
    ctaLink: "/collections/gaming",
    headingColor: "#ffffff"
  }
];