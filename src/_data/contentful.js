const contentful = require('contentful');
require('dotenv').config();

// Fallback data used when Contentful credentials are not configured.
// This mirrors the original hardcoded site content so the build works
// without a CMS connection (useful for local development).
const fallback = {
  services: [
    {
      name: "Tarot Reading",
      icon: "🔮",
      description: "Precise intuitive guidance across all life areas — relationships, career, health, family and spiritual growth.",
      priceLabel: "From £30",
      features: [
        "Quick Clarity Reading — 20 min — £30",
        "Standard Reading — 60 min — £65",
        "Deep Insight Reading — 90 min — £95",
        "Delivered via Zoom or written report",
        "Available globally"
      ],
      isFeatured: false,
      ctaText: "Book a Reading",
      sortOrder: 1
    },
    {
      name: "Reiki Healing",
      icon: "✨",
      description: "Deep energy healing to restore balance, release blockages and reconnect you with your natural state of peace.",
      priceLabel: "From £60",
      features: [
        "Single Reiki Session — 60 min — £60",
        "3-Session Reiki Package — £165",
        "Reiki + Chakra Combo — 90 min — £85",
        "Distance healing available",
        "Includes post-session guidance"
      ],
      isFeatured: true,
      ctaText: "Book Reiki",
      sortOrder: 2
    },
    {
      name: "Chakra Balancing",
      icon: "🌸",
      description: "A focused assessment and clearing of your seven energy centres. Identify what is blocked and why.",
      priceLabel: "From £60",
      features: [
        "Chakra Assessment & Balancing — 60 min — £60",
        "Tarot + Chakra Combo — 90 min — £110",
        "Includes personalised ritual plan",
        "Crystal recommendations included",
        "Available globally via Zoom"
      ],
      isFeatured: false,
      ctaText: "Book Healing",
      sortOrder: 3
    },
    {
      name: "Spiritual Life Coaching",
      icon: "🌙",
      description: "Guided coaching that combines spiritual insight with practical life strategy to help you step into your power.",
      priceLabel: "£75 / session",
      features: [
        "60-minute 1-on-1 coaching session",
        "Clarity on decisions, direction & purpose",
        "Mindset tools & practical strategy",
        "WhatsApp support between sessions",
        "Available globally via Zoom"
      ],
      isFeatured: false,
      ctaText: "Book Coaching",
      sortOrder: 4
    },
    {
      name: "Crystal Guidance Reading",
      icon: "💎",
      description: "Discover which crystals support your energy right now. A personalised assessment with tailored recommendations.",
      priceLabel: "£50",
      features: [
        "45-minute focused session",
        "Personalised crystal prescription",
        "How to use each crystal",
        "Optional: crystal kit can be sourced",
        "Ideal for beginners & practitioners"
      ],
      isFeatured: false,
      ctaText: "Book Session",
      sortOrder: 5
    },
    {
      name: "Free Clarity Reading",
      icon: "🎁",
      description: "New to Goddess Alchemy? Start here. A complimentary 20-minute taster reading with no obligation.",
      priceLabel: "Free",
      features: [
        "20-minute intuitive reading",
        "One focused question or life area",
        "Available to new clients only",
        "Limited slots — book early",
        "No catch. No obligation."
      ],
      isFeatured: true,
      ctaText: "Claim Free Reading",
      sortOrder: 6
    }
  ],
  packages: [
    {
      name: "8-Week Transformation Programme",
      icon: "🌙",
      description: "Our flagship offering. Weekly 90-minute sessions combining tarot, chakra healing, Reiki and coaching. Includes WhatsApp support throughout.",
      priceLabel: "£485 or 2 x £250",
      savingsNote: null,
      sortOrder: 1
    },
    {
      name: "Starter Combo",
      icon: "✨",
      description: "One full tarot reading + one Reiki session. Perfect for new clients who want to experience both modalities.",
      priceLabel: "£110",
      savingsNote: "(save £15)",
      sortOrder: 2
    },
    {
      name: "6-Week Coaching Programme",
      icon: "🔮",
      description: "Six weekly 60-minute coaching sessions with WhatsApp support. Focused on one key life area — career, relationships, purpose or health.",
      priceLabel: "£385",
      savingsNote: "(save £65)",
      sortOrder: 3
    },
    {
      name: "Monthly Group Meditation",
      icon: "💫",
      description: "Live 45-minute guided meditation via Zoom. New theme every month aligned to chakras and lunar cycles. Replay available for 1 week.",
      priceLabel: "£15 per session",
      savingsNote: null,
      sortOrder: 4
    }
  ],
  testimonials: [
    {
      review: "I never stop counting on the accuracy she gives me in readings. It's not just about time and dates — she can accurately describe the inner landscape, mindscape and emotionscape of anyone of importance. Don't look around, don't waste time. Just book that session and hold your breath. The world is about to open its secrets for you through everything she says.",
      initials: "P.R.",
      location: "Experienced Tarot Reader & Client — USA",
      isFeatured: true,
      showOnHomepage: true,
      sortOrder: 1
    },
    {
      review: "She gave me such clarity. Exactly what I needed to hear. I came in completely lost about my career and left with a real direction.",
      initials: "S.K.",
      location: "London, UK",
      isFeatured: false,
      showOnHomepage: true,
      sortOrder: 2
    },
    {
      review: "The reading was spot on. Changed my perspective completely. I had been going round in circles — one session gave me the breakthrough I needed.",
      initials: "A.P.",
      location: "Singapore",
      isFeatured: false,
      showOnHomepage: true,
      sortOrder: 3
    },
    {
      review: "The Reiki session left me feeling lighter than I have in years. I didn't fully believe in energy healing before — I absolutely do now.",
      initials: "M.T.",
      location: "Mumbai, India",
      isFeatured: false,
      showOnHomepage: false,
      sortOrder: 4
    },
    {
      review: "I've had readings from many different people over the years. Sangeeta is in a different league. The depth of insight is extraordinary.",
      initials: "R.N.",
      location: "New York, USA",
      isFeatured: false,
      showOnHomepage: false,
      sortOrder: 5
    },
    {
      review: "She described a situation I hadn't even mentioned and was completely accurate. It was both surprising and deeply reassuring.",
      initials: "L.W.",
      location: "London, UK",
      isFeatured: false,
      showOnHomepage: false,
      sortOrder: 6
    },
    {
      review: "The chakra balancing session was transformative. I left with a sense of calm I hadn't felt in months. Booked again the same week.",
      initials: "P.S.",
      location: "Toronto, Canada",
      isFeatured: false,
      showOnHomepage: false,
      sortOrder: 7
    }
  ],
  faqs: [
    {
      question: "How are sessions delivered?",
      answer: "All sessions are delivered via Zoom. I work with clients globally — USA, UK, India, Singapore, Canada and beyond.",
      sortOrder: 1
    },
    {
      question: "How do I pay?",
      answer: "Payment details are sent once your session is confirmed. I accept bank transfer, PayPal and major cards. Payment plans available for packages.",
      sortOrder: 2
    },
    {
      question: "Is it confidential?",
      answer: "Completely. Everything you share is held in total confidence. I work with a strict code of ethics and professional integrity at all times.",
      sortOrder: 3
    },
    {
      question: "Can I get a reading as a gift?",
      answer: "Yes. Gift readings are available for any service. Get in touch and I'll arrange a personalised gift message and booking process for the recipient.",
      sortOrder: 4
    }
  ],
  galleryItems: [
    { title: "Tarot Readings", subtitle: "Deep intuitive guidance", icon: "🔮", sortOrder: 1 },
    { title: "Energy Healing", subtitle: "Reiki & chakra work", icon: "✨", sortOrder: 2 },
    { title: "Moon Rituals", subtitle: "Lunar cycle guidance", icon: "🌙", sortOrder: 3 },
    { title: "Crystal Healing", subtitle: "Stone & energy work", icon: "💎", sortOrder: 4 },
    { title: "Chakra Balancing", subtitle: "Seven centres aligned", icon: "🌸", sortOrder: 5 },
    { title: "Spell Work", subtitle: "Ritual & intention", icon: "🕯️", sortOrder: 6 },
    { title: "Group Meditation", subtitle: "Monthly Zoom sessions", icon: "🧘‍♀️", sortOrder: 7 },
    { title: "Spiritual Coaching", subtitle: "Life transformation", icon: "🌿", sortOrder: 8 },
    { title: "Ho'oponopono", subtitle: "Hawaiian healing practice", icon: "⭐", sortOrder: 9 }
  ],
  settings: {}
};

module.exports = async function () {
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.log('[contentful] No credentials found, using fallback data');
    return fallback;
  }

  try {
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const [services, packages, testimonials, faqs, galleryItems, settingsRes] =
      await Promise.all([
        client.getEntries({ content_type: 'service', order: 'fields.sortOrder' }),
        client.getEntries({ content_type: 'package', order: 'fields.sortOrder' }),
        client.getEntries({ content_type: 'testimonial', order: 'fields.sortOrder' }),
        client.getEntries({ content_type: 'faq', order: 'fields.sortOrder' }),
        client.getEntries({ content_type: 'galleryItem', order: 'fields.sortOrder' }),
        client.getEntries({ content_type: 'siteSettings', limit: 1 }),
      ]);

    return {
      services: services.items.map(i => i.fields),
      packages: packages.items.map(i => i.fields),
      testimonials: testimonials.items.map(i => i.fields),
      faqs: faqs.items.map(i => i.fields),
      galleryItems: galleryItems.items.map(i => i.fields),
      settings: settingsRes.items[0]?.fields || {},
    };
  } catch (err) {
    console.error('[contentful] Error fetching data, using fallback:', err.message);
    return fallback;
  }
};
