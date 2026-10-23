# KineticPulse Physiotherapy & Sports Rehabilitation Clinic Website

A modern, clinical-grade, zero-dependency multi-page web application designed specifically for physiotherapy, sports medicine, spine centers, and rehabilitation clinics.

---

## 🌟 Key Features

- **Modern Medical UI/UX:** Clean, trustworthy, and calming clinical aesthetics with Tailwind CSS, Plus Jakarta Sans & Inter typography, subtle glassmorphic navigation, micro-interactions, and high-contrast accessibility.
- **Interactive Body Anatomy & Pain Navigator:** Instant filtering by anatomical zone (Neck & Cervical, Lumbar Spine, Shoulder, Knee, Ankle, Sports Injuries).
- **5-Step Interactive Online Appointment Scheduler:**
  - Step 1: Select Service / Assessment Type
  - Step 2: Choose Specialist Clinician
  - Step 3: Dynamic 14-day date picker & morning/afternoon/evening time slots
  - Step 4: Patient information with interactive 1-to-10 Visual Pain Slider
  - Step 5: Instant booking confirmation with reference code (`KP-XXXXX`), printable receipt, and persistence in `localStorage`.
- **"My Sessions" Slide-Out Drawer:** Patients can view, review, or cancel their booked clinical appointments right from the top bar across all pages.
- **Interactive Rehab Exercise Library:**
  - Searchable by condition, muscle target, or difficulty.
  - Interactive hold and rep countdown timer with audio-visual cues.
  - "Add to My Daily Routine" manager with printable home prescription slips.
- **10 Complete Inner Pages (Everything Physiotherapy Related):**
  1. `index.html` - High-conversion homepage with anatomy navigator, trust badges, stats, 4-step recovery roadmap, doctor profiles, and FAQs.
  2. `services.html` - 8 Specialized Services (Spinal Decompression, Sports Conditioning, Radial Shockwave, Class IV Laser, Dry Needling, Neuro Rehab, Post-Op Care).
  3. `conditions.html` - 12 Major Musculoskeletal Conditions with real-time live search, symptoms, causes, clinical treatments, and red-flag notices.
  4. `booking.html` - Full multi-step interactive appointment booking engine.
  5. `exercises.html` - Therapeutic exercise library with real-time search and built-in hold timer.
  6. `about.html` - Clinic mission, DPT specialist profiles, facility technology (AlterG, force plates, private acoustic suites).
  7. `pricing.html` - Transparent per-session pricing, 5- and 10-session discounted recovery bundles, and insurance direct billing guide.
  8. `case-studies.html` - 4 In-depth documented clinical case studies with before/after pain scores (VAS) and range-of-motion metrics.
  9. `blog.html` - Evidence-based articles (ergonomics, tendon loading, RICE vs PEACE & LOVE, sciatica nerve tension, MRI myths).
  10. `contact.html` - 2 Physical clinic branch locations with hours, parking notes, Google map integration, virtual telehealth, and triage form.

---

## 🚀 How to Run & Preview

This website is completely self-contained with **zero build steps** and **zero dependencies** to install!

1. **Directly in Any Web Browser:**
   - Double-click `index.html` or open any `.html` file directly in Google Chrome, Microsoft Edge, Opera, or Firefox.

2. **Using Any Local Server (Optional):**
   - If using VS Code: Right click `index.html` and select **"Open with Live Server"**.
   - If Python is installed: `python -m http.server 8000`
   - If Node.js is installed: `npx serve .`

---

## 📁 File Structure

```
phyasiotherpist/
├── index.html                  # Homepage with Interactive Anatomy & Quick Booking
├── services.html               # 8 Specialized Clinical Services & Modalities
├── conditions.html             # 12 Conditions Treated with Real-Time Search
├── booking.html                # 5-Step Online Appointment Scheduler Wizard
├── exercises.html              # Rehab Exercise Library with Interactive Timer
├── about.html                  # Clinic Mission, Doctors of Physical Therapy, Facilities
├── pricing.html                # Transparent Fees, Multi-Session Bundles & Insurance
├── case-studies.html           # 4 Documented Clinical Recovery Audits & Metrics
├── blog.html                   # Physiotherapy Knowledge Hub & Ergonomics Guides
├── contact.html                # 2 Clinic Locations, Telehealth Care & Triage Form
├── README.md                   # Complete Documentation
└── assets/
    ├── css/
    │   └── custom.css          # Glassmorphism, animations, pain slider & print styles
    └── js/
        ├── main.js             # Mobile menu, drawer, toasts, modal, accordions
        ├── booking.js          # Multi-step booking state engine & localStorage
        └── exercises.js        # Exercise database, filter, & hold timer
```

---

## 🛡️ Regulatory & Clinical Compliance
- Direct Access Ready (No referral required)
- HIPAA / GDPR Privacy compliant layout
- Red Flag Triage notifications for acute medical emergencies
- Direct Insurance Claims (Bupa, AXA, Cigna, BlueCross, Medicare)
