// Random test data
export const randomUtils = {
  // Likes
  getRandomLikes: () => Math.floor(Math.random() * (100000 - 1 + 1)) + 10,
  // Interactions
  getRandomInteractions: () => Math.floor(Math.random() * (5000 - 1 + 1)) + 1,
  // Page number
  getRandomPage: () => Math.floor(Math.random() * 5) + 1,
  // True or False
  getRandomBoolean: () => Math.random() < 0.5,
  // Followers
  getRandomFollowers: () =>
    Math.floor(Math.random() * (2000000 - 500 + 1)) + 500,
  // Time
  getRandomTime: () => {
    const minutesInHour = 60
    const minutesInDay = minutesInHour * 24
    const minutesInWeek = minutesInDay * 7
    const randomCategory = Math.random()
    let randomMinutes
    if (randomCategory < 0.33) {
      randomMinutes =
        Math.floor(Math.random() * (23 * minutesInHour)) + minutesInHour
      return `${Math.round(randomMinutes / minutesInHour)} hours`
    } else if (randomCategory < 0.66) {
      randomMinutes =
        Math.floor(Math.random() * (6 * minutesInDay)) + minutesInDay
      return `${Math.round(randomMinutes / minutesInDay)} days`
    } else {
      randomMinutes =
        Math.floor(Math.random() * (3 * minutesInWeek)) + minutesInWeek
      return `${Math.round(randomMinutes / minutesInWeek)} weeks`
    }
  },
  // Capital
  getRandomCapital: () => {
    const capitals = [
      'Washington D.C',
      'Beijing',
      'Moscow',
      'Berlin',
      'Paris',
      'London',
      'Tokyo',
      'New Delhi',
      'Brasilia',
      'Ottawa',
      'Canberra',
      'Rome',
      'Madrid',
      'Seoul',
      'Mexico City',
      'Jakarta',
      'Riyadh',
      'Buenos Aires',
      'Cairo',
      'Pretoria'
    ]
    const randomIndex = Math.floor(Math.random() * capitals.length)
    return capitals[randomIndex]
  },
  // Professions
  getRandomProfession: () => {
    const Professions = [
      'Frontend Developer',
      'Social Media Expert',
      'Pro Gamer',
      'Travel Blogger',
      'E-commerce Specialist',
      'Live Streamer',
      'Data Analyst',
      'Fashion Influencer',
      'IT Support',
      'Content Creator',
      'Product Designer',
      'Digital Nomad',
      'Digital Artist',
      'Mobile Developer',
      'Gaming YouTuber',
      'Full-Stack Developer',
      'Photographer',
      'UX Researcher',
      'Freelance Writer',
      'Cybersecurity Specialist',
      'Travel Photographer',
      'Virtual Host',
      'VR Developer',
      'Music Streamer',
      'SEO Consultant',
      'AI Researcher',
      'Outdoor Enthusiast',
      'Digital Marketer',
      'Voice Actor',
      'Nonprofit Advocate',
      'Frontend Engineer',
      'Esports Host',
      'SaaS Sales',
      'Videographer',
      'Podcast Host',
      'Data Scientist',
      'Game Developer',
      'Wellness Coach',
      'Blockchain Developer',
      'Lifestyle YouTuber',
      'Backend Developer',
      'Fitness Influencer',
      'Financial Analyst'
    ]
    return Professions[Math.floor(Math.random() * Professions.length)]
  },
  // Interests
  getRandomInterests: () => {
    const Interests = [
      'React & Next.js',
      'Strategy & Engagement',
      'FPS & Strategy',
      'Adventure & Culture',
      'SEO & Ads',
      'Gaming & Lifestyle',
      'Python & SQL',
      'Style & Wellness',
      'Network & Security',
      'Vlogs & Lifestyle',
      'Figma & UX',
      'Marketing Anywhere',
      'Streams & Animation',
      'Swift & Kotlin',
      'Reviews & Playthroughs',
      'MERN Stack',
      'Nature & Landscapes',
      'Testing & Insights',
      'Copy & Storytelling',
      'Defense & Protection',
      'Local & Culture',
      'Events & Networking',
      'Unity & Worlds',
      'Covers & Originals',
      'Strategy & Growth',
      'Machine Learning',
      'Hiking & Skills',
      'PPC & Email',
      'Characters & Narration',
      'Outreach & Change',
      'JavaScript & Responsive',
      'Commentary & Analysis',
      'B2B & Solutions',
      'Adventure & Travel',
      'Topics & Trends',
      'AI & Models',
      'C++ & Worlds',
      'Fitness & Mindfulness',
      'DeFi & Smart Contracts',
      'DIY & Ideas',
      'APIs & Architecture',
      'Workouts & Motivation',
      'Trends & Forecasting'
    ]
    return Interests[Math.floor(Math.random() * Interests.length)]
  },
  // Slogans
  getRandomSlogan: () => {
    const slogans = [
      'Crafting Sleek Applications',
      'Growing Brand Presence',
      'Turning Skill into Victories',
      'Exploring the World',
      'Boosting Product Reach',
      'Connecting Live with Fans',
      'Turning Data into Insights',
      'Inspiring Daily Confidence',
      'Keeping Systems Running',
      'Sharing Moments with You',
      'Crafting User-Friendly Apps',
      'Growing Brands Worldwide',
      'Creativity on Every Screen',
      'Building Mobile Solutions',
      'Honest Game Insights',
      'Ideas to Reality',
      'Capturing the World',
      'Improving User Experiences',
      'Words that Connect',
      'Keeping Data Safe',
      'Capturing Unique Places',
      'Unforgettable Online Events',
      'Creating Immersive Spaces',
      'Live Music Experiences',
      'Driving Engagement with Precision',
      'Innovation for Tomorrow',
      'Embracing Nature’s Challenges',
      'Boosting Targeted Campaigns',
      'Stories Brought to Life',
      'Meaningful Community Work',
      'Interactive Designs',
      'Insightful Live Coverage',
      'Client-Centered Growth',
      'Capturing Scenic Thrill',
      'Fresh Perspectives Shared',
      'Data for Actionable Growth',
      'Immersive Gaming Experiences',
      'Helping Others Thrive',
      'Future of Finance',
      'Practical Inspiration',
      'Robust Infrastructures',
      'Inspiring Strength',
      'Data-Driven Strategy'
    ]
    return slogans[Math.floor(Math.random() * slogans.length)]
  },
  // Hashtag
  getRandomHashtag: () => {
    const popularHashtags = [
      'love',
      'instagood',
      'fashion',
      'photooftheday',
      'beautiful',
      'art',
      'photography',
      'happy',
      'picoftheday',
      'follow',
      'nature',
      'like4like',
      'travel',
      'instagram',
      'style',
      'repost',
      'summer',
      'instadaily',
      'selfie',
      'me',
      'friends',
      'fitness',
      'food',
      'fun',
      'beauty',
      'life',
      'amazing',
      'cool',
      'smile',
      'family',
      'music',
      'ootd',
      'followme',
      'bestoftheday',
      'sunset',
      'makeup',
      'lifestyle',
      'sky',
      'beach',
      'f4f',
      'photo',
      'ootn',
      'sun',
      'model',
      'workout',
      'wedding',
      'dog',
      'girl',
      'travelgram',
      'cute',
      'amor',
      'felicidad',
      'moda',
      'fotodeldia',
      'arte',
      'fotografia',
      'paisaje',
      'like',
      'familia',
      'viaje',
      'belleza',
      'salud',
      'fiesta',
      'musica',
      'amistad',
      'sonrisa',
      'autoestima',
      'naturaleza',
      'perro',
      'gato',
      'instamoment',
      'ciudad',
      'cultura',
      'deporte',
      'comida',
      'vida',
      'trabajo',
      'frases',
      'motivacion',
      'éxito',
      'celebracion',
      'verano',
      'playa',
      'sol',
      'cielo',
      'inspiracion',
      'emprendedores',
      'musicos',
      'cine',
      'tecnologia',
      'aventura',
      'familiafeliz',
      'ocio',
      'sueños',
      'historias',
      'fotografiaurbana',
      'amorpropio',
      'instachile',
      'mexico',
      'colombia'
    ]
    return popularHashtags[Math.floor(Math.random() * popularHashtags.length)]
  },
  // Descriptions
  getRandomImageDescription: () => {
    const intros = [
      'Check out this amazing capture, a beautiful moment to enjoy and share.',
      'Here\'s a snapshot of inspiration, bringing a fresh view to your day.',
      'A moment worth sharing, capturing the beauty around us.',
      'A visual story of the day, telling a tale through color and light.',
      'Another great memory, frozen in time for you to revisit.',
      'Bringing you a glimpse of beauty, a piece of the world in focus.',
      'Captured just for you, a scene that resonates with wonder.',
      'A scene that speaks for itself, vivid and full of life.',
      'A perfect moment to share, filled with color and charm.',
      'A picture worth a thousand words, ready to spark your imagination.',
      'Enjoy this view, a snapshot that captures the essence of the moment.',
      'Here\'s a unique scene that tells its own story.',
      'A glimpse of something special, framed and captured for you.',
      'Take a moment to enjoy this stunning view.',
      'An image that captures the beauty of simplicity.',
      'Moments like this deserve to be shared.',
      'A little reminder of how beautiful the world can be.',
      'Here’s a capture filled with charm and elegance.',
      'A stunning scene that captures the spirit of the day.',
      'Here’s a beautiful moment that speaks volumes.',
      'An inspiring view, caught at the perfect time.',
      'A memory preserved in a single, perfect shot.',
      'A photo that reflects the beauty in everyday life.',
      'Here’s something special to brighten your day.',
      'Captured in all its glory, this image is sure to inspire.',
      'A scene that invites you to pause and appreciate.',
      'The beauty of this moment is timeless.',
      'A photo that captures the essence of nature.',
      'An image that reminds us of the world’s wonders.',
      'Here’s a peaceful scene to bring calm to your day.',
      'Moments like this are what make life beautiful.',
      'Here’s a vibrant scene to lift your spirits.',
      'A shot that captures the magic of the moment.',
      'Here’s a beautiful view, full of color and life.',
      'A perfect example of natural beauty.',
      'A scene that will make you stop and appreciate.',
      'Here’s a serene moment captured perfectly.',
      'A beautiful perspective on a familiar scene.',
      'A glimpse of nature’s incredible artistry.',
      'A simple yet stunning view to brighten your day.',
      'A moment of peace captured in one frame.',
      'This image captures the beauty of the everyday.',
      'A scene filled with color and warmth, just for you.',
      'A special moment that’s meant to be shared.',
      'Here’s a view that inspires and uplifts.',
      'Captured with care, this image tells a story.',
      'Here’s a lovely view to bring joy to your day.',
      'A scene that reminds us to enjoy the little things.',
      'Here’s a vibrant capture, full of life and color.',
      'A picture that captures the magic of the world around us.',
      'Here’s a calming image to bring tranquility to your day.'
    ]
    // Generate an array with 5 hashtags
    const hashtags = Array.from(
      { length: 5 },
      () => `#${randomUtils.getRandomHashtag()}`
    )
    // Return an object with the description and hashtags array
    return {
      description: intros[Math.floor(Math.random() * intros.length)],
      hashtags: hashtags
    }
  },
  // Countries
  getRandomCountryCode: () => {
    const countryCodes = [
      'US',
      'CN',
      'RU',
      'DE',
      'FR',
      'GB',
      'JP',
      'IN',
      'BR',
      'CA',
      'AU',
      'IT',
      'ES',
      'KR',
      'MX',
      'ID',
      'SA',
      'AR',
      'EG',
      'ZA'
    ]
    const randomIndex = Math.floor(Math.random() * countryCodes.length)
    return countryCodes[randomIndex]
  }
}
