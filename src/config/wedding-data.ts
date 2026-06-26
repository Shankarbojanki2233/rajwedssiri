// ============================================================================
// WEDDING DATA CONFIGURATION
// Edit this file to customize all wedding details.
// All sections of the website pull data from this single source of truth.
// ============================================================================

export const weddingData = {
  // ── Couple Details ──────────────────────────────────────────────────────
  couple: {
    bride: {
      firstName: "Sireesha",
      lastName: "",
      fullName: "Sireesha",
      photo: "/images/couple/bride.jpg",
      parents: "D/o Sri Gedda Swamy Naidu & Smt. Lakshmi",
      fatherName: "Sri Gedda Swamy Naidu",
      motherName: "Smt. Lakshmi",
      education: "B.Sc",
      profession: "Software Professional",
      hobbies: ["Classical Dance", "Painting", "Reading", "Cooking"],
      instagram: "https://instagram.com/sireesha",
      bio: "A lover of tradition and technology, Sireesha brings warmth and grace to everything she does.",
    },
    groom: {
      firstName: "Nagaraju",
      lastName: "",
      fullName: "Nagaraju",
      photo: "/images/couple/groom.jpg",
      parents: "S/o Sri Neelathi Satyam & Smt. Lakshmi",
      fatherName: "Sri Neelathi Satyam",
      motherName: "Smt. Lakshmi",
      education: "B.Tech",
      profession: "works in railways",
      hobbies: ["Cricket", "Photography", "Travel", "Music"],
      instagram: "https://instagram.com/nagaraju",
      bio: "An adventurer at heart, Nagaraju finds joy in exploring new places and creating unforgettable moments with Sireesha.",
    },
  },

  // ── Wedding Details ─────────────────────────────────────────────────────
  wedding: {
    date: "2026-07-04T01:43:00+05:30",
    muhurthamTime: "01:43 AM (Early morning of Saturday July 4)",
    tagline: "Two souls, one journey",
    invitationText:
      "With the blessings of our families,\nwe cordially invite you to celebrate our wedding.",
    teluguBlessing: "శ్రీ గణేశాయ నమః",
    hashtag: "#NagarajuWedSireesha",
  },

  // ── Events ──────────────────────────────────────────────────────────────
  events: [
    {
      id: "wedding",
      name: "Wedding Muhurtham",
      teluguName: "శుభ ముహూర్తం",
      date: "2026-07-04T01:43:00+05:30",
      time: "01:43 AM",
      venue: "Bride's Residence",
      address: "Datti Village, Datti Rajeru (m), Vizianagaram District",
      dressCode: "Traditional Silk Attire",
      icon: "💍",
      description:
        "The sacred wedding ceremony performed during the auspicious muhurtham.",
    },
    {
      id: "lunch",
      name: "Wedding Lunch",
      teluguName: "విందు",
      date: "2026-07-05T12:00:00+05:30",
      time: "12:00 PM",
      venue: "Own Residence",
      address: "Datti Village, Datti Rajeru (m), Vizianagaram District",
      dressCode: "Traditional Wear",
      icon: "🍽️",
      description:
        "Join us for a grand lunch celebration at our residence.",
    },
  ],

  // ── Couple Story Timeline ───────────────────────────────────────────────
  coupleStory: [
    {
      id: "introduction",
      title: "The Introduction",
      teluguTitle: "పరిచయం",
      date: "August 2024",
      description:
        "Our journey began when our families introduced us. A simple meeting led to a meaningful conversation that laid the foundation for our future together.",
      photo: "/images/story/first-meet.jpg",
      icon: "🤝",
    },
    {
      id: "family-meeting",
      title: "Family Meeting",
      teluguTitle: "కుటుంబ కలయిక",
      date: "October 2024",
      description:
        "As our families met and shared their joy, we realized that we weren't just two individuals coming together, but two families uniting in love and respect.",
      photo: "/images/story/friendship.jpg",
      icon: "🏘️",
    },
    {
      id: "nischitartham",
      title: "Nischitartham",
      teluguTitle: "నిశ్చితార్ధం",
      date: "February 2025",
      description:
        "Surrounded by our loved ones, we exchanged rings and committed to a lifetime of togetherness in a beautiful traditional ceremony.",
      photo: "/images/story/engagement.jpg",
      icon: "💎",
    },
    {
      id: "wedding",
      title: "The Wedding Day",
      teluguTitle: "పెళ్ళి రోజు",
      date: "July 2026",
      description:
        "Now, we are ready to embark on this beautiful adventure together, with the blessings of our parents and the presence of our dear friends.",
      photo: "/images/story/wedding.jpg",
      icon: "🕉️",
    },
  ],

  // ── Family Members ──────────────────────────────────────────────────────
  family: {
    bride: [
      {
        name: "Sri Gedda Swamy Naidu",
        relationship: "Father",
        teluguRelation: "తండ్రి",
        photo: "/images/family/bride-father.jpg",
        blessing: "May your married life be filled with happiness and prosperity.",
      },
      {
        name: "Smt. Lakshmi",
        relationship: "Mother",
        teluguRelation: "తల్లి",
        photo: "/images/family/bride-mother.jpg",
        blessing: "My blessings are always with you, my dear daughter.",
      },
    ],
    groom: [
      {
        name: "Sri Neelathi Satyam",
        relationship: "Father",
        teluguRelation: "తండ్రి",
        photo: "/images/family/groom-father.jpg",
        blessing: "Proud of you, son. May your journey together be wonderful.",
      },
      {
        name: "Smt. Neelathi Lakshmi",
        relationship: "Mother",
        teluguRelation: "తల్లి",
        photo: "/images/family/groom-mother.jpg",
        blessing: "My heartfelt blessings for a beautiful married life.",
      },
    ],
  },

  // ── Venue ───────────────────────────────────────────────────────────────
  venue: {
    name: "Bride's Residence",
    address: "Datti Village, Datti Rajeru (m), Vizianagaram District, Andhra Pradesh",
    mapUrl: "https://maps.google.com/?q=Datti+Village,Vizianagaram",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.2!2d83.35!3d18.35!2m3!1f0!2f0!3f0!3m3!1m2!1s0x0%3A0x0!2zMTjCsDIxJzAwLjAiTiA4M8KwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
    coordinates: { lat: 18.35, lng: 83.35 },
    phone: "+91 98765 43210",
    parking: "Ample parking available at the venue.",
    nearbyHotels: [
      { name: "Local Guest Houses", distance: "1 km", phone: "+91 99999 99999" },
    ],
    nearbyBusStand: { name: "Datti Bus Stop", distance: "500m" },
    nearbyRailway: { name: "Vizianagaram Railway Station", distance: "25 km" },
    nearbyAirport: { name: "Visakhapatnam International Airport", distance: "85 km" },
  },

  // ── Gallery Categories ──────────────────────────────────────────────────
  gallery: {
    categories: ["All", "Pre Wedding", "Engagement", "Family", "Wedding", "Reception"],
    photos: [
      { src: "/images/gallery/1.jpg", category: "Pre Wedding", alt: "Pre-wedding photoshoot at Golconda Fort" },
      { src: "/images/gallery/2.jpg", category: "Pre Wedding", alt: "Couple at Charminar" },
      { src: "/images/gallery/3.jpg", category: "Engagement", alt: "Ring ceremony" },
      { src: "/images/gallery/4.jpg", category: "Engagement", alt: "Engagement celebrations" },
      { src: "/images/gallery/5.jpg", category: "Family", alt: "Family blessings" },
      { src: "/images/gallery/6.jpg", category: "Family", alt: "Family gathering" },
      { src: "/images/gallery/7.jpg", category: "Wedding", alt: "Wedding preparations" },
      { src: "/images/gallery/8.jpg", category: "Wedding", alt: "Traditional rituals" },
      { src: "/images/gallery/9.jpg", category: "Reception", alt: "Reception dinner" },
      { src: "/images/gallery/10.jpg", category: "Reception", alt: "Dance performances" },
      { src: "/images/gallery/11.jpg", category: "Pre Wedding", alt: "Sunset shoot" },
      { src: "/images/gallery/12.jpg", category: "Wedding", alt: "Muhurtham ceremony" },
    ],
  },

  // ── Video ───────────────────────────────────────────────────────────────
  video: {
    type: "youtube" as "youtube" | "vimeo" | "mp4",
    url: "", // Add YouTube embed URL here
    thumbnail: "/images/video-thumbnail.jpg",
  },

  // ── Live Stream ─────────────────────────────────────────────────────────
  liveStream: {
    enabled: false,
    platform: "youtube" as "youtube" | "facebook" | "zoom",
    url: "",
    startTime: "2026-07-04T01:43:00+05:30",
  },

  // ── Telugu Quotes ───────────────────────────────────────────────────────
  quotes: [
    {
      telugu: "ఇద్దరి మనసులు ఒకటై జీవితాంతం సంతోషంగా ఉండాలని ఆశీస్సులు.",
      english: "May two hearts become one and live happily together forever.",
    },
    {
      telugu: "పెళ్లి అంతరంగాలు రెండు హృదయాల కలయిక, రెండు కుటుంబాల అనుబంధం.",
      english: "Marriage is the union of two hearts and the bond of two families.",
    },
    {
      telugu: "ప్రేమ అనేది కళ్లకు కనిపించదు, హృదయానికి Telusuto.",
      english: "Love is invisible to the eyes but known to the heart.",
    },
    {
      telugu: "మీ దాంప్తి జీవితం పూ వనములా విస్తరించాలని ఆశీర్వదిస్తున్నాము.",
      english: "We bless your married life to blossom like a garden of flowers.",
    },
    {
      telugu: "కలిసి నడుచుకుంటూ, కలిసి ఎగుస్తూ, శాశ్వతంగా ప్రేమించుకోండి.",
      english: "Walk together, grow together, love each other forever.",
    },
  ],

  // ── Gifts ───────────────────────────────────────────────────────────────
  gifts: {
    enabled: false,
    message:
      "Your presence at our wedding is the greatest gift of all. However, if you wish to bless us with a gift, here are some options.",
    upiId: "",
    upiQrCode: "/images/upi-qr.png",
    bankDetails: {
      accountName: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
    },
    amazonWishlist: "",
  },

  // ── Music ───────────────────────────────────────────────────────────────
  music: {
    enabled: true,
    tracks: [
      { name: "Telugu Wedding Instrumental", src: "/music/track1.mp3" },
      { name: "Mangala Vaadyam", src: "/music/track2.mp3" },
    ],
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  contact: {
    bride: { name: "Sireesha", phone: "", whatsapp: "" },
    groom: { name: "Nagaraju", phone: "", whatsapp: "" },
    emergency: { name: "Family Member", phone: "" },
    email: "sireeshawedsnagaraju2026@gmail.com",
  },

  // ── Social Links ────────────────────────────────────────────────────────
  social: {
    whatsappMessage:
      "You are cordially invited to the wedding of Nagaraju & Sireesha! 💍🎉\n\nDate: July 4, 2026\nVenue: Datti Village, Vizianagaram\n\nVisit our wedding website: ",
    websiteUrl: "https://nagaraj-weds-sireesha.vercel.app",
  },

  // ── SEO ─────────────────────────────────────────────────────────────────
  seo: {
    title: "Nagaraju & Sireesha Wedding | శుభ వివాహం",
    description:
      "You are cordially invited to the grand wedding celebration of Nagaraju & Sireesha on July 4, 2026 at Vizianagaram. Join us for this beautiful union!",
    ogImage: "/images/og-image.jpg",
  },
};

export type WeddingData = typeof weddingData;