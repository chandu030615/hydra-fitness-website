const unsplash = (id: string, width: number, quality = 82) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`

export const whatsapp = {
  number: '917842797909',
  display: '+91 78427 97909',
  defaultMessage:
    'Hi HYDRA FITNESS! I would like to know more about training, membership and booking a free trial.',
}

export const contact = {
  email: 'hydrafitness777@gmail.com',
  city: 'Guntur',
  region: 'Andhra Pradesh',
  addressLines: [
    'HYDRA FITNESS',
    'Opp. A.N.U University,',
    'RTPDK Villa Road',
    'Guntur, Andhra Pradesh',
  ],
  mapEmbed:
    'https://www.google.com/maps?q=Opp.%20A.N.U%20University%2C%20RTPDK%20Villa%20Road%2C%20Guntur%2C%20Andhra%20Pradesh&z=15&output=embed',
  directions:
    'https://www.google.com/maps/search/?api=1&query=Opp.%20A.N.U%20University%2C%20RTPDK%20Villa%20Road%2C%20Guntur%2C%20Andhra%20Pradesh',
  mapNote: 'Opposite A.N.U University · RTPDK Villa Road',
  phones: ['7842797909', '9908661238'],
  hours: [
    { days: 'Ladies · Morning', time: '9:00 AM – 12:00 PM' },
    { days: 'Ladies · Evening', time: '4:00 PM – 6:00 PM' },
    { days: 'General · Morning', time: '5:30 AM – 12:00 PM' },
    { days: 'General · Evening', time: '4:00 PM – 10:00 PM' },
    { days: 'Gym holiday', time: 'Sunday evening & Monday morning' },
  ],
}

export function whatsappLink(message = whatsapp.defaultMessage) {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const photos = {
  hero: '/images/hero-gym-1280.webp',
  heroSrcSet: [
    '/images/hero-gym-640.webp 640w',
    '/images/hero-gym-960.webp 960w',
    '/images/hero-gym-1280.webp 1280w',
  ].join(', '),
  weights: unsplash('photo-1583454110551-21f2fa2afe61', 1000, 85),
  training: unsplash('photo-1581009146145-b5ef050c2e1e', 1000, 85),
  gym: unsplash('photo-1571902943202-507ec2618e8f', 1400, 85),
}

export const plans = [
  { name: 'Strength', detail: 'Build a stronger base with focused training.', prices: [['1 month', '₹1,500'], ['3 months', '₹4,000'], ['6 months', '₹7,000'], ['12 months', '₹12,500']], featured: false },
  { name: 'Cardio', detail: 'Keep your energy and conditioning moving.', prices: [['1 month', '₹2,000'], ['3 months', '₹5,000'], ['6 months', '₹8,000'], ['12 months', '₹15,000']], featured: true },
  { name: 'Couples membership', detail: 'Train together and make consistency shared.', prices: [['1 month', '₹3,000'], ['3 months', '₹7,500'], ['6 months', '₹12,000'], ['12 months', '₹18,500']], featured: false },
  { name: 'Students · Strength', detail: 'A focused strength plan at a student-friendly rate.', prices: [['1 month', '₹1,200'], ['3 months', '₹3,300'], ['6 months', '₹6,000'], ['12 months', '₹10,800']], featured: false },
]

export const personalTraining = [
  { name: '1 person', price: '₹5,000 / month' },
  { name: '2 persons · combo', price: '₹8,000 / month' },
]

export const additionalCharges = [
  { name: 'Registration fee', price: '₹200' },
  { name: 'Additional trial visit', price: '₹200' },
]

export const fitnessGoals = [
  'Build strength',
  'Lose fat and get lean',
  'Improve mobility',
  'Train for an event',
  'General fitness',
  'Not sure yet',
]

export const trainers = [
  {
    name: 'Aarav Mehta',
    role: 'Strength & Conditioning',
    years: '8 years coaching',
    image: unsplash('photo-1532029837206-abbe2b7620e3', 900),
    alt: 'Strength coach bench pressing a loaded barbell during a training session',
    specialties: ['Powerlifting', 'Beginner strength', 'Athletic performance'],
    bio: 'Aarav builds quiet confidence through the basics — thoughtful programming, clean technique and steady progress you can feel outside the gym.',
  },
  {
    name: 'Meera Kapoor',
    role: 'Mobility & Conditioning',
    years: '6 years coaching',
    image: unsplash('photo-1548690312-e3b507d8c110', 900),
    alt: 'Conditioning coach holding battle ropes in a brick-walled training studio',
    specialties: ['Mobility', 'Core strength', 'Conditioning'],
    bio: 'Meera blends mobility, breathwork and strength so you leave feeling taller, steadier and more capable in the way you move every day.',
  },
  {
    name: 'Kabir Rao',
    role: 'Functional Training',
    years: '7 years coaching',
    image: unsplash('photo-1526506118085-60ce8714f8c5', 900),
    alt: 'Functional training coach performing a pull-up on a gym rig',
    specialties: ['Calisthenics', 'Endurance', 'Fat loss'],
    bio: 'Kabir turns everyday movement into real capability. Expect focused sessions, smart progressions and a little more belief in what you can do.',
  },
]

export const testimonials = [
  {
    quote:
      'I came in wanting to feel stronger, not just look different. The coaching met me where I was and gave me a plan I could actually stick to.',
    name: 'Ananya R.',
    detail: 'Strength training · 8 months in',
    initials: 'AR',
    highlight: 'Deadlifting 60 kg',
    featured: false,
  },
  {
    quote:
      'No shouting, no pressure, no mirrors full of ego. Just good people, thoughtful sessions and a room that makes you want to show up.',
    name: 'Vikram S.',
    detail: 'Personal training · Member since 2024',
    initials: 'VS',
    highlight: 'Three sessions every week',
    featured: true,
  },
  {
    quote:
      'The small changes added up faster than I expected — better sleep, steadier energy and a routine that finally fits around real life.',
    name: 'Priya M.',
    detail: 'Functional fitness · 12-week progress',
    initials: 'PM',
    highlight: 'Stronger, week by week',
    featured: false,
  },
]

export const gallery = [
  {
    src: unsplash('photo-1517836357463-d25dfeac3438', 1400),
    alt: 'Close-up of a loaded barbell being lifted on a dark gym floor',
    caption: 'The strength floor',
    label: '01 / STRENGTH',
  },
  {
    src: unsplash('photo-1518611012118-696072aa579a', 1000),
    alt: 'Group mat class practising controlled core work in a light-filled studio',
    caption: 'Movement, together',
    label: '02 / CLASSES',
  },
  {
    src: unsplash('photo-1540497077202-7c8a3999166f', 1000),
    alt: 'Gym equipment arranged across a bright training floor',
    caption: 'Room to focus',
    label: '03 / THE SPACE',
  },
  {
    src: unsplash('photo-1534258936925-c58bed479fcb', 1000),
    alt: 'Battle ropes and strength equipment in a modern gym',
    caption: 'Conditioning sessions',
    label: '04 / CONDITIONING',
  },
  {
    src: unsplash('photo-1571019613454-1cb2f99b2d8b', 1000),
    alt: 'Athlete working through a core exercise on a mat in a sunlit studio',
    caption: 'Core & control',
    label: '05 / MOBILITY',
  },
  {
    src: unsplash('photo-1599058917212-d750089bc07e', 1400),
    alt: 'Athlete training with battle ropes in an open-air conditioning session',
    caption: 'Built for the work',
    label: '06 / COMMUNITY',
  },
]
