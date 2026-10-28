import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Clock3,
  Dumbbell,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import {
  contact,
  additionalCharges,
  fitnessGoals,
  gallery,
  personalTraining,
  photos,
  plans,
  testimonials,
  trainers,
  whatsapp,
  whatsappLink,
} from './content'
import { Reveal } from './components/Reveal'
import { WhatsAppIcon } from './components/WhatsAppIcon'

type EnquiryForm = {
  name: string
  phone: string
  interest: string
  message: string
}

type TrialForm = {
  name: string
  phone: string
  date: string
  time: string
  goal: string
}

function getTodayInputValue() {
  const now = new Date()
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return localNow.toISOString().slice(0, 10)
}

function formatDate(value: string) {
  if (!value) return 'Not specified'
  const date = new Date(`${value}T12:00:00`)

  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function formatTime(value: string) {
  if (!value) return 'Not specified'

  const [hours, minutes] = value.split(':').map(Number)
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return value

  const period = hours >= 12 ? 'PM' : 'AM'
  const hour = hours % 12 || 12

  return `${hour}:${String(minutes).padStart(2, '0')} ${period}`
}

function openWhatsApp(message: string) {
  const link = document.createElement('a')
  link.href = whatsappLink(message)
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [trialSent, setTrialSent] = useState(false)
  const [form, setForm] = useState<EnquiryForm>({
    name: '',
    phone: '',
    interest: 'Membership plans',
    message: '',
  })
  const [trial, setTrial] = useState<TrialForm>({
    name: '',
    phone: '',
    date: '',
    time: '',
    goal: fitnessGoals[0],
  })

  const minTrialDate = getTodayInputValue()
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const enquiry = `Hi HYDRA FITNESS,\n\nName: ${form.name}\nPhone: ${form.phone}\nInterested in: ${form.interest}\nMessage: ${form.message || 'No additional message'}\n\nI would like to know more about getting started.`

    openWhatsApp(enquiry)
    setSent(true)
  }

  function submitTrial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const booking = `Hi HYDRA FITNESS, I would like to book a free trial.\n\nName: ${trial.name}\nPhone: ${trial.phone}\nPreferred date: ${formatDate(trial.date)}\nPreferred time: ${formatTime(trial.time)}\nFitness goal: ${trial.goal}\n\nPlease confirm my free trial session. Thank you!`

    openWhatsApp(booking)
    setTrialSent(true)
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#main-content" onClick={closeMenu}>
          <span className="brand-mark"><Dumbbell size={19} strokeWidth={2.1} aria-hidden="true" /></span>
          <span>HYDRA<span className="brand-light"> FITNESS</span><small>TRAIN WITH PURPOSE</small></span>
        </a>

        <nav id="primary-navigation" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#facilities" onClick={closeMenu}>The space</a>
          <a href="#trainers" onClick={closeMenu}>Trainers</a>
          <a href="#membership" onClick={closeMenu}>Membership</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#location" onClick={closeMenu}>Visit</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#free-trial" onClick={closeMenu}>Free trial <MoveUpRight size={15} aria-hidden="true" /></a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Reveal><p className="eyebrow"><span className="eyebrow-dot" /> A BETTER KIND OF STRONG</p></Reveal>
            <h1 id="hero-title">Your strength.<br /><em>Your journey.</em></h1>
            <Reveal delay={0.16}>
              <p className="hero-description">A space to show up, find your rhythm, and get stronger — one session at a time.</p>
            </Reveal>
            <Reveal delay={0.23}>
              <div className="hero-actions">
                <a className="button button-dark" href="#free-trial">Book a free trial <ArrowRight size={17} aria-hidden="true" /></a>
                <a className="text-link" href="#membership">Find your membership <ArrowDownRight size={17} aria-hidden="true" /></a>
              </div>
            </Reveal>
            <div className="hero-note"><span className="note-line" /><span>BUILT AROUND YOU, NOT THE OTHER WAY AROUND.</span></div>
          </div>

          <div className="hero-visual">
            <div className="hero-3d-scene">
              <div className="scene-grid" />
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="depth-card depth-card-back" aria-hidden="true" />
              <div className="hero-photo hero-photo-3d">
                <img src={photos.hero} srcSet={photos.heroSrcSet} sizes="(max-width: 700px) 88vw, (max-width: 1100px) 46vw, 540px" alt="Rows of dumbbells on a rack in a bright, modern gym with strength training equipment" loading="eager" fetchPriority="high" decoding="async" />
                <div className="photo-shade" />
                <div className="photo-label"><span>YOUR NEXT CHAPTER</span><strong>Starts here.</strong></div>
                <div className="photo-index">HF / 001</div>
              </div>
              <div className="depth-card depth-card-front"><span><Dumbbell size={14} aria-hidden="true" /> HYDRA METHOD</span><strong>Strength<br /><em>in motion.</em></strong><small>TRAIN WITH PURPOSE</small></div>
              <div className="hero-stamp"><span>MOVE</span><span>WITH</span><span>INTENTION <ArrowDownRight size={15} aria-hidden="true" /></span></div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>01 — 04</span>
            <span className="hero-bottom-line" />
            <span>START WHERE YOU ARE</span>
            <a href="#approach" aria-label="Scroll to our approach"><ArrowDownRight size={19} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="steps-band" aria-label="Your fitness journey">
          <div className="steps-intro">GOOD THINGS TAKE<br />ONE STEP AT A TIME.</div>
          {[
            { n: '01', t: 'Choose your plan' },
            { n: '02', t: 'Make it yours' },
            { n: '03', t: 'Show up & train' },
            { n: '04', t: 'Find your strength' },
          ].map((step) => (
            <div className="step" key={step.n}>
              <span>{step.n}</span>
              <p>{step.t}</p>
              <ArrowRight size={15} className="step-arrow" aria-hidden="true" />
            </div>
          ))}
        </section>

        <section className="approach section-shell section-pad" id="approach" aria-labelledby="approach-title">
          <Reveal><p className="eyebrow">THE HYDRA APPROACH <span className="eyebrow-rule" /></p></Reveal>
          <div className="approach-grid">
            <Reveal><h2 id="approach-title">Progress isn't<br />a finish line.<br /><em>It's a practice.</em></h2></Reveal>
            <Reveal delay={0.1}>
              <div className="approach-text">
                <p className="large-copy">The strongest version of you is built in the little moments — the sessions you show up for, the habits you keep, the goals you keep reaching toward.</p>
                <p>HYDRA FITNESS is here to make those moments count. Find your pace, work with purpose, and build a routine that fits real life.</p>
                <a className="text-link underlined" href="#free-trial">Let's find your starting point <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </Reveal>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <span className="value-number">01</span>
              <div className="value-icon"><Dumbbell size={22} aria-hidden="true" /></div>
              <h3>Train with purpose</h3>
              <p>Make every session count with a routine that moves you toward your goals.</p>
            </div>
            <div className="value-card">
              <span className="value-number">02</span>
              <div className="value-icon"><Sparkles size={22} aria-hidden="true" /></div>
              <h3>Keep showing up</h3>
              <p>Consistency over perfection. Progress grows when you keep coming back.</p>
            </div>
            <div className="value-card">
              <span className="value-number">03</span>
              <div className="value-icon"><MoveUpRight size={22} aria-hidden="true" /></div>
              <h3>Make it your own</h3>
              <p>Your goals, your pace, your journey. Build a practice that belongs to you.</p>
            </div>
          </div>
        </section>

        <section className="space-section" id="facilities" aria-labelledby="space-title">
          <div className="space-image">
            <img src={photos.gym} loading="lazy" decoding="async" alt="Black-and-white view of an open gym floor with treadmills, benches and strength equipment" />
            <div className="space-image-tag">THE SPACE / 02</div>
          </div>
          <div className="space-copy">
            <Reveal>
              <p className="eyebrow">ROOM TO GET STRONGER</p>
              <h2 id="space-title">Made for the<br /><em>work that matters.</em></h2>
              <p className="space-description">A place to focus, move well, and put in the work. Come for the equipment. Stay for the feeling of getting better.</p>
              <ul className="feature-list">
                <li><Check size={16} aria-hidden="true" /> Strength & resistance training</li>
                <li><Check size={16} aria-hidden="true" /> Space to move at your pace</li>
                <li><Check size={16} aria-hidden="true" /> A routine built around your goals</li>
              </ul>
              <a className="button button-outline" href="#location">Come see the space <ArrowRight size={17} aria-hidden="true" /></a>
            </Reveal>
          </div>
        </section>

        <section className="training section-shell section-pad" aria-labelledby="training-title">
          <div className="training-heading">
            <Reveal><p className="eyebrow">YOUR WORK, YOUR WAY</p><h2 id="training-title">Every rep has<br /><em>a reason.</em></h2></Reveal>
            <Reveal delay={0.1}><p className="training-intro">Build strength. Improve your routine. Make time for yourself. Whatever brings you in, give yourself room to grow.</p></Reveal>
          </div>
          <div className="training-collage">
            <Reveal className="collage-card collage-large">
              <img src={photos.weights} loading="lazy" decoding="async" alt="Athlete lifting dumbbells from a rack during a strength session" />
              <div className="collage-caption"><span>01 / STRENGTH</span><strong>Build a stronger base.</strong></div>
            </Reveal>
            <Reveal className="collage-card collage-small" delay={0.12}>
              <img src={photos.training} loading="lazy" decoding="async" alt="Athlete performing a standing barbell curl in the gym" />
              <div className="collage-caption"><span>02 / CONSISTENCY</span><strong>Small steps. Real progress.</strong></div>
            </Reveal>
          </div>
        </section>

        <section className="membership-section" id="membership" aria-labelledby="membership-title">
          <div className="section-shell section-pad">
            <Reveal>
              <p className="eyebrow">MAKE ROOM FOR YOURSELF</p>
              <div className="membership-heading">
                <h2 id="membership-title">Find your<br /><em>kind of commitment.</em></h2>
                <p>Start with what works for you. Ask us about available plans, pricing, and the best way to get started.</p>
              </div>
            </Reveal>

            <div className="plans-grid">
              {plans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 0.08}>
                  <article className={plan.featured ? 'plan-card plan-featured' : 'plan-card'}>
                    {plan.featured && <span className="plan-badge">A GOOD PLACE TO START</span>}
                    <span className="plan-kicker">{`OPTION / 0${index + 1}`}</span>
                    <h3>{plan.name}</h3>
                    <p>{plan.detail}</p>
                    <div className="plan-prices" aria-label={`${plan.name} membership prices`}>
                      {plan.prices.map(([duration, price]) => (
                        <div className="plan-price-row" key={duration}><span>{duration}</span><strong>{price}</strong></div>
                      ))}
                    </div>
                    <a
                      className={plan.featured ? 'button button-light' : 'button button-outline'}
                      href="#contact"
                      onClick={() => setForm((current) => ({ ...current, interest: `${plan.name} membership` }))}
                    >
                      Ask about this plan <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="membership-extras">
              <div className="membership-extra">
                <span className="plan-kicker">PERSONAL TRAINING</span>
                {personalTraining.map((option) => <div className="extra-row" key={option.name}><span>{option.name}</span><strong>{option.price}</strong></div>)}
              </div>
              <div className="membership-extra">
                <span className="plan-kicker">ADDITIONAL CHARGES</span>
                {additionalCharges.map((charge) => <div className="extra-row" key={charge.name}><span>{charge.name}</span><strong>{charge.price}</strong></div>)}
              </div>
            </div>
            <p className="plans-note">All prices are from the HYDRA FITNESS fee structure. Contact us to confirm availability and start your plan.</p>
          </div>
        </section>

        <section className="trainers-section" id="trainers" aria-labelledby="trainers-title">
          <div className="section-shell section-pad">
            <Reveal>
              <div className="section-heading">
                <div>
                  <p className="eyebrow"><span className="eyebrow-dot" /> THE PEOPLE IN YOUR CORNER</p>
                  <h2 id="trainers-title">Good coaching.<br /><em>Great company.</em></h2>
                </div>
                <p className="section-intro">Real coaches who listen, notice the details and help you build a practice that lasts longer than a six-week sprint.</p>
              </div>
            </Reveal>

            <div className="trainers-grid">
              {trainers.map((trainer, index) => (
                <Reveal className="trainer-item" delay={index * 0.08} key={trainer.name}>
                  <article className="trainer-card">
                    <div className="trainer-media">
                      <img src={trainer.image} alt={trainer.alt} loading="lazy" decoding="async" />
                      <span className="trainer-number">{`0${index + 1} / COACH`}</span>
                      <span className="trainer-years">{trainer.years}</span>
                    </div>
                    <div className="trainer-body">
                      <h3>{trainer.name}</h3>
                      <p className="trainer-role">{trainer.role}</p>
                      <ul className="trainer-specialties" aria-label={`${trainer.name} specialties`}>
                        {trainer.specialties.map((specialty) => <li key={specialty}>{specialty}</li>)}
                      </ul>
                      <p className="trainer-bio">{trainer.bio}</p>
                      <a className="text-link trainer-link" href="#free-trial">Train with {trainer.name.split(' ')[0]} <ArrowRight size={15} aria-hidden="true" /></a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-title">
          <div className="section-shell section-pad">
            <Reveal>
              <div className="section-heading">
                <div>
                  <p className="eyebrow"><span className="eyebrow-dot" /> MEMBERS, IN THEIR OWN WORDS</p>
                  <h2 id="testimonials-title">The proof is<br /><em>in the practice.</em></h2>
                </div>
                <p className="section-intro">Different starting points, different goals, one shared habit: showing up for themselves.</p>
              </div>
            </Reveal>

            <div className="testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <Reveal className="testimonial-item" delay={index * 0.1} key={testimonial.name}>
                  <figure className={testimonial.featured ? 'testimonial-card testimonial-featured' : 'testimonial-card'}>
                    <div className="testimonial-top">
                      <span className="stars" role="img" aria-label="Rated 5 out of 5 stars">
                        {Array.from({ length: 5 }, (_, star) => (
                          <Star key={star} size={12} fill="currentColor" aria-hidden="true" />
                        ))}
                      </span>
                      <span className="testimonial-index">{`0${index + 1}`}</span>
                    </div>
                    <blockquote>{testimonial.quote}</blockquote>
                    <p className="testimonial-highlight">{testimonial.highlight}</p>
                    <figcaption>
                      <span className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</span>
                      <span><strong>{testimonial.name}</strong><small>{testimonial.detail}</small></span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
          <div className="section-shell section-pad">
            <Reveal>
              <div className="section-heading">
                <div>
                  <p className="eyebrow"><span className="eyebrow-dot" /> A LOOK INSIDE</p>
                  <h2 id="gallery-title">The space,<br /><em>in motion.</em></h2>
                </div>
                <p className="section-intro">Early mornings, heavy sets, quiet focus and the people who make the room feel like yours.</p>
              </div>
            </Reveal>

            <div className="gallery-grid">
              {gallery.map((image, index) => (
                <Reveal className="gallery-item" delay={index * 0.05} key={image.caption}>
                  <figure className="gallery-figure">
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                    <figcaption className="gallery-caption">
                      <span>{image.label}</span>
                      <strong>{image.caption}</strong>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="trial-section" id="free-trial" aria-labelledby="trial-title">
          <div className="trial-inner section-shell">
            <Reveal className="trial-copy">
              <p className="eyebrow trial-eyebrow"><span className="eyebrow-dot" /> YOUR FIRST SESSION, ON US</p>
              <h2 id="trial-title">Try HYDRA.<br /><em>Free.</em></h2>
              <p className="trial-intro">One coached session, a proper look around the space, and a simple plan for what comes next. No card. No commitment. Just a start.</p>
              <ul className="trial-perks">
                <li><Check size={16} aria-hidden="true" /> A session built around your goal</li>
                <li><Check size={16} aria-hidden="true" /> A walkthrough of the space and equipment</li>
                <li><Check size={16} aria-hidden="true" /> Clear next steps, at your pace</li>
              </ul>
              <p className="trial-aside">Prefer to talk it through first? <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat with HYDRA <MoveUpRight size={14} aria-hidden="true" /></a></p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="trial-card">
                <span className="trial-badge">FREE / FIRST VISIT</span>
                <h3>Book your free trial</h3>
                <p>Tell us when you would like to come in. We will reply on WhatsApp to confirm your session.</p>
                <form className="trial-form" onSubmit={submitTrial}>
                  <label className="full">Your name
                    <input
                      required
                      name="name"
                      value={trial.name}
                      onChange={(event) => setTrial((current) => ({ ...current, name: event.target.value }))}
                      placeholder="How should we call you?"
                      autoComplete="name"
                      maxLength={80}
                    />
                  </label>
                  <label className="full">Phone number
                    <input
                      required
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+()\s-]{7,20}"
                      title="Enter a valid phone number with at least 7 digits."
                      value={trial.phone}
                      onChange={(event) => setTrial((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="Your best contact number"
                      autoComplete="tel"
                      maxLength={20}
                    />
                  </label>
                  <label>Preferred date
                    <input
                      required
                      name="date"
                      type="date"
                      min={minTrialDate}
                      value={trial.date}
                      onChange={(event) => setTrial((current) => ({ ...current, date: event.target.value }))}
                    />
                  </label>
                  <label>Preferred time
                    <input
                      required
                      name="time"
                      type="time"
                      min="05:00"
                      max="22:00"
                      value={trial.time}
                      onChange={(event) => setTrial((current) => ({ ...current, time: event.target.value }))}
                    />
                  </label>
                  <label className="full">Fitness goal
                    <select
                      required
                      name="goal"
                      value={trial.goal}
                      onChange={(event) => setTrial((current) => ({ ...current, goal: event.target.value }))}
                    >
                      {fitnessGoals.map((goal) => <option key={goal}>{goal}</option>)}
                    </select>
                  </label>
                  <button className="button button-dark trial-submit" type="submit">
                    Open WhatsApp with my details <WhatsAppIcon size={17} />
                  </button>
                  <p className="form-privacy trial-privacy">WhatsApp will open with everything filled in. Review the message and press Send — nothing is submitted until you do.</p>
                  {trialSent && <p className="form-status trial-status" role="status">WhatsApp opened with your trial request. Press Send in WhatsApp to confirm your session.</p>}
                </form>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="location-section" id="location" aria-labelledby="location-title">
          <div className="location-inner section-shell">
            <div className="location-copy">
              <Reveal>
                <p className="eyebrow">COME AS YOU ARE</p>
                <h2 id="location-title">Find your way<br /><em>to stronger.</em></h2>
                <p className="location-intro">Close enough for an early session, calm enough to stay for the whole one. Here is where to find us.</p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="location-details">
                  <div className="location-detail location-address-block">
                    <h3><MapPin size={14} aria-hidden="true" /> Visit us</h3>
                    <address className="location-address">
                      {contact.addressLines.map((line, index) => (
                        <span className={index === 0 ? 'address-name' : undefined} key={line}>{line}</span>
                      ))}
                    </address>
                    <a className="text-link underlined location-directions" href={contact.directions} target="_blank" rel="noopener noreferrer">
                      Get directions <MoveUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>

                  <div className="location-detail">
                    <h3><Clock3 size={14} aria-hidden="true" /> Opening hours</h3>
                    <ul className="hours-list">
                      {contact.hours.map((entry) => (
                        <li key={entry.days}><span>{entry.days}</span><span>{entry.time}</span></li>
                      ))}
                    </ul>
                    <p className="location-smallprint">Hours may vary on public holidays.</p>
                  </div>

                  <div className="location-detail">
                    <h3><Phone size={14} aria-hidden="true" /> Talk to us</h3>
                    {contact.phones.map((phone) => <a className="location-contact" href={`tel:+91${phone}`} key={phone}><Phone size={14} aria-hidden="true" /> +91 {phone}</a>)}
                    <a className="location-contact" href={`mailto:${contact.email}`}><Mail size={14} aria-hidden="true" /> {contact.email}</a>
                    <a className="text-link location-whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      WhatsApp us <WhatsAppIcon size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="location-map" delay={0.12}>
              <div className="map-frame">
                <div className="map-fallback" aria-hidden="true">
                  <MapPin size={28} />
                  <span>HYDRA FITNESS<br />{contact.city.toUpperCase()}</span>
                </div>
                <iframe
                  src={contact.mapEmbed}
                  title={`Google Maps showing the area around A.N.U University and RTPDK Villa Road in ${contact.city}, ${contact.region}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="map-label">
                  <span><MapPin size={14} aria-hidden="true" /> HYDRA FITNESS</span>
                  <small>{contact.city.toUpperCase()}, {contact.region.toUpperCase()}</small>
                </div>
              </div>
              <p className="map-note">{contact.mapNote}</p>
            </Reveal>
          </div>
        </section>

        <section className="closing-quote section-shell" aria-label="A note to begin">
          <Reveal>
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>You don't have to be ready.<br />You just have to <em>begin.</em></blockquote>
            <p>YOUR NEXT SESSION IS A GOOD PLACE TO START.</p>
          </Reveal>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner section-shell">
            <Reveal>
              <p className="eyebrow">YOUR FIRST STEP STARTS HERE</p>
              <h2 id="contact-title">Let's get<br /><em>you moving.</em></h2>
              <p className="contact-intro">Tell us a little about what you're looking for. We'll help you find the right place to begin.</p>
              <div className="contact-side-note"><span className="note-line" /> NO PRESSURE. JUST A CONVERSATION.</div>
            </Reveal>

            <Reveal delay={0.1}>
              <form className="contact-form" onSubmit={submitForm}>
                <label>Your name
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="How should we call you?"
                    autoComplete="name"
                    maxLength={80}
                  />
                </label>
                <label>Phone number
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9+()\s-]{7,20}"
                    title="Enter a valid phone number with at least 7 digits."
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="Your best contact number"
                    autoComplete="tel"
                    maxLength={20}
                  />
                </label>
                <label>I'm interested in
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
                  >
                    <option>Membership plans</option>
                    <option>Monthly membership</option>
                    <option>Quarterly membership</option>
                    <option>Annual membership</option>
                    <option>Facilities and gym tour</option>
                    <option>Free trial</option>
                    <option>General enquiry</option>
                  </select>
                </label>
                <label>Anything else? <span className="optional">OPTIONAL</span>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="Tell us what your goals are…"
                    maxLength={500}
                  />
                </label>
                <button className="button button-dark form-submit" type="submit">
                  Open WhatsApp enquiry <ArrowRight size={17} aria-hidden="true" />
                </button>
                <p className="form-privacy">WhatsApp will open with your enquiry ready. Review it and press Send to submit.</p>
                {sent && <p className="form-status" role="status">WhatsApp opened with your enquiry. Press Send in WhatsApp to submit it.</p>}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#main-content">
          <span className="brand-mark"><Dumbbell size={19} aria-hidden="true" /></span>
          <span>HYDRA<span className="brand-light"> FITNESS</span><small>TRAIN WITH PURPOSE</small></span>
        </a>
        <div className="footer-mid">
          <span className="footer-note">A STRONGER YOU, ONE SESSION AT A TIME.</span>
          {contact.phones.map((phone) => <a href={`tel:+91${phone}`} key={phone}>+91 {phone}</a>)}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#approach">Approach</a>
          <a href="#trainers">Trainers</a>
          <a href="#membership">Membership</a>
          <a href="#gallery">Gallery</a>
          <a href="#free-trial">Free trial</a>
          <a href="#location">Visit</a>
          <a href="#contact">Contact</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with HYDRA FITNESS on WhatsApp">
            <WhatsAppIcon size={16} />
          </a>
        </nav>
        <span className="copyright">© {new Date().getFullYear()} HYDRA FITNESS</span>
      </footer>

      <a
        className="whatsapp-fab"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="whatsapp-fab-icon"><WhatsAppIcon size={23} /></span>
        <span className="whatsapp-fab-copy"><small>WHATSAPP</small><strong>Chat with HYDRA</strong></span>
      </a>
    </>
  )
}
