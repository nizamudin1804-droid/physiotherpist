/**
 * KineticPulse Physiotherapy - Interactive Booking Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('booking-wizard')) return;
  initBookingWizard();
});

function initBookingWizard() {
  const state = {
    step: 1,
    service: {
      id: 'initial-assessment',
      name: 'Comprehensive Biomechanical Assessment & Diagnosis',
      price: '$95',
      duration: '60 Mins',
      desc: 'Complete physical assessment, posture analysis, orthopedic testing & personalized recovery plan.'
    },
    doctor: {
      id: 'dr-elena',
      name: 'Dr. Elena Vance, DPT, OCS',
      title: 'Head of Orthopedic & Spinal Rehabilitation',
      fee: '$95 / Session'
    },
    date: null,
    time: null,
    patient: {
      name: '',
      email: '',
      phone: '',
      painArea: 'Lower Back / Spine',
      painLevel: 5,
      insurance: 'Self-Pay / Private',
      notes: ''
    },
    bookingId: null
  };

  // Check URL parameters for pre-selected service or doctor
  const urlParams = new URLSearchParams(window.location.search);
  const paramService = urlParams.get('service');
  const paramDoctor = urlParams.get('doctor');

  // DOM Elements
  const stepElements = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4'),
    document.getElementById('step-5')
  ];

  const stepIndicators = document.querySelectorAll('.wizard-step-indicator');
  const painSlider = document.getElementById('pain-range-slider');
  const painValueDisplay = document.getElementById('pain-value-display');
  const painSeverityText = document.getElementById('pain-severity-text');

  // Pain Slider Interaction
  if (painSlider && painValueDisplay) {
    const updatePainDisplay = (val) => {
      state.patient.painLevel = val;
      painValueDisplay.textContent = `${val}/10`;
      
      let severity = 'Mild Discomfort (Occasional stiffness)';
      let colorClass = 'text-emerald-600';
      if (val >= 4 && val <= 6) {
        severity = 'Moderate Pain (Limits daily activities/work)';
        colorClass = 'text-amber-600';
      } else if (val >= 7 && val <= 8) {
        severity = 'Severe Pain (Sharp, radiating or constant)';
        colorClass = 'text-orange-600';
      } else if (val >= 9) {
        severity = 'Acute / Severe Agony (Requires urgent priority triage)';
        colorClass = 'text-red-600';
      }
      if (painSeverityText) {
        painSeverityText.textContent = severity;
        painSeverityText.className = `text-xs font-semibold mt-1 ${colorClass}`;
      }
    };

    painSlider.addEventListener('input', (e) => updatePainDisplay(e.target.value));
    updatePainDisplay(painSlider.value || 5);
  }

  // Populate dynamic dates (next 14 days)
  populateCalendarDates(state);

  // Service Selection Cards
  const serviceCards = document.querySelectorAll('.service-select-card');
  serviceCards.forEach(card => {
    if (paramService && card.dataset.serviceId === paramService) {
      card.click();
    }
    card.addEventListener('click', () => {
      serviceCards.forEach(c => {
        c.classList.remove('border-teal-600', 'bg-teal-50/40', 'ring-2', 'ring-teal-500/20');
        c.classList.add('border-slate-200');
        c.querySelector('.radio-dot')?.classList.add('hidden');
      });
      card.classList.add('border-teal-600', 'bg-teal-50/40', 'ring-2', 'ring-teal-500/20');
      card.classList.remove('border-slate-200');
      card.querySelector('.radio-dot')?.classList.remove('hidden');

      state.service = {
        id: card.dataset.serviceId,
        name: card.dataset.serviceName,
        price: card.dataset.servicePrice,
        duration: card.dataset.serviceDuration,
        desc: card.dataset.serviceDesc
      };
      updateSummarySidebar(state);
    });
  });

  // Doctor Selection Cards
  const doctorCards = document.querySelectorAll('.doctor-select-card');
  doctorCards.forEach(card => {
    if (paramDoctor && card.dataset.doctorId === paramDoctor) {
      card.click();
    }
    card.addEventListener('click', () => {
      doctorCards.forEach(c => {
        c.classList.remove('border-teal-600', 'bg-teal-50/40', 'ring-2', 'ring-teal-500/20');
        c.classList.add('border-slate-200');
        c.querySelector('.radio-dot')?.classList.add('hidden');
      });
      card.classList.add('border-teal-600', 'bg-teal-50/40', 'ring-2', 'ring-teal-500/20');
      card.classList.remove('border-slate-200');
      card.querySelector('.radio-dot')?.classList.remove('hidden');

      state.doctor = {
        id: card.dataset.doctorId,
        name: card.dataset.doctorName,
        title: card.dataset.doctorTitle,
        fee: card.dataset.doctorFee
      };
      updateSummarySidebar(state);
    });
  });

  // Next / Prev Buttons
  document.querySelectorAll('[data-wizard-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const direction = btn.dataset.wizardNav;
      if (direction === 'next') {
        if (validateStep(state.step, state)) {
          goToStep(state.step + 1);
        }
      } else if (direction === 'prev') {
        goToStep(state.step - 1);
      }
    });
  });

  // Form Submission (Step 4 -> Step 5)
  const patientForm = document.getElementById('patient-details-form');
  if (patientForm) {
    patientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('pat-fname')?.value.trim();
      const lastName = document.getElementById('pat-lname')?.value.trim();
      const email = document.getElementById('pat-email')?.value.trim();
      const phone = document.getElementById('pat-phone')?.value.trim();
      const painArea = document.getElementById('pat-pain-area')?.value;
      const insurance = document.getElementById('pat-insurance')?.value;
      const notes = document.getElementById('pat-notes')?.value.trim();

      if (!firstName || !phone || !email) {
        window.showToast('Missing Fields', 'Please provide your full name, phone number, and email address.', 'warning');
        return;
      }

      state.patient.name = `${firstName} ${lastName}`;
      state.patient.email = email;
      state.patient.phone = phone;
      state.patient.painArea = painArea || 'General Musculoskeletal';
      state.patient.insurance = insurance || 'Self-Pay';
      state.patient.notes = notes || 'None specified';

      // Generate Reference Code
      state.bookingId = 'KP-' + Math.floor(10000 + Math.random() * 90000);

      // ============================================
      // EMAIL BHEJNE KA CODE (FORMSUBMIT AJAX) - SAHI KIYA GAYA
      // ============================================
      const emailData = {
        _subject: `New Appointment Booked: ${state.bookingId}`,
        Booking_ID: state.bookingId,
        Patient_Name: state.patient.name,
        Patient_Phone: state.patient.phone,
        Patient_Email: state.patient.email,
        Service: state.service.name,
        Doctor: state.doctor.name,
        Date: state.date,
        Time: state.time,
        Pain_Area: state.patient.painArea,
        Pain_Level: state.patient.painLevel,
        Insurance: state.patient.insurance,
        Notes: state.patient.notes
      };

      console.log('Sending email with data:', emailData);

      fetch("https://formsubmit.co/ajax/nizamudin1804@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
      })
      .then(response => {
        console.log('FormSubmit response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log("Email sent to clinic successfully:", data);
        if (data.success) {
          window.showToast('Email Sent!', 'Confirmation email sent to clinic.', 'success');
        } else {
          console.warn('FormSubmit response:', data);
        }
      })
      .catch(error => {
        console.error("Email sending failed:", error);
        // Email fail ho jaye toh bhi booking confirm karein
        window.showToast('Note', 'Booking saved locally. Email notification may be delayed.', 'warning');
      });
      // ============================================

      // Save to LocalStorage
      const appointments = JSON.parse(localStorage.getItem('kp_appointments') || '[]');
      appointments.unshift({
        id: state.bookingId,
        service: state.service.name,
        doctor: state.doctor.name,
        date: state.date,
        time: state.time,
        price: state.service.price,
        name: state.patient.name,
        phone: state.patient.phone,
        email: state.patient.email,
        painArea: state.patient.painArea,
        painLevel: state.patient.painLevel,
        bookedAt: new Date().toISOString()
      });
      localStorage.setItem('kp_appointments', JSON.stringify(appointments));

      // Update Confirmation Screen
      populateConfirmationScreen(state);

      // Go to Step 5
      goToStep(5);
      window.showToast('Appointment Confirmed!', `Booking #${state.bookingId} created successfully.`, 'success');
      
      // Update badge in navbar
      const badge = document.querySelector('.my-appointments-count');
      if (badge) {
        badge.textContent = appointments.length;
        badge.classList.remove('hidden');
      }
    });
  }

  function goToStep(newStep) {
    if (newStep < 1 || newStep > 5) return;
    state.step = newStep;

    stepElements.forEach((el, idx) => {
      if (el) {
        if (idx + 1 === newStep) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    // Update Progress bar & step circles
    stepIndicators.forEach((ind, idx) => {
      const circle = ind.querySelector('.step-circle');
      const label = ind.querySelector('.step-label');
      if (idx + 1 < newStep) {
        // Completed
        circle.className = 'step-circle w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-teal-600 text-white';
        circle.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
        if (label) label.className = 'step-label text-xs font-semibold text-teal-800';
      } else if (idx + 1 === newStep) {
        // Current
        circle.className = 'step-circle w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-teal-600 text-white ring-4 ring-teal-100';
        circle.textContent = idx + 1;
        if (label) label.className = 'step-label text-xs font-bold text-teal-700';
      } else {
        // Pending
        circle.className = 'step-circle w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-500 border border-slate-200';
        circle.textContent = idx + 1;
        if (label) label.className = 'step-label text-xs font-medium text-slate-400';
      }
    });

    updateSummarySidebar(state);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  function validateStep(step, st) {
    if (step === 1) {
      if (!st.service.id) {
        window.showToast('Please select a service', 'Choose one clinical service or assessment type to proceed.', 'warning');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!st.doctor.id) {
        window.showToast('Please select a specialist', 'Choose a physiotherapist or select any available clinician.', 'warning');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!st.date || !st.time) {
        window.showToast('Date & Time Required', 'Please select both an appointment date and an available time slot.', 'warning');
        return false;
      }
      return true;
    }
    return true;
  }

  function updateSummarySidebar(st) {
    const summaryService = document.getElementById('summary-service-name');
    const summaryDoctor = document.getElementById('summary-doctor-name');
    const summaryDateTime = document.getElementById('summary-datetime');
    const summaryPrice = document.getElementById('summary-price');
    const summaryDuration = document.getElementById('summary-duration');

    if (summaryService) summaryService.textContent = st.service.name || 'Not selected';
    if (summaryDoctor) summaryDoctor.textContent = st.doctor.name || 'Not selected';
    if (summaryPrice) summaryPrice.textContent = st.service.price || '--';
    if (summaryDuration) summaryDuration.textContent = st.service.duration || '--';
    if (summaryDateTime) {
      if (st.date && st.time) {
        summaryDateTime.innerHTML = `<span class="text-teal-700 font-semibold">${st.date}</span> at <span class="text-teal-700 font-semibold">${st.time}</span>`;
      } else if (st.date) {
        summaryDateTime.textContent = `${st.date} (Select a time)`;
      } else {
        summaryDateTime.textContent = 'Date & slot not selected';
      }
    }
  }

  function populateConfirmationScreen(st) {
    const refCode = document.getElementById('confirm-ref-code');
    const serviceName = document.getElementById('confirm-service-name');
    const doctorName = document.getElementById('confirm-doctor-name');
    const dateTime = document.getElementById('confirm-datetime');
    const patientName = document.getElementById('confirm-patient-name');
    const patientContact = document.getElementById('confirm-patient-contact');
    const painArea = document.getElementById('confirm-pain-area');

    if (refCode) refCode.textContent = st.bookingId;
    if (serviceName) serviceName.textContent = st.service.name;
    if (doctorName) doctorName.textContent = st.doctor.name;
    if (dateTime) dateTime.textContent = `${st.date} @ ${st.time}`;
    if (patientName) patientName.textContent = st.patient.name;
    if (patientContact) patientContact.textContent = `${st.patient.phone} | ${st.patient.email}`;
    if (painArea) painArea.textContent = `${st.patient.painArea} (Severity ${st.patient.painLevel}/10)`;
  }
}

function populateCalendarDates(state) {
  const container = document.getElementById('dates-container');
  if (!container) return;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const today = new Date();
  container.innerHTML = '';

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const isSunday = d.getDay() === 0;
    const dateFormatted = `${daysOfWeek[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
    const dayName = i === 0 ? 'Today' : (i === 1 ? 'Tomorrow' : daysOfWeek[d.getDay()]);

    const dateBtn = document.createElement('button');
    dateBtn.type = 'button';
    dateBtn.className = `flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
      isSunday 
        ? 'opacity-40 bg-slate-50 border-slate-200 cursor-not-allowed' 
        : 'border-slate-200 bg-white hover:border-teal-500 hover:shadow-md cursor-pointer'
    }`;
    
    if (isSunday) {
      dateBtn.disabled = true;
      dateBtn.innerHTML = `
        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">${dayName}</span>
        <span class="text-base font-extrabold text-slate-400 mt-0.5">${d.getDate()}</span>
        <span class="text-[9px] font-medium text-slate-400 mt-1">Closed</span>
      `;
    } else {
      dateBtn.innerHTML = `
        <span class="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">${dayName}</span>
        <span class="text-base font-extrabold text-slate-800 mt-0.5">${d.getDate()}</span>
        <span class="text-[9px] font-medium text-teal-600 mt-1">Available</span>
      `;

      dateBtn.addEventListener('click', () => {
        container.querySelectorAll('button').forEach(b => {
          b.classList.remove('border-teal-600', 'bg-teal-50', 'ring-2', 'ring-teal-500');
          b.classList.add('border-slate-200', 'bg-white');
        });
        dateBtn.classList.remove('border-slate-200', 'bg-white');
        dateBtn.classList.add('border-teal-600', 'bg-teal-50', 'ring-2', 'ring-teal-500');

        state.date = dateFormatted;
        const selDateDisplay = document.getElementById('selected-date-display');
        if (selDateDisplay) selDateDisplay.textContent = dateFormatted;
        
        // Populate or activate time slots
        activateTimeSlots(state);
      });
    }

    container.appendChild(dateBtn);

    // Pre-select first weekday
    if (!state.date && !isSunday) {
      setTimeout(() => dateBtn.click(), 50);
    }
  }
}

function activateTimeSlots(state) {
  const slotButtons = document.querySelectorAll('.time-slot-btn');
  slotButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('opacity-40', 'cursor-not-allowed');

    btn.onclick = () => {
      slotButtons.forEach(b => {
        b.classList.remove('bg-teal-600', 'text-white', 'border-teal-600', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      btn.classList.add('bg-teal-600', 'text-white', 'border-teal-600', 'shadow-md');

      state.time = btn.dataset.timeSlot;
      const selTimeDisplay = document.getElementById('selected-time-display');
      if (selTimeDisplay) selTimeDisplay.textContent = state.time;

      // Update sidebar
      const summaryDateTime = document.getElementById('summary-datetime');
      if (summaryDateTime && state.date) {
        summaryDateTime.innerHTML = `<span class="text-teal-700 font-semibold">${state.date}</span> at <span class="text-teal-700 font-semibold">${state.time}</span>`;
      }
    };
  });
}
