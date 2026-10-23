/**
 * KineticPulse Physiotherapy - Exercise Rehab & Routine Library
 */

const exercisesDatabase = [
  {
    id: 'ex-1',
    title: 'Chin Tucks (Cervical Retraction)',
    category: 'neck',
    level: 'Gentle Mobility',
    target: 'Deep Cervical Flexors & Suboccipital Muscles',
    indication: 'Forward head posture, text neck, cervicogenic headaches, upper cervical stiffness.',
    duration: 'Hold 5s • 10 Reps • 3 Sets',
    holdSec: 5,
    reps: 10,
    steps: [
      'Sit or stand upright with shoulders relaxed and back against a flat surface.',
      'Look straight ahead without tilting your chin down or up.',
      'Gently glide your head straight backward as if making a subtle double chin.',
      'Hold the retracted position for 5 seconds, feeling a gentle stretch at the base of the skull.',
      'Slowly release back to neutral and repeat for 10 repetitions.'
    ],
    precautions: 'Do not tilt your head down toward your chest; the motion is a horizontal backward glide.'
  },
  {
    id: 'ex-2',
    title: 'Cat-Cow Spinal Mobilization',
    category: 'spine',
    level: 'Gentle Mobility',
    target: 'Thoracic & Lumbar Spine, Erector Spinae',
    indication: 'Mid-back stiffness, general lumbar tight sensations, desk-bound spinal decompression.',
    duration: 'Slow Flow • 12 Reps • 2 Sets',
    holdSec: 4,
    reps: 12,
    steps: [
      'Begin on all fours on a padded mat with wrists under shoulders and knees under hips.',
      'Inhale as you gently drop your belly toward the mat, lifting your chest and gaze upward (Cow pose).',
      'Exhale as you press the ground away, rounding your spine up toward the ceiling and tucking your tailbone (Cat pose).',
      'Move fluidly with your breath for 10-12 rhythmic cycles.'
    ],
    precautions: 'Avoid forced extension if experiencing sharp pinching sensations in the lower back.'
  },
  {
    id: 'ex-3',
    title: 'Bird-Dog Dynamic Core Stabilization',
    category: 'spine',
    level: 'Isometric / Stability',
    target: 'Multifidus, Transverse Abdominis, Gluteus Maximus',
    indication: 'Chronic lower back pain, spinal instability, SI joint discomfort.',
    duration: 'Hold 3s • 10 Reps per side • 3 Sets',
    holdSec: 3,
    reps: 10,
    steps: [
      'Start on hands and knees with a neutral, flat spine and engaged core.',
      'Simultaneously reach your right arm straight forward and left leg straight back until parallel to floor.',
      'Maintain hips square to the ground without rotating or arching the lower back.',
      'Hold for 3 seconds, return slowly to start, and alternate to the opposite side.'
    ],
    precautions: 'Do not raise arm or leg higher than hip/shoulder level to prevent lumbar hyperextension.'
  },
  {
    id: 'ex-4',
    title: 'Rotator Cuff External Rotation with Band',
    category: 'shoulder',
    level: 'Progressive Strength',
    target: 'Infraspinatus, Teres Minor, Scapular Stabilizers',
    indication: 'Shoulder impingement, rotator cuff tendinopathy, throwing/overhead sports rehab.',
    duration: 'Controlled Tempo • 12-15 Reps • 3 Sets',
    holdSec: 2,
    reps: 12,
    steps: [
      'Fix a resistance band at elbow height. Stand sideways with active upright posture.',
      'Tuck a small rolled towel between your elbow and ribcage to prevent compensatory arm flaring.',
      'Bend elbow to 90 degrees and pull the band outward away from your abdomen while keeping elbow pinned.',
      'Pause for 2 seconds at the outer range, then return slowly under control (3-second eccentric release).'
    ],
    precautions: 'Do not twist your trunk to move the band; isolation must come purely from the shoulder rotator cuff.'
  },
  {
    id: 'ex-5',
    title: 'Prone Scapular Y-to-W Extensions',
    category: 'shoulder',
    level: 'Isometric / Stability',
    target: 'Lower Trapezius, Rhomboids, Posterior Deltoid',
    indication: 'Rounded shoulders, scapular winging, shoulder impingement syndrome.',
    duration: 'Hold 3s • 10 Reps • 3 Sets',
    holdSec: 3,
    reps: 10,
    steps: [
      'Lie face down on an exercise mat with forehead resting lightly on a small towel.',
      'Extend arms out in a "Y" position with thumbs pointing straight toward the ceiling.',
      'Squeeze shoulder blades down and together to lift arms 2-3 inches off the ground.',
      'Bend elbows pulling down into a "W" shape, hold for 3 seconds, and slowly reset.'
    ],
    precautions: 'Avoid shrugging shoulders up toward the ears. Focus the tension on mid-to-lower back.'
  },
  {
    id: 'ex-6',
    title: 'Glute Bridge with Resistance Band Loop',
    category: 'hip',
    level: 'Isometric / Stability',
    target: 'Gluteus Maximus, Gluteus Medius, Hamstrings',
    indication: 'Glute amnesia, patellofemoral knee pain, anterior pelvic tilt, hip impingement.',
    duration: 'Hold 3s • 15 Reps • 3 Sets',
    holdSec: 3,
    reps: 15,
    steps: [
      'Lie flat on your back with knees bent at 90 degrees, feet hip-width flat on the floor.',
      'Place a light mini-band just above your knees, maintaining light outward tension.',
      'Engage your abdominals and drive through your heels to elevate hips until thighs and torso align.',
      'Squeeze glutes hard at the apex for 3 seconds without overarching your lower back.',
      'Slowly lower down one vertebra at a time.'
    ],
    precautions: 'Ensure the lift comes from the glutes and hips, not by hyper-extending the lumbar spine.'
  },
  {
    id: 'ex-7',
    title: 'Terminal Knee Extension (TKE) with Band',
    category: 'knee',
    level: 'Gentle Mobility',
    target: 'Vastus Medialis Oblique (VMO), Quadriceps',
    indication: 'Post-ACL surgery rehab, meniscus tear recovery, patellar tracking issues.',
    duration: 'Hold 3s • 15 Reps • 3 Sets',
    holdSec: 3,
    reps: 15,
    steps: [
      'Loop a resistance band around a sturdy anchor and place the loop behind your injured knee crease.',
      'Step back slightly to create tension on the band. Keep non-working foot slightly back.',
      'Begin with the working knee slightly bent, then contract the quad to straighten the knee back against band resistance.',
      'Hold the full contraction for 3 seconds, focusing on the teardrop inner thigh muscle (VMO).',
      'Return slowly to the slight bend.'
    ],
    precautions: 'Do not snap the knee backwards aggressively; keep the extension smooth and controlled.'
  },
  {
    id: 'ex-8',
    title: 'Eccentric Heel Drop on Step (Alfredson Protocol)',
    category: 'ankle',
    level: 'Progressive Strength',
    target: 'Gastrocnemius, Soleus, Achilles Tendon',
    indication: 'Achilles tendinopathy, calf muscle strain, chronic plantar heel pain.',
    duration: 'Slow 4-second descent • 15 Reps • 3 Sets',
    holdSec: 4,
    reps: 15,
    steps: [
      'Stand with balls of both feet on the edge of a step, holding a handrail for balance.',
      'Rise up onto toes using both legs.',
      'Shift your weight onto the affected leg, lift the healthy foot off the step.',
      'Slowly lower your affected heel down past the step edge over a controlled 4-second count.',
      'Return to the top by putting the non-injured foot back down to push up, sparing the tendon.'
    ],
    precautions: 'Mild tendon discomfort during eccentric loading is acceptable; sharp or worsening pain indicates too much load.'
  },
  {
    id: 'ex-9',
    title: 'Dead Bug Deep Core Anti-Extension',
    category: 'spine',
    level: 'Isometric / Stability',
    target: 'Transverse Abdominis, Pelvic Floor, Anterior Core',
    indication: 'Pelvic instability, lower back arching fatigue, postpartum core rebuilding.',
    duration: 'Alternating • 12 Reps total • 3 Sets',
    holdSec: 2,
    reps: 12,
    steps: [
      'Lie on your back with arms reaching up toward ceiling and knees/hips bent at 90-degree tabletop.',
      'Flatten your lower back firmly into the floor so there is zero gap under your lumbar spine.',
      'Slowly extend right arm overhead and left leg straight toward the floor without letting your lower back lift.',
      'Return to starting tabletop position and alternate with left arm and right leg.'
    ],
    precautions: 'If your lower back arches off the mat, do not lower the leg as far. Regress as needed.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('exercises-grid')) return;
  initExerciseLibrary();
});

function initExerciseLibrary() {
  const grid = document.getElementById('exercises-grid');
  const searchInput = document.getElementById('exercise-search');
  const categoryFilters = document.querySelectorAll('[data-category-filter]');
  const countDisplay = document.getElementById('exercise-count');

  let currentCategory = 'all';
  let searchTerm = '';

  function render() {
    const filtered = exercisesDatabase.filter(ex => {
      const matchCat = currentCategory === 'all' || ex.category === currentCategory;
      const matchQuery = !searchTerm || 
        ex.title.toLowerCase().includes(searchTerm) || 
        ex.target.toLowerCase().includes(searchTerm) || 
        ex.indication.toLowerCase().includes(searchTerm);
      return matchCat && matchQuery;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} therapeutic exercises`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h3 class="text-base font-semibold text-slate-800">No matching exercises found</h3>
          <p class="text-xs text-slate-500 mt-1">Try searching for other terms like 'spine', 'shoulder', 'rotator cuff' or reset filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(ex => `
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        <div class="p-6">
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${
              ex.level === 'Gentle Mobility' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              ex.level === 'Isometric / Stability' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' :
              'bg-teal-50 text-teal-700 border border-teal-200'
            }">
              ${ex.level}
            </span>
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${ex.category.toUpperCase()}</span>
          </div>

          <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition">
            ${ex.title}
          </h3>

          <p class="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span>Target: <strong class="text-slate-700">${ex.target}</strong></span>
          </p>

          <div class="mt-4 pt-3 border-t border-slate-100">
            <p class="text-xs text-slate-600 line-clamp-2">
              <strong class="text-slate-800">Indication:</strong> ${ex.indication}
            </p>
          </div>
        </div>

        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div class="text-xs font-semibold text-teal-700 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${ex.duration}
          </div>
          <button onclick="openExerciseModal('${ex.id}')" class="px-3.5 py-1.5 bg-white hover:bg-teal-600 text-slate-700 hover:text-white border border-slate-200 hover:border-teal-600 rounded-lg text-xs font-semibold transition shadow-sm">
            View Protocol & Timer &rarr;
          </button>
        </div>
      </div>
    `).join('');
  }

  // Filter clicks
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.forEach(b => {
        b.classList.remove('bg-teal-600', 'text-white', 'border-teal-600');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
      btn.classList.add('bg-teal-600', 'text-white', 'border-teal-600');

      currentCategory = btn.dataset.categoryFilter;
      render();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      render();
    });
  }

  // Initial render
  render();
}

/* ==========================================================================
   Exercise Detail & Interactive Rep Timer Modal
   ========================================================================== */
let activeTimer = null;
let timerSeconds = 0;
let isTimerRunning = false;

window.openExerciseModal = function(id) {
  const ex = exercisesDatabase.find(item => item.id === id);
  if (!ex) return;

  const modal = document.getElementById('exercise-detail-modal');
  if (!modal) return;

  document.getElementById('modal-ex-title').textContent = ex.title;
  document.getElementById('modal-ex-category').textContent = ex.category.toUpperCase();
  document.getElementById('modal-ex-level').textContent = ex.level;
  document.getElementById('modal-ex-target').textContent = ex.target;
  document.getElementById('modal-ex-indication').textContent = ex.indication;
  document.getElementById('modal-ex-duration').textContent = ex.duration;
  document.getElementById('modal-ex-precautions').textContent = ex.precautions;

  // Render steps
  const stepsList = document.getElementById('modal-ex-steps');
  if (stepsList) {
    stepsList.innerHTML = ex.steps.map((st, i) => `
      <li class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">${i + 1}</span>
        <span class="text-xs sm:text-sm text-slate-700 leading-relaxed">${st}</span>
      </li>
    `).join('');
  }

  // Reset timer
  resetExerciseTimer(ex.holdSec || 5);

  // Hook button for routine
  const routineBtn = document.getElementById('modal-add-routine-btn');
  if (routineBtn) {
    routineBtn.onclick = () => {
      addToPatientRoutine(ex);
    };
  }

  modal.classList.remove('hidden');
};

window.closeExerciseModal = function() {
  const modal = document.getElementById('exercise-detail-modal');
  if (modal) modal.classList.add('hidden');
  stopExerciseTimer();
};

function resetExerciseTimer(initialSec = 5) {
  stopExerciseTimer();
  timerSeconds = initialSec;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const timerNum = document.getElementById('timer-count-display');
  if (timerNum) timerNum.textContent = timerSeconds;
}

window.toggleExerciseTimer = function() {
  const toggleBtn = document.getElementById('timer-toggle-btn');
  if (isTimerRunning) {
    stopExerciseTimer();
    if (toggleBtn) toggleBtn.textContent = 'Start Hold Timer';
  } else {
    isTimerRunning = true;
    if (toggleBtn) toggleBtn.textContent = 'Pause Timer';
    
    activeTimer = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        stopExerciseTimer();
        if (toggleBtn) toggleBtn.textContent = 'Completed! Restart';
        window.showToast('Repetition Complete!', 'Great form! Relax and take a breath before the next rep.', 'success');
        timerSeconds = 5;
        updateTimerDisplay();
      }
    }, 1000);
  }
};

function stopExerciseTimer() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  isTimerRunning = false;
}

function addToPatientRoutine(ex) {
  const routine = JSON.parse(localStorage.getItem('kp_my_routine') || '[]');
  if (!routine.some(item => item.id === ex.id)) {
    routine.push({
      id: ex.id,
      title: ex.title,
      target: ex.target,
      duration: ex.duration
    });
    localStorage.setItem('kp_my_routine', JSON.stringify(routine));
    window.showToast('Added to Routine', `"${ex.title}" has been saved to your personal home exercise protocol.`, 'success');
  } else {
    window.showToast('Already in Routine', 'This exercise is already part of your active routine.', 'info');
  }
}
