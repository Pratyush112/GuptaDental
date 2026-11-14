const API_URL = 'https://script.google.com/macros/s/AKfycbw_wmmuPmkMQudFS8A2aw8vlN689ED1oa0b8phmxFZa_mezOICKdUqC7uJtZJDj4rpEmw/exec';

/**
 * Gupta's Dental - Single Page Application Script
 * Vanilla JavaScript (Zero external libraries, zero globals)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Centralized Clinic Configuration Object
     Edit brand details, contact info, branches, and hours in ONE place.
     ========================================================================== */
  const CLINIC_CONFIG = {
    brandName: "Gupta's Dental",
    brandTag: 'Advanced Multispeciality Clinic',
    tagline: 'Your Smile, Our Priority',
    rating: {
      score: '4.8',
      reviewsCount: '490+',
      source: 'Google Reviews'
    },
    contact: {
      phoneDisplay: '+91 81010 14751',
      phoneTel: '+918101014751',
      whatsappDisplay: '+91 81010 14751',
      whatsappLink: 'https://wa.me/918101014751?text=Hi%20Gupta%27s%20Dental%2C%20I%20would%20like%20to%20book%20a%20consultation',
      email: 'prasaha018@gmail.com'
    },
    branches: [
      {
        id: 'phoolbagan',
        name: 'Phoolbagan / Kankurgachi',
        address: 'P-87, CIT Road, near Phoolbagan Police Station, Phool Bagan, Kolkata 700054',
        timings: 'Open all 7 days: 10:00 AM - 9:00 PM',
        parking: 'Patient parking available',
        phone: '+91 81010 14751',
        phoneTel: '+918101014751',
        mapQuery: 'P-87,+CIT+Road,+near+Phoolbagan+Police+Station,+Phool+Bagan,+Kolkata+700054',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.095493902347!2d88.390544!3d22.575677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027663242ea395%3A0xc3f87b8f9e61298c!2sPhoolbagan%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
      },
      {
        id: 'seven-tanks',
        name: 'Seven Tanks / South Dum Dum',
        address: '122/1D, South Sinthee Road, 50ft Road, Seven Tanks Welfare Association, South Dum Dum, Kolkata 700030',
        timings: 'Open 6 days: 10:00 AM - 9:00 PM (Closed Thursday)',
        parking: 'Street and association visitor parking available',
        phone: '+91 81010 14751',
        phoneTel: '+918101014751',
        mapQuery: '122/1D,+South+Sinthee+Road,+Seven+Tanks,+South+Dum+Dum,+Kolkata+700030',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.261276274411!2d88.384218!3d22.625349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89df464973307%3A0x6b4fb6c173c333!2sSouth%20Dum%20Dum%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin'
      }
    ],
    // 15 Specialities (Single Source of Truth)
    specialities: [
      {
        id: 'implants',
        name: 'Dental Implants',
        category: 'Restorative & Implants',
        badge: 'Lifetime Warranty',
        desc: 'Permanent titanium and zirconia tooth replacements with computer-guided placement. Restore natural chewing power with a lifetime warranty.'
      },
      {
        id: 'invisalign',
        name: 'Invisalign & Clear Braces',
        category: 'Aligners & Cosmetic',
        badge: 'US FDA Approved',
        desc: 'Virtually invisible clear aligners for teeth straightening without unsightly metal brackets or dietary restrictions.'
      },
      {
        id: 'root-canal',
        name: 'Microscopic Root Canal (RCT)',
        category: 'Pain Relief & Gums',
        badge: 'Single Sitting',
        desc: 'Single-sitting painless root canal under Zeiss dental operating microscope. Save your infected natural tooth in under 45 minutes.'
      },
      {
        id: 'whitening',
        name: 'Laser Teeth Whitening',
        category: 'Aligners & Cosmetic',
        badge: '30-Min Fast Track',
        desc: 'Advanced German laser whitening delivering up to 8 shades brighter teeth in a single 30-minute session. Completely enamel safe.'
      },
      {
        id: 'smile-design',
        name: 'Smile Designing & Veneers',
        category: 'Aligners & Cosmetic',
        badge: 'Digital Mockup',
        desc: 'Custom ultra-thin porcelain veneers, composite bonding, and gum recontouring for a picture-perfect celebrity smile transformation.'
      },
      {
        id: 'pediatric',
        name: 'Paediatric Dentistry',
        category: 'Family & Preventive',
        badge: 'Fear-Free Care',
        desc: 'Gentle, fear-free dental visits for children. Cavity prevention, painless fillings, and habit-breaking appliances in a kid-friendly setting.'
      },
      {
        id: 'general',
        name: 'General Dentistry',
        category: 'Family & Preventive',
        badge: 'Routine & Preventive',
        desc: 'Comprehensive oral examinations, ultrasonic scaling, and tooth-colored composite restorations for lasting oral health.'
      },
      {
        id: 'orthodontics',
        name: 'Orthodontics & Braces',
        category: 'Aligners & Cosmetic',
        badge: 'Ceramic & Self-Ligating',
        desc: 'Precision teeth and jaw alignment using modern metal, ceramic, and self-ligating braces tailored for children and adults.'
      },
      {
        id: 'crown-bridge',
        name: 'Crowns, Bridges & Dentures',
        category: 'Restorative & Implants',
        badge: 'CAD/CAM Precision',
        desc: 'Custom CAD/CAM zirconia crowns, fixed dental bridges, and precision dentures engineered for lifelike durability.'
      },
      {
        id: 'periodontics',
        name: 'Gum Care / Periodontology',
        category: 'Pain Relief & Gums',
        badge: 'Deep Laser Therapy',
        desc: 'Specialized therapy for bleeding gums, periodontitis, and bone preservation using gentle ultrasonic and laser care.'
      },
      {
        id: 'oral-surgery',
        name: 'Oral & Maxillofacial Surgery',
        category: 'Pain Relief & Gums',
        badge: 'Minimally Invasive',
        desc: 'Atraumatic surgical wisdom tooth extractions, pre-prosthetic procedures, and minor cyst removals under computer-guided anesthesia.'
      },
      {
        id: 'laser-dentistry',
        name: 'Laser Dentistry',
        category: 'Pain Relief & Gums',
        badge: 'Suture-Free Healing',
        desc: 'Modern soft-tissue procedures performed with dental lasers for faster healing, minimal bleeding, and no stitches.'
      },
      {
        id: 'oral-medicine',
        name: 'Oral Medicine & Radiology',
        category: 'Diagnostics',
        badge: 'Specialist Diagnosis',
        desc: 'Expert clinical diagnosis and therapeutic management of chronic mouth ulcers, mucosal lesions, and TMJ jaw pain.'
      },
      {
        id: 'opg',
        name: 'OPG & Digital X-Ray Imaging',
        category: 'Diagnostics',
        badge: 'Ultra-Low Radiation',
        desc: 'High-definition panoramic dental X-rays and digital sensor imaging with 80% reduced radiation for instant diagnosis.'
      },
      {
        id: 'geriatric',
        name: 'Geriatric Dentistry',
        category: 'Family & Preventive',
        badge: 'Senior-Friendly Care',
        desc: 'Compassionate, gentle dental care specialized for seniors, addressing dry mouth, root caries, dentures, and medical health.'
      }
    ],
    // 9 Doctors (Single Source of Truth)
    doctors: [
      {
        id: 'dr-protim',
        name: 'Dr. Protim Ghosh Dastidar',
        title: 'Endodontist',
        specialities: ['root-canal', 'general'],
        branchIds: ['phoolbagan', 'seven-tanks'],
        experience: '18+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Protim Ghosh Dastidar</text></svg>"
      },
      {
        id: 'dr-rishita',
        name: 'Dr. Rishita Hari',
        title: 'Pediatric Dentistry',
        specialities: ['pediatric'],
        branchIds: ['phoolbagan', 'seven-tanks'],
        experience: '18+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Rishita Hari</text></svg>"
      },
      {
        id: 'dr-saptarshi',
        name: 'Dr. Saptarshi Banerjee',
        title: 'Prosthodontics and Implantology',
        specialities: ['implants', 'crown-bridge'],
        branchIds: ['phoolbagan', 'seven-tanks'],
        experience: '12+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Saptarshi Banerjee</text></svg>"
      },
      // demo placeholder
      {
        id: 'dr-aritra',
        name: 'Dr. Aritra Sen',
        title: 'Orthodontist',
        specialities: ['orthodontics', 'invisalign'],
        branchIds: ['phoolbagan'],
        experience: '10+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Aritra Sen</text></svg>"
      },
      // demo placeholder
      {
        id: 'dr-meghna',
        name: 'Dr. Meghna Roy',
        title: 'Periodontist',
        specialities: ['periodontics', 'laser-dentistry'],
        branchIds: ['phoolbagan', 'seven-tanks'],
        experience: '9+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Meghna Roy</text></svg>"
      },
      // demo placeholder
      {
        id: 'dr-kaushik',
        name: 'Dr. Kaushik Mondal',
        title: 'Oral & Maxillofacial Surgeon',
        specialities: ['oral-surgery'],
        branchIds: ['seven-tanks'],
        experience: '12+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Kaushik Mondal</text></svg>"
      },
      // demo placeholder
      {
        id: 'dr-ishita',
        name: 'Dr. Ishita Basu',
        title: 'Cosmetic Dentist',
        specialities: ['smile-design', 'whitening'],
        branchIds: ['phoolbagan', 'seven-tanks'],
        experience: '8+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Ishita Basu</text></svg>"
      },
      // demo placeholder
      {
        id: 'dr-rahul',
        name: 'Dr. Rahul Dey',
        title: 'General Dentist',
        specialities: ['general', 'crown-bridge', 'geriatric'],
        branchIds: ['phoolbagan', 'seven-tanks'],
        experience: '11+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Rahul Dey</text></svg>"
      },
      // demo placeholder
      {
        id: 'dr-sutapa',
        name: 'Dr. Sutapa Chatterjee',
        title: 'Oral Medicine & Radiologist',
        specialities: ['oral-medicine', 'opg'],
        branchIds: ['phoolbagan'],
        experience: '9+ Years Exp.',
        photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='360' viewBox='0 0 400 360'><rect width='400' height='360' fill='%23e0f2f5'/><circle cx='200' cy='140' r='55' fill='%230096a6'/><path d='M110 320c0-60 40-90 90-90s90 30 90 90' fill='%230b3b4e'/><text x='200' y='340' font-family='sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle'>Dr. Sutapa Chatterjee</text></svg>"
      }
    ],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:30 PM', '08:00 PM']
  };

  // Backward compatibility alias
  CLINIC_CONFIG.treatments = CLINIC_CONFIG.specialities;

  // Helper: extract doctor initials for CSS avatar
  function getDoctorInitials(name) {
    if (!name) return 'GD';
    const clean = name.replace(/^Dr\.?\s*/i, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /* Analytics & DataLayer tracking stub */
  window.dataLayer = window.dataLayer || [];
  function trackEvent(eventName, payload) {
    const data = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...payload
    };
    window.dataLayer.push(data);
    // Development console log for verification
    if (window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
      console.log('[Analytics Event]:', data);
    }
  }

  /* ==========================================================================
     2. Brand Hydration: Apply CLINIC_CONFIG dynamically to DOM elements
     ========================================================================== */
  function initBrandHydration() {
    // Populate brand texts
    document.querySelectorAll('[data-brand-name]').forEach(el => {
      el.textContent = CLINIC_CONFIG.brandName;
    });

    document.querySelectorAll('[data-brand-phone]').forEach(el => {
      el.textContent = CLINIC_CONFIG.contact.phoneDisplay;
    });

    document.querySelectorAll('a[data-brand-tel]').forEach(el => {
      el.href = 'tel:' + CLINIC_CONFIG.contact.phoneTel;
      el.addEventListener('click', () => {
        trackEvent('phone_call_click', { phone: CLINIC_CONFIG.contact.phoneTel });
      });
    });

    document.querySelectorAll('a[data-brand-whatsapp]').forEach(el => {
      el.href = CLINIC_CONFIG.contact.whatsappLink;
      el.addEventListener('click', () => {
        trackEvent('whatsapp_click', { number: CLINIC_CONFIG.contact.whatsappDisplay });
      });
    });

    // Populate treatment select dropdown (value is treatment NAME)
    const treatmentSelect = document.getElementById('form-treatment');
    if (treatmentSelect && treatmentSelect.options.length <= 1) {
      CLINIC_CONFIG.treatments.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.name;
        opt.dataset.id = t.id;
        opt.textContent = t.name;
        treatmentSelect.appendChild(opt);
      });
    }

    // Populate branch select dropdown (value is branch NAME)
    const branchSelect = document.getElementById('form-branch');
    if (branchSelect && branchSelect.options.length <= 1) {
      CLINIC_CONFIG.branches.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.name;
        opt.dataset.id = b.id;
        opt.textContent = b.name;
        branchSelect.appendChild(opt);
      });
    }

    // Populate time slot select dropdown or chips from CLINIC_CONFIG.timeSlots
    const slotInput = document.getElementById('form-slot');
    const slotsContainer = document.getElementById('slot-chips-container');
    if (slotInput && slotInput.tagName === 'SELECT' && slotInput.options.length <= 1) {
      slotInput.innerHTML = '';
      CLINIC_CONFIG.timeSlots.forEach(slot => {
        const opt = document.createElement('option');
        opt.value = slot;
        opt.textContent = slot;
        slotInput.appendChild(opt);
      });
      slotInput.value = CLINIC_CONFIG.timeSlots[0];
    } else if (slotsContainer && slotInput) {
      slotsContainer.innerHTML = '';
      CLINIC_CONFIG.timeSlots.forEach((slot, index) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'slot-chip' + (index === 0 ? ' is-selected' : '');
        chip.textContent = slot;
        chip.setAttribute('data-slot', slot);
        chip.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

        chip.addEventListener('click', () => {
          document.querySelectorAll('.slot-chip').forEach(c => {
            c.classList.remove('is-selected');
            c.setAttribute('aria-pressed', 'false');
          });
          chip.classList.add('is-selected');
          chip.setAttribute('aria-pressed', 'true');
          slotInput.value = slot;
        });

        slotsContainer.appendChild(chip);
      });

      // Default to first slot
      slotInput.value = CLINIC_CONFIG.timeSlots[0];
    }

    // Set minimum date to today (no past dates)
    const dateInput = document.getElementById('form-date');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  /* ==========================================================================
     2b. Hero Search Bar ("Find a Doctor" widget)
     ========================================================================== */
  function initHeroSearch() {
    const searchSection = document.getElementById('hero-search-bar');
    if (!searchSection) return;

    const specialitySelect = document.getElementById('search-speciality');
    const doctorSelect = document.getElementById('search-doctor');
    const searchBtn = document.getElementById('btn-hero-search');
    const clearBtn = document.getElementById('btn-hero-clear');
    const resultsPanel = document.getElementById('search-results-panel');
    const resultsGrid = document.getElementById('search-results-grid');
    const resultsCount = document.getElementById('search-results-count');
    const heroCard = document.getElementById('booking-card');
    const formNameInput = document.getElementById('form-name');
    const formTreatmentInput = document.getElementById('form-treatment');
    const formDoctorInput = document.getElementById('form-doctor');
    const formBranchInput = document.getElementById('form-branch');

    // Populate Speciality options in alphabetical order
    if (specialitySelect && specialitySelect.options.length <= 1) {
      specialitySelect.innerHTML = '<option value="">All Specialities</option>';
      const sortedSpecialities = CLINIC_CONFIG.specialities.slice().sort((a, b) => a.name.localeCompare(b.name));
      sortedSpecialities.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        specialitySelect.appendChild(opt);
      });
    }

    // Populate or re-filter Doctor options
    function updateHeroDoctorOptions(selectedSpecId = '') {
      if (!doctorSelect) return;
      const prevDocId = doctorSelect.value;
      doctorSelect.innerHTML = '<option value="">All Doctors</option>';

      let docs = CLINIC_CONFIG.doctors;
      if (selectedSpecId) {
        docs = docs.filter(d => d.specialities.includes(selectedSpecId));
      }

      let stillValid = false;
      docs.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `${d.name} (${d.title})`;
        if (prevDocId && prevDocId === d.id) {
          opt.selected = true;
          stillValid = true;
        }
        doctorSelect.appendChild(opt);
      });

      if (!stillValid && prevDocId) {
        doctorSelect.value = '';
      }
    }

    // Initialize doctor options
    updateHeroDoctorOptions();

    // When Speciality filter changes: filter doctor dropdown
    if (specialitySelect) {
      specialitySelect.addEventListener('change', () => {
        updateHeroDoctorOptions(specialitySelect.value);
      });
    }

    // Perform Search & Render Results
    function runSearch() {
      const selectedSpecId = specialitySelect ? specialitySelect.value : '';
      const selectedDocId = doctorSelect ? doctorSelect.value : '';

      trackEvent('hero_search', {
        speciality: selectedSpecId || 'all',
        doctor: selectedDocId || 'all'
      });

      let matches = CLINIC_CONFIG.doctors;
      if (selectedDocId) {
        matches = matches.filter(d => d.id === selectedDocId);
      } else if (selectedSpecId) {
        matches = matches.filter(d => d.specialities.includes(selectedSpecId));
      }

      if (!resultsPanel || !resultsGrid) return;
      resultsGrid.innerHTML = '';

      if (resultsCount) {
        resultsCount.textContent = `${matches.length} specialist${matches.length === 1 ? '' : 's'} found`;
      }

      if (matches.length === 0) {
        resultsGrid.innerHTML = `
          <div class="search-empty-state">
            <p>No specialist found for that selection. Call us on <a href="tel:${CLINIC_CONFIG.contact.phoneTel}" class="search-empty-tel" data-brand-tel>${CLINIC_CONFIG.contact.phoneDisplay}</a> and we'll help.</p>
          </div>
        `;
      } else {
        matches.forEach(doc => {
          const card = document.createElement('article');
          card.className = 'doc-search-card';

          const initials = getDoctorInitials(doc.name);

          // Build Branch chips
          const branchChips = doc.branchIds.map(bid => {
            const b = CLINIC_CONFIG.branches.find(item => item.id === bid);
            const bName = b ? (bid === 'phoolbagan' ? 'Phoolbagan' : 'Seven Tanks') : bid;
            return `<span class="doc-search-chip doc-branch-chip">📍 ${bName}</span>`;
          }).join('');

          // Build Speciality chips
          const specChips = doc.specialities.map(sid => {
            const s = CLINIC_CONFIG.specialities.find(item => item.id === sid);
            return `<span class="doc-search-chip doc-spec-chip">${s ? s.name : sid}</span>`;
          }).join('');

          const avatarHtml = doc.photo
            ? `<img src="${doc.photo}" alt="${doc.name}" class="doc-search-avatar" loading="lazy">`
            : `<div class="doc-search-initials" aria-hidden="true">${initials}</div>`;

          card.innerHTML = `
            <div class="doc-search-top">
              ${avatarHtml}
              <div class="doc-search-identity">
                <h4 class="doc-search-name">${doc.name}</h4>
                <p class="doc-search-title">${doc.title}</p>
                <span class="doc-search-exp">${doc.experience}</span>
              </div>
            </div>
            <div class="doc-search-chips-wrap">
              <div class="doc-search-chips">
                ${branchChips}
                ${specChips}
              </div>
            </div>
            <div class="doc-search-footer">
              <button type="button" class="btn btn-cta btn-sm btn-book-with-doc" data-doc-id="${doc.id}">
                Book with ${doc.name.replace(/^(Dr\.\s*)/i, '').split(' ')[0]} →
              </button>
            </div>
          `;

          // Handle "Book with Dr. X" action
          const bookBtn = card.querySelector('.btn-book-with-doc');
          if (bookBtn) {
            bookBtn.addEventListener('click', () => {
              // 1. Determine treatment
              let chosenTreatmentName = '';
              if (selectedSpecId && doc.specialities.includes(selectedSpecId)) {
                const sObj = CLINIC_CONFIG.specialities.find(s => s.id === selectedSpecId);
                if (sObj) chosenTreatmentName = sObj.name;
              }
              if (!chosenTreatmentName && doc.specialities.length > 0) {
                const sObj = CLINIC_CONFIG.specialities.find(s => s.id === doc.specialities[0]);
                if (sObj) chosenTreatmentName = sObj.name;
              }

              // 2. Set treatment in booking form
              if (formTreatmentInput && chosenTreatmentName) {
                formTreatmentInput.value = chosenTreatmentName;
              }

              // 3. Set branch if doctor works at only one branch
              if (formBranchInput && doc.branchIds.length === 1) {
                const bObj = CLINIC_CONFIG.branches.find(b => b.id === doc.branchIds[0]);
                if (bObj) {
                  formBranchInput.value = bObj.name;
                  const pill = document.querySelector(`.branch-pill[data-branch="${bObj.name}"]`);
                  if (pill) {
                    document.querySelectorAll('.branch-pill').forEach(p => {
                      p.classList.remove('is-active');
                      p.setAttribute('aria-selected', 'false');
                    });
                    pill.classList.add('is-active');
                    pill.setAttribute('aria-selected', 'true');
                  }
                }
              }

              // 4. Dispatch change events to refresh slot availability & doctor select options
              if (formBranchInput) formBranchInput.dispatchEvent(new Event('change'));
              if (formTreatmentInput) formTreatmentInput.dispatchEvent(new Event('change'));

              // 5. Select this doctor
              if (formDoctorInput) {
                formDoctorInput.value = doc.name;
              }

              // 6. Smooth scroll to form, focus name, and pulse form
              if (heroCard) {
                heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                heroCard.classList.remove('is-highlighted');
                void heroCard.offsetWidth;
                heroCard.classList.add('is-highlighted');
              }
              if (formNameInput) {
                setTimeout(() => formNameInput.focus(), 300);
              }

              trackEvent('hero_search_book_click', { doctor: doc.name, treatment: chosenTreatmentName });
            });
          }

          resultsGrid.appendChild(card);
        });
      }

      resultsPanel.style.display = 'block';
      resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', runSearch);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (specialitySelect) specialitySelect.value = '';
        updateHeroDoctorOptions();
        if (doctorSelect) doctorSelect.value = '';
        if (resultsPanel) resultsPanel.style.display = 'none';
        if (resultsGrid) resultsGrid.innerHTML = '';
      });
    }
  }

  /* ==========================================================================
     3. Header Scroll Behavior (Shrink on scroll)
     ========================================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 40;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > scrollThreshold) {
        header.classList.add('is-shrunk');
      } else {
        header.classList.remove('is-shrunk');
      }

      if (backToTopBtn) {
        if (currentScroll > 450) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      }

      lastScroll = currentScroll;
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     4. Animated Count-Up Stats (IntersectionObserver)
     ========================================================================== */
  function initCountUpStats() {
    const statItems = document.querySelectorAll('.stat-number');
    if (!statItems.length) return;

    let hasRun = false;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          statItems.forEach(el => animateNumber(el));
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const statsStrip = document.querySelector('.trust-strip');
    if (statsStrip) {
      observer.observe(statsStrip);
    }

    function animateNumber(element) {
      const target = parseFloat(element.getAttribute('data-target') || '0');
      const isDecimal = element.getAttribute('data-decimal') === 'true';
      const duration = 1600; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const current = target * easeOut;

        if (isDecimal) {
          element.textContent = current.toFixed(1);
        } else {
          element.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isDecimal) {
            element.textContent = target.toFixed(1);
          } else {
            element.textContent = Math.floor(target).toLocaleString();
          }
        }
      }

      requestAnimationFrame(update);
    }
  }

  /* ==========================================================================
     5. Scroll Reveal Animations
     ========================================================================== */
  function initScrollReveal() {
    const animElements = document.querySelectorAll('.animate-on-scroll');
    if (!animElements.length || !('IntersectionObserver' in window)) {
      animElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     5b. Hero Auto-Sliding Background (Auto-play, Indicators, Pause on Form Focus)
     ========================================================================== */
  function initHeroBackgroundSlider() {
    const track = document.getElementById('hero-bg-track');
    const indicatorsContainer = document.getElementById('hero-bg-indicators');
    const heroSection = document.getElementById('hero');
    if (!track) return;

    const slides = track.querySelectorAll('.hero-bg-slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let timer = null;
    const intervalTime = 4500;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Build indicator dots
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `hero-bg-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Clinic Background Photo ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetTimer();
        });
        indicatorsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!indicatorsContainer) return;
      const dots = indicatorsContainer.querySelectorAll('.hero-bg-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
        if (idx === currentIndex) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });
      updateDots();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      if (prefersReducedMotion) return;
      stopTimer();
      timer = setInterval(nextSlide, intervalTime);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    // Touch swipe support on hero section (ignoring interactive form fields)
    if (heroSection) {
      let touchStartX = 0;
      let touchEndX = 0;

      heroSection.addEventListener('touchstart', (e) => {
        if (e.target.closest('input, select, textarea, button, a')) return;
        touchStartX = e.changedTouches[0].screenX;
        stopTimer();
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        if (e.target.closest('input, select, textarea, button, a')) return;
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startTimer();
      }, { passive: true });
    }

    // Initialize
    goToSlide(0);
    startTimer();
  }

  /* ==========================================================================
     6. Booking Form Logic (Live Slots, Validation, LocalStorage, Real API Submit)
     ========================================================================== */
  function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const treatmentInput = document.getElementById('form-treatment');
    const branchInput = document.getElementById('form-branch');
    const doctorInput = document.getElementById('form-doctor');
    const doctorHintMsg = document.getElementById('doctor-hint-msg');
    const dateInput = document.getElementById('form-date');
    const slotInput = document.getElementById('form-slot');
    const messageInput = document.getElementById('form-message');
    const honeypotInput = document.getElementById('form-website');
    const submitBtn = document.getElementById('form-submit-btn');
    const successCard = document.getElementById('booking-success-card');
    const newBookingBtn = document.getElementById('btn-book-another');
    const errorSlot = document.getElementById('error-slot');
    const errorForm = document.getElementById('error-form');

    // Dynamically filter and populate Doctor dropdown in booking form
    function updateDoctorSelect(keepSelection = true) {
      if (!doctorInput) return;
      const selectedBranchName = branchInput ? branchInput.value : '';
      const selectedTreatmentName = treatmentInput ? treatmentInput.value : '';

      // Find branch ID
      let branchId = '';
      if (selectedBranchName) {
        const b = CLINIC_CONFIG.branches.find(br => br.name === selectedBranchName || br.id === selectedBranchName);
        if (b) branchId = b.id;
      }

      // Find speciality ID
      let specId = '';
      if (selectedTreatmentName) {
        const s = CLINIC_CONFIG.specialities.find(sp => sp.name === selectedTreatmentName || sp.id === selectedTreatmentName);
        if (s) specId = s.id;
      }

      let matchingDocs = [];
      let showHint = false;

      if (branchId && specId) {
        matchingDocs = CLINIC_CONFIG.doctors.filter(d => d.branchIds.includes(branchId) && d.specialities.includes(specId));
        if (matchingDocs.length === 0) {
          // If no specialist listed for this treatment at this branch, list all doctors of branch with hint
          matchingDocs = CLINIC_CONFIG.doctors.filter(d => d.branchIds.includes(branchId));
          showHint = true;
        }
      } else if (branchId) {
        matchingDocs = CLINIC_CONFIG.doctors.filter(d => d.branchIds.includes(branchId));
      } else if (specId) {
        matchingDocs = CLINIC_CONFIG.doctors.filter(d => d.specialities.includes(specId));
      } else {
        matchingDocs = CLINIC_CONFIG.doctors.slice();
      }

      if (doctorHintMsg) {
        doctorHintMsg.style.display = showHint ? 'block' : 'none';
      }

      const prevValue = keepSelection ? doctorInput.value : '';
      doctorInput.innerHTML = '<option value="">Any available doctor</option>';

      let stillValid = false;
      matchingDocs.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.name;
        opt.textContent = `${d.name} — ${d.title}`;
        if (prevValue && (prevValue === d.name || prevValue === d.id)) {
          opt.selected = true;
          stillValid = true;
        }
        doctorInput.appendChild(opt);
      });

      if (!stillValid && prevValue && prevValue !== 'Any available doctor') {
        doctorInput.value = '';
      }
    }

    // Initialize doctor dropdown
    updateDoctorSelect(false);

    // Request sequence counter to discard stale slot responses
    let slotRequestCounter = 0;

    // Helper: set slot inline error
    function setSlotError(msg) {
      if (errorSlot) {
        errorSlot.textContent = msg || '';
      }
    }

    // Helper: set general form error
    function setFormError(msg, isHtml = false) {
      if (errorForm) {
        if (isHtml) {
          errorForm.innerHTML = msg || '';
        } else {
          errorForm.textContent = msg || '';
        }
      }
    }

    // Render dynamic visual slot chips
    const slotChipsGrid = document.getElementById('slot-chips-grid');

    function renderSlotChipsGrid() {
      if (!slotChipsGrid || !slotInput) return;
      slotChipsGrid.innerHTML = '';

      const options = Array.from(slotInput.options);
      if (options.length === 0) return;

      options.forEach(opt => {
        if (!opt.value) return; // skip placeholder like "Checking availability..."
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'slot-chip';
        chip.dataset.slot = opt.value;

        const isBooked = opt.disabled;
        const isSelected = !isBooked && opt.value === slotInput.value;

        if (isBooked) {
          chip.classList.add('is-booked');
          chip.disabled = true;
          chip.innerHTML = `<span class="slot-chip-dot"></span><span>${opt.value}</span>`;
        } else {
          chip.classList.add('is-available');
          if (isSelected) chip.classList.add('is-selected');
          chip.innerHTML = `<span class="slot-chip-dot"></span><span>${opt.value}</span>`;

          chip.addEventListener('click', () => {
            slotInput.value = opt.value;
            setSlotError('');
            renderSlotChipsGrid();
            slotInput.dispatchEvent(new Event('change'));
          });
        }

        slotChipsGrid.appendChild(chip);
      });
    }

    function showSlotLoadingChips() {
      if (!slotChipsGrid) return;
      slotChipsGrid.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'slot-chip is-loading';
        skeleton.innerHTML = '<span class="slot-chip-dot"></span><span>Checking...</span>';
        skeleton.style.opacity = '0.5';
        skeleton.style.pointerEvents = 'none';
        slotChipsGrid.appendChild(skeleton);
      }
    }

    // Populate static slots from CLINIC_CONFIG.timeSlots (fallback)
    function populateStaticSlots(preserveSelection = false) {
      if (!slotInput) return;
      const prevVal = slotInput.value;
      slotInput.innerHTML = '';
      CLINIC_CONFIG.timeSlots.forEach(slot => {
        const opt = document.createElement('option');
        opt.value = slot;
        opt.textContent = slot;
        opt.disabled = false;
        slotInput.appendChild(opt);
      });
      slotInput.disabled = false;
      if (preserveSelection && CLINIC_CONFIG.timeSlots.includes(prevVal)) {
        slotInput.value = prevVal;
      } else {
        slotInput.value = CLINIC_CONFIG.timeSlots[0] || '';
      }
      setSlotError('');
      submitBtn.disabled = false;
      renderSlotChipsGrid();
    }

    // Live slot availability check
    async function fetchSlots() {
      if (!branchInput || !dateInput || !slotInput) return;

      const branchName = branchInput.value;
      const dateVal = dateInput.value;

      setSlotError('');
      setFormError('');

      // Both branch and date must be set
      if (!branchName || !dateVal) {
        populateStaticSlots(true);
        return;
      }

      // If API_URL is still placeholder, fallback to static slots
      if (!API_URL || API_URL === 'PASTE_APPS_SCRIPT_EXEC_URL_HERE') {
        populateStaticSlots(true);
        return;
      }

      const currentReq = ++slotRequestCounter;

      // While loading, disable slot select and show single option "Checking availability..."
      const previousValue = slotInput.value;
      slotInput.disabled = true;
      slotInput.innerHTML = '<option value="">Checking availability...</option>';
      showSlotLoadingChips();

      try {
        const url = `${API_URL}?action=slots&branch=${encodeURIComponent(branchName)}&date=${encodeURIComponent(dateVal)}`;
        const res = await fetch(url);

        // Ignore stale response
        if (currentReq !== slotRequestCounter) return;

        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }

        const data = await res.json();

        // Ignore stale response
        if (currentReq !== slotRequestCounter) return;

        if (data && data.ok && Array.isArray(data.slots)) {
          // Build availability lookup
          const availMap = new Map();
          data.slots.forEach(item => {
            if (item && item.slot) {
              availMap.set(item.slot.trim().toUpperCase(), item.available !== false);
            }
          });

          slotInput.innerHTML = '';
          let availableCount = 0;
          let firstAvailable = null;

          // Slot options must come from CLINIC_CONFIG.timeSlots
          CLINIC_CONFIG.timeSlots.forEach(slotText => {
            const opt = document.createElement('option');
            opt.value = slotText;
            const isAvail = availMap.has(slotText.trim().toUpperCase())
              ? availMap.get(slotText.trim().toUpperCase())
              : true;

            if (isAvail) {
              opt.textContent = slotText;
              opt.disabled = false;
              availableCount++;
              if (!firstAvailable) firstAvailable = slotText;
            } else {
              opt.textContent = `${slotText} (Booked)`;
              opt.disabled = true;
            }
            slotInput.appendChild(opt);
          });

          if (availableCount === 0) {
            // None are available: inline message & disable submit button
            slotInput.disabled = true;
            setSlotError('Fully booked on this date, please pick another day');
            submitBtn.disabled = true;
            renderSlotChipsGrid();
          } else {
            slotInput.disabled = false;
            setSlotError('');
            submitBtn.disabled = false;

            // Auto-select first available if previously selected is disabled
            const selectedOpt = slotInput.querySelector(`option[value="${previousValue}"]`);
            if (selectedOpt && !selectedOpt.disabled) {
              slotInput.value = previousValue;
            } else {
              slotInput.value = firstAvailable || '';
            }
            renderSlotChipsGrid();
          }
        } else {
          // Fallback to static slots
          populateStaticSlots(true);
        }
      } catch (err) {
        console.warn('Slot availability fetch failed, falling back to static slots:', err);
        if (currentReq === slotRequestCounter) {
          populateStaticSlots(true);
        }
      }
    }

    // Prefill from localStorage
    try {
      const savedUser = JSON.parse(localStorage.getItem('guptas_patient_info') || '{}');
      if (savedUser.name && nameInput) nameInput.value = savedUser.name;
      if (savedUser.phone && phoneInput) phoneInput.value = savedUser.phone;
    } catch (e) {
      // LocalStorage unavailable
    }

    // Validation Rules
    function validateName() {
      const val = nameInput.value.trim();
      const errEl = document.getElementById('error-name');
      if (val.length < 2) {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Please enter your full name (minimum 2 characters).';
        return false;
      }
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    function validatePhone() {
      const val = phoneInput.value.replace(/\s+/g, '');
      const errEl = document.getElementById('error-phone');
      // Indian 10-digit mobile number starting with 6, 7, 8, or 9
      const indianPhoneRegex = /^[6-9]\d{9}$/;

      if (!val) {
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Mobile number is required.';
        return false;
      }

      if (!indianPhoneRegex.test(val)) {
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Please enter a valid 10-digit Indian mobile number.';
        return false;
      }

      phoneInput.classList.remove('is-invalid');
      phoneInput.classList.add('is-valid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    function validateTreatment() {
      const val = treatmentInput.value;
      const errEl = document.getElementById('error-treatment');
      if (!val) {
        treatmentInput.classList.add('is-invalid');
        treatmentInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Please select a treatment.';
        return false;
      }
      treatmentInput.classList.remove('is-invalid');
      treatmentInput.classList.add('is-valid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    function validateBranch() {
      const val = branchInput.value;
      const errEl = document.getElementById('error-branch');
      if (!val) {
        branchInput.classList.add('is-invalid');
        branchInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Please choose a Kolkata clinic branch.';
        return false;
      }
      branchInput.classList.remove('is-invalid');
      branchInput.classList.add('is-valid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    function validateDate() {
      const val = dateInput.value;
      const errEl = document.getElementById('error-date');
      if (!val) {
        dateInput.classList.add('is-invalid');
        dateInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Please select a preferred date.';
        return false;
      }
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        dateInput.classList.add('is-invalid');
        dateInput.classList.remove('is-valid');
        if (errEl) errEl.textContent = 'Date cannot be in the past.';
        return false;
      }
      dateInput.classList.remove('is-invalid');
      dateInput.classList.add('is-valid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    // Attach real-time input & blur events
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => { if (nameInput.classList.contains('is-invalid')) validateName(); });

    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', (e) => {
      // Strip non-digits
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      if (phoneInput.classList.contains('is-invalid')) validatePhone();
    });

    treatmentInput.addEventListener('change', () => {
      validateTreatment();
      updateDoctorSelect(true);
    });

    // Fetch slots when branch or date changes
    branchInput.addEventListener('change', () => {
      validateBranch();
      fetchSlots();
      updateDoctorSelect(true);
    });

    dateInput.addEventListener('change', () => {
      validateDate();
      fetchSlots();
    });

    // Initial slot setup
    if (branchInput.value && dateInput.value) {
      fetchSlots();
    } else {
      populateStaticSlots();
    }

    // 1. Branch Segment Pills (Mobile-First Touch Selector)
    const branchSegment = document.getElementById('branch-segment');
    if (branchSegment && branchInput) {
      const pills = branchSegment.querySelectorAll('.branch-pill');

      function syncBranchPills(selectedVal) {
        if (!selectedVal) return;
        pills.forEach(p => {
          const match = p.dataset.branch === selectedVal ||
            selectedVal.toLowerCase().includes(p.dataset.branch.split('/')[0].trim().toLowerCase()) ||
            p.dataset.branch.toLowerCase().includes(selectedVal.split('/')[0].trim().toLowerCase());
          p.classList.toggle('is-active', match);
          p.setAttribute('aria-selected', match ? 'true' : 'false');
        });
      }

      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.dataset.branch;
          branchInput.value = val;
          syncBranchPills(val);
          validateBranch();
          fetchSlots();
          updateDoctorSelect(true);
        });
      });

      branchInput.addEventListener('change', () => {
        syncBranchPills(branchInput.value);
      });

      if (branchInput.value) {
        syncBranchPills(branchInput.value);
      }
    }

    // 2. Dynamic 7-Day Mobile Quick Date Strip
    const quickDatesStrip = document.getElementById('quick-dates-strip');
    if (quickDatesStrip && dateInput) {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const today = new Date();
      quickDatesStrip.innerHTML = '';

      function toLocalIso(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      }

      const todayIso = toLocalIso(today);
      dateInput.min = todayIso;

      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const isoDate = toLocalIso(d);

        let dayLabel = dayNames[d.getDay()];
        if (i === 0) dayLabel = 'Today';
        else if (i === 1) dayLabel = 'Tmrw';

        const dateNum = d.getDate();
        const monthLabel = monthNames[d.getMonth()];

        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'quick-date-chip';
        chip.dataset.date = isoDate;
        chip.setAttribute('role', 'radio');
        chip.setAttribute('aria-label', `${dayLabel}, ${dateNum} ${monthLabel}`);

        chip.innerHTML = `
          <span class="quick-date-day">${dayLabel}</span>
          <span class="quick-date-num">${dateNum}</span>
          <span class="quick-date-month">${monthLabel}</span>
        `;

        chip.addEventListener('click', () => {
          dateInput.value = isoDate;
          syncDateChips(isoDate);
          validateDate();
          fetchSlots();
        });

        quickDatesStrip.appendChild(chip);
      }

      function syncDateChips(val) {
        const chips = quickDatesStrip.querySelectorAll('.quick-date-chip');
        chips.forEach(c => {
          const isSel = c.dataset.date === val;
          c.classList.toggle('is-active', isSel);
          c.setAttribute('aria-checked', isSel ? 'true' : 'false');
        });
      }

      dateInput.addEventListener('change', () => {
        syncDateChips(dateInput.value);
      });

      if (!dateInput.value) {
        dateInput.value = todayIso;
      }
      syncDateChips(dateInput.value);
    }

    // 3. Quick Dental Concern Pills
    const concernPills = document.querySelectorAll('.concern-pill');
    const noteInput = document.getElementById('form-message');
    if (concernPills.length > 0) {
      concernPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const concernText = pill.textContent.trim();
          const treatmentTarget = pill.dataset.treatment || pill.dataset.concernTreatment;

          const wasActive = pill.classList.contains('is-active');
          concernPills.forEach(p => p.classList.remove('is-active'));
          if (!wasActive) pill.classList.add('is-active');

          if (!wasActive && treatmentTarget && treatmentInput) {
            const found = CLINIC_CONFIG.treatments.find(t =>
              t.id === treatmentTarget ||
              t.name.toLowerCase().includes(treatmentTarget.toLowerCase()) ||
              treatmentTarget.toLowerCase().includes(t.name.toLowerCase())
            );
            if (found) {
              treatmentInput.value = found.name;
              treatmentInput.dispatchEvent(new Event('change'));
            }
          }

          if (noteInput && !wasActive) {
            noteInput.value = `Patient concern: ${concernText}. Please examine.`;
          }
        });
      });
    }

    // Form submit handler
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Honeypot spam check
      if (honeypotInput && honeypotInput.value !== '') {
        console.warn('Bot submission blocked.');
        return;
      }

      setFormError('');
      setSlotError('');

      const isNameValid = validateName();
      const isPhoneValid = validatePhone();
      const isTreatmentValid = validateTreatment();
      const isBranchValid = validateBranch();
      const isDateValid = validateDate();

      if (!isNameValid || !isPhoneValid || !isTreatmentValid || !isBranchValid || !isDateValid) {
        form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Collect data using branch NAME and treatment NAME
      const selectedDoctor = (doctorInput && doctorInput.value) ? doctorInput.value : 'Any available doctor';
      const payload = {
        action: 'book',
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        treatment: treatmentInput.value,
        doctor: selectedDoctor,
        branch: branchInput.value,
        date: dateInput.value,
        slot: slotInput.value || '10:00 AM',
        message: messageInput ? messageInput.value.trim() : ''
      };

      // Set Loading State
      submitBtn.disabled = true;
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner"></span> <span>Reserving Your Slot...</span>';

      // Save name & phone to localStorage for convenience
      try {
        localStorage.setItem('guptas_patient_info', JSON.stringify({
          name: payload.name,
          phone: payload.phone
        }));
      } catch (err) {}

      // Track submission via dataLayer stub
      trackEvent('consultation_booking_submit', payload);

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result && result.ok) {
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;

          // Populate Success Card
          const bookingId = result.bookingId || 'GD-' + Math.floor(100000 + Math.random() * 900000);
          const summaryBookingId = document.getElementById('summary-booking-id');
          if (summaryBookingId) {
            summaryBookingId.textContent = bookingId;
          }

          document.getElementById('summary-patient').textContent = payload.name;
          document.getElementById('summary-phone').textContent = '+91 ' + payload.phone;
          document.getElementById('summary-treatment').textContent = payload.treatment;
          const summaryDoctor = document.getElementById('summary-doctor');
          if (summaryDoctor) {
            summaryDoctor.textContent = payload.doctor;
          }
          document.getElementById('summary-branch').textContent = payload.branch;
          document.getElementById('summary-date').textContent = `${payload.date} (${payload.slot})`;

          // Configure 1-Tap WhatsApp confirmation button with Booking ID
          const waConfirmBtn = document.getElementById('btn-whatsapp-confirm');
          if (waConfirmBtn) {
            const waMessage = encodeURIComponent(
              `Hi Gupta's Dental, I just booked a consultation on your website:\n` +
              `• Booking ID: ${bookingId}\n` +
              `• Patient: ${payload.name}\n` +
              `• Phone: +91 ${payload.phone}\n` +
              `• Treatment: ${payload.treatment}\n` +
              `• Doctor: ${payload.doctor}\n` +
              `• Branch: ${payload.branch}\n` +
              `• Date & Slot: ${payload.date} (${payload.slot})\n` +
              (payload.message ? `• Note: ${payload.message}` : '')
            );
            waConfirmBtn.href = `https://wa.me/918101014751?text=${waMessage}`;
          }

          // Hide form, show success state
          form.style.display = 'none';
          if (successCard) {
            successCard.classList.add('is-active');
            successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else if (result && result.code === 'SLOT_TAKEN') {
          // On { code:'SLOT_TAKEN' }, show error inline under slot field, refetch slots and keep form filled in
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          setSlotError(result.error || 'This slot was just booked by another patient. Please select another slot.');
          fetchSlots();
        } else {
          // On any other { ok:false }, show returned error message
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          setFormError((result && result.error) || 'Booking failed. Please try again or contact us directly.');
        }
      } catch (netErr) {
        console.error('Booking submission network error:', netErr);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        setFormError(
          `Couldn't reach the server. Please try again or <a href="${CLINIC_CONFIG.contact.whatsappLink}" target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.`,
          true
        );
      }
    });

    // Reset button to allow another booking
    if (newBookingBtn) {
      newBookingBtn.addEventListener('click', () => {
        form.reset();
        initBrandHydration();
        updateDoctorSelect(false);
        setSlotError('');
        setFormError('');
        if (successCard) successCard.classList.remove('is-active');
        form.style.display = 'block';
        fetchSlots();
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  /* ==========================================================================
     7. Treatment Cards -> Smooth Scroll & Form Preselect
     ========================================================================== */
  function initTreatmentToForm() {
    const bookButtons = document.querySelectorAll('[data-book-treatment]');
    const treatmentSelect = document.getElementById('form-treatment');
    const heroCard = document.querySelector('.booking-card');

    bookButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const treatmentId = btn.getAttribute('data-book-treatment');

        if (treatmentSelect && treatmentId) {
          const matchedOpt = Array.from(treatmentSelect.options).find(
            opt => opt.dataset.id === treatmentId || opt.value.toLowerCase() === treatmentId.toLowerCase()
          );
          if (matchedOpt) {
            treatmentSelect.value = matchedOpt.value;
          } else {
            const found = CLINIC_CONFIG.specialities.find(t => t.id === treatmentId);
            if (found) treatmentSelect.value = found.name;
          }
          // Trigger change event to clear errors, mark valid, and filter doctor dropdown
          treatmentSelect.dispatchEvent(new Event('change'));
        }

        if (heroCard) {
          heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          heroCard.classList.remove('is-highlighted');
          // Re-trigger CSS animation
          void heroCard.offsetWidth;
          heroCard.classList.add('is-highlighted');

          const formName = document.getElementById('form-name');
          if (formName) {
            setTimeout(() => formName.focus(), 300);
          }

          // Track CTA click
          trackEvent('treatment_card_cta_click', { treatmentId });
        }
      });
    });

    // Handle generic "scroll-to-booking" CTAs
    document.querySelectorAll('[data-scroll-to-form]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (heroCard) {
          heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          heroCard.classList.remove('is-highlighted');
          void heroCard.offsetWidth;
          heroCard.classList.add('is-highlighted');
          const formName = document.getElementById('form-name');
          if (formName) {
            setTimeout(() => formName.focus(), 300);
          }
          trackEvent('cta_booking_click', { ctaText: btn.textContent.trim() });
        }
      });
    });
  }

  /* ==========================================================================
     7b. Doctor Profile Cards -> Form Pre-select & Smooth Scroll
     ========================================================================== */
  function initDoctorCardClick() {
    const doctorLinks = document.querySelectorAll('[data-doctor-name]');
    const formDoctorInput = document.getElementById('form-doctor');
    const formTreatmentInput = document.getElementById('form-treatment');
    const formBranchInput = document.getElementById('form-branch');
    const heroCard = document.querySelector('.booking-card');
    const formNameInput = document.getElementById('form-name');

    doctorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const docName = link.getAttribute('data-doctor-name');
        if (!docName) return;

        const doc = CLINIC_CONFIG.doctors.find(d => d.name === docName);
        if (doc) {
          // 1. Set treatment if doctor has specialities
          if (formTreatmentInput && doc.specialities && doc.specialities.length > 0) {
            const firstSpec = CLINIC_CONFIG.specialities.find(s => s.id === doc.specialities[0]);
            if (firstSpec) {
              formTreatmentInput.value = firstSpec.name;
              formTreatmentInput.dispatchEvent(new Event('change'));
            }
          }

          // 2. Set branch if doctor works at only one branch
          if (formBranchInput && doc.branchIds && doc.branchIds.length === 1) {
            const bObj = CLINIC_CONFIG.branches.find(b => b.id === doc.branchIds[0]);
            if (bObj) {
              formBranchInput.value = bObj.name;
              formBranchInput.dispatchEvent(new Event('change'));
              const pill = document.querySelector(`.branch-pill[data-branch="${bObj.name}"]`);
              if (pill) {
                document.querySelectorAll('.branch-pill').forEach(p => p.classList.remove('is-active'));
                pill.classList.add('is-active');
              }
            }
          }

          // 3. Select this doctor in dropdown
          if (formDoctorInput) {
            formDoctorInput.value = doc.name;
          }

          // 4. Smooth scroll to form, pulse card & focus name
          if (heroCard) {
            heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            heroCard.classList.remove('is-highlighted');
            void heroCard.offsetWidth;
            heroCard.classList.add('is-highlighted');
          }
          if (formNameInput) {
            setTimeout(() => formNameInput.focus(), 350);
          }

          trackEvent('doctor_card_book_click', { doctor: doc.name });
        }
      });
    });
  }

  /* ==========================================================================
     8. Before / After Comparison Slider (Pure JS, Draggable, Keyboard Accessible)
     ========================================================================== */
  function initBeforeAfterSlider() {
    const container = document.getElementById('ba-slider');
    const handle = document.getElementById('ba-handle');
    const beforeWrapper = document.getElementById('ba-before-wrap');
    if (!container || !handle || !beforeWrapper) return;

    let isDragging = false;

    function setSliderPosition(percentage, animate = false) {
      // Clamp between 5% and 95%
      const clamped = Math.max(5, Math.min(percentage, 95));
      if (animate) {
        beforeWrapper.style.transition = 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        handle.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          beforeWrapper.style.transition = '';
          handle.style.transition = '';
        }, 360);
      }
      beforeWrapper.style.width = clamped + '%';
      handle.style.left = clamped + '%';
      handle.setAttribute('aria-valuenow', Math.round(clamped));
    }

    function onPointerMove(clientX) {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = (x / rect.width) * 100;
      setSliderPosition(pct);
    }

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      beforeWrapper.style.transition = '';
      handle.style.transition = '';
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      onPointerMove(e.clientX);
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      beforeWrapper.style.transition = '';
      handle.style.transition = '';
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches.length) return;
      onPointerMove(e.touches[0].clientX);
    }, { passive: true });

    // Click anywhere on container to snap
    container.addEventListener('click', (e) => {
      onPointerMove(e.clientX);
    });

    // Keyboard accessibility for handle
    handle.addEventListener('keydown', (e) => {
      const current = parseFloat(handle.getAttribute('aria-valuenow') || '50');
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSliderPosition(current - 5);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSliderPosition(current + 5);
      }
    });

    // Instant 1-Tap Toggle Button for Mobile
    const instantToggleBtn = document.getElementById('ba-instant-toggle');
    if (instantToggleBtn) {
      let isShowingAfter = false;
      instantToggleBtn.addEventListener('click', () => {
        isShowingAfter = !isShowingAfter;
        setSliderPosition(isShowingAfter ? 90 : 10, true);
        const textSpan = instantToggleBtn.querySelector('span');
        if (textSpan) {
          textSpan.textContent = isShowingAfter ? 'Tap to View Before Result' : 'Tap to View After Result';
        }
      });
    }

    // Case Selector Tabs
    const caseTabs = document.querySelectorAll('[data-ba-case]');
    const beforeImg = document.getElementById('ba-img-before');
    const afterImg = document.getElementById('ba-img-after');
    const caseTitle = document.getElementById('ba-case-title');

    /* PLACEHOLDER: Clean SVG illustrations for 3 patient cases */
    const CASES_DATA = {
      implants: {
        title: 'Case 1: Full Arch Implant Restoration (Patient Age 52)',
        before: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%232b353b"/><text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23e2e8f0" text-anchor="middle">BEFORE: Missing Molar &amp; Severe Bone Loss</text><text x="400" y="280" font-family="sans-serif" font-size="18" fill="%2394a3b8" text-anchor="middle">Chewing difficulty &amp; collapsed bite</text></svg>',
        after: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230b4252"/><text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">AFTER: Permanent Zirconia Implants</text><text x="400" y="280" font-family="sans-serif" font-size="18" fill="%236ee7b7" text-anchor="middle">100% natural bite restored, lifetime warranty</text></svg>'
      },
      invisalign: {
        title: 'Case 2: Invisalign Clear Aligners (11 Months Treatment)',
        before: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%232e2c38"/><text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23e2e8f0" text-anchor="middle">BEFORE: Severe Crowding &amp; Crossbite</text><text x="400" y="280" font-family="sans-serif" font-size="18" fill="%2394a3b8" text-anchor="middle">Uneven smile line and speech discomfort</text></svg>',
        after: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230e464c"/><text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">AFTER: Flawlessly Aligned Natural Arch</text><text x="400" y="280" font-family="sans-serif" font-size="18" fill="%236ee7b7" text-anchor="middle">Discreet aligners, zero metal brackets</text></svg>'
      },
      whitening: {
        title: 'Case 3: Laser Whitening + Composite Veneers (Single Session)',
        before: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%233a3528"/><text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23e2e8f0" text-anchor="middle">BEFORE: Tea/Coffee Stains &amp; Micro-Chips</text><text x="400" y="280" font-family="sans-serif" font-size="18" fill="%23d4d4d8" text-anchor="middle">Discolored shade A3.5 with dull finish</text></svg>',
        after: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230c4554"/><text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">AFTER: 8 Shades Brighter (Shade B1)</text><text x="400" y="280" font-family="sans-serif" font-size="18" fill="%236ee7b7" text-anchor="middle">Enamel-safe laser, sparkling radiant smile</text></svg>'
      }
    };

    caseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        caseTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const caseKey = tab.getAttribute('data-ba-case');
        const caseItem = CASES_DATA[caseKey];
        if (caseItem && beforeImg && afterImg) {
          beforeImg.src = caseItem.before;
          afterImg.src = caseItem.after;
          if (caseTitle) caseTitle.textContent = caseItem.title;
          setSliderPosition(50);
        }
      });
    });
  }

  /* ==========================================================================
     9. Testimonial Carousel (Auto-rotate, Swipe, Pause on hover)
     ========================================================================== */
  function initTestimonialCarousel() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let currentIndex = 0;
    let autoInterval = null;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + total) % total;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Auto-play logic
    function startAutoPlay() {
      if (autoInterval) clearInterval(autoInterval);
      autoInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (autoInterval) clearInterval(autoInterval);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Touch Swipe gesture support
    let startX = 0;
    let currentX = 0;

    track.addEventListener('touchstart', (e) => {
      stopAutoPlay();
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      currentX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      const diff = startX - currentX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoPlay();
    });

    startAutoPlay();
  }

  /* ==========================================================================
     10. FAQ Accordion (Keyboard accessible & ARIA compliant)
     ========================================================================== */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question-btn');
      const pane = item.querySelector('.faq-answer-pane');
      if (!button || !pane) return;

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all other items for a clean single-open experience
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherBtn = other.querySelector('.faq-question-btn');
            const otherPane = other.querySelector('.faq-answer-pane');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPane) otherPane.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          button.setAttribute('aria-expanded', 'false');
          pane.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
          pane.style.maxHeight = pane.scrollHeight + 'px';
        }
      });
    });
  }

  /* ==========================================================================
     11. Exit-Intent & Timed Popup Modal
     ========================================================================== */
  function initExitIntentModal() {
    const modal = document.getElementById('exit-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const claimBtn = document.getElementById('modal-claim-btn');
    if (!modal) return;

    // Check if shown this session
    if (sessionStorage.getItem('guptas_exit_shown')) {
      return;
    }

    let hasTriggered = false;

    function openModal() {
      if (hasTriggered) return;
      hasTriggered = true;
      sessionStorage.setItem('guptas_exit_shown', 'true');
      modal.classList.add('is-open');
      trackEvent('exit_modal_displayed');
    }

    function closeModal() {
      modal.classList.remove('is-open');
    }

    // 1. Desktop cursor exit intent
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && window.innerWidth >= 900) {
        openModal();
      }
    });

    // 2. Fallback: 40-second timer
    setTimeout(() => {
      openModal();
    }, 40000);

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        closeModal();
        const heroCard = document.querySelector('.booking-card');
        if (heroCard) {
          heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          heroCard.classList.remove('is-highlighted');
          void heroCard.offsetWidth;
          heroCard.classList.add('is-highlighted');
        }
      });
    }
  }

  /* ==========================================================================
     12. Interactive Symptom & Guidance Banner (Section 3b)
     ========================================================================== */
  function initSymptomGuide() {
    const tiles = document.querySelectorAll('.symptom-tile');
    const treatmentSelect = document.getElementById('form-treatment');
    const heroCard = document.querySelector('.booking-card');
    const messageBox = document.getElementById('form-message');

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const treatmentId = tile.dataset.treatment || tile.dataset.symptomTreatment;
        const symptomTitle = tile.querySelector('.symptom-tile-title')?.textContent?.trim() || '';

        if (treatmentSelect && treatmentId) {
          const matchOpt = Array.from(treatmentSelect.options).find(
            opt => opt.dataset.id === treatmentId ||
                   opt.value.toLowerCase().includes(treatmentId.toLowerCase()) ||
                   treatmentId.toLowerCase().includes(opt.value.toLowerCase())
          );
          if (matchOpt) {
            treatmentSelect.value = matchOpt.value;
          } else {
            const found = CLINIC_CONFIG.treatments.find(t =>
              t.id === treatmentId ||
              t.name.toLowerCase().includes(treatmentId.toLowerCase()) ||
              treatmentId.toLowerCase().includes(t.name.toLowerCase())
            );
            if (found) treatmentSelect.value = found.name;
          }
          treatmentSelect.dispatchEvent(new Event('change'));
        }

        if (messageBox && symptomTitle) {
          messageBox.value = `Symptom reported: ${symptomTitle}. Please evaluate.`;
        }

        if (heroCard) {
          heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          heroCard.classList.remove('is-highlighted');
          void heroCard.offsetWidth;
          heroCard.classList.add('is-highlighted');
        }

        trackEvent('symptom_guide_click', { symptom: symptomTitle, treatmentId });
      });
    });
  }

  /* ==========================================================================
     13. Specialities ("Centres of Excellence") Dynamic Rendering & Filtering
     ========================================================================== */
  function initSpecialitiesGrid() {
    const grid = document.querySelector('.treatments-grid');
    const filterBtns = document.querySelectorAll('.treatment-filter-btn');
    const toggleBtn = document.getElementById('btn-toggle-specialities');
    if (!grid) return;

    let isExpanded = false;
    let activeFilter = 'all';

    function normalizeCategory(str) {
      return (str || '')
        .toString()
        .toLowerCase()
        .replace(/&amp;/g, '&')
        .replace(/[^a-z0-9]/g, '');
    }

    // Helper to select treatment and scroll to booking form
    function selectTreatmentAndScroll(treatmentId, treatmentName) {
      const treatmentSelect = document.getElementById('form-treatment');
      const heroCard = document.querySelector('.booking-card');

      if (treatmentSelect) {
        let matchedOpt = Array.from(treatmentSelect.options).find(
          opt => opt.dataset.id === treatmentId || opt.value.toLowerCase() === treatmentId.toLowerCase()
        );
        if (!matchedOpt && treatmentName) {
          matchedOpt = Array.from(treatmentSelect.options).find(
            opt => opt.value.toLowerCase() === treatmentName.toLowerCase()
          );
        }
        if (matchedOpt) {
          treatmentSelect.value = matchedOpt.value;
        } else if (treatmentName) {
          treatmentSelect.value = treatmentName;
        }
        treatmentSelect.dispatchEvent(new Event('change'));
      }

      if (heroCard) {
        heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        heroCard.classList.remove('is-highlighted');
        void heroCard.offsetWidth;
        heroCard.classList.add('is-highlighted');
      }

      const formNameInput = document.getElementById('form-name');
      if (formNameInput) {
        setTimeout(() => formNameInput.focus(), 350);
      }
    }

    // SVG icons dictionary for each speciality ID
    const icons = {
      implants: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10M7 7h10M8 11h8M9 15h6M10 19h4M12 21v-2"></path><path d="M9 3v4M15 3v4"></path></svg>`,
      invisalign: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2-4 6-6 8-6s6 2 8 6"></path><path d="M7 11v3M10 9v5M14 9v5M17 11v3"></path></svg>`,
      'root-canal': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 4.5 5 8c0 3 1.5 5.5 3 9 1 2 2 5 4 5s3-3 4-5c1.5-3.5 3-6 3-9 0-3.5-3-6-7-6z"></path><path d="M12 7v6"></path></svg>`,
      whitening: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`,
      'smile-design': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 3 4 3 4-3 4-3"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
      pediatric: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`,
      general: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>`,
      orthodontics: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="4" height="6" rx="1"></rect><rect x="10" y="9" width="4" height="6" rx="1"></rect><rect x="17" y="9" width="4" height="6" rx="1"></rect><line x1="1" y1="12" x2="23" y2="12"></line></svg>`,
      'crown-bridge': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 8h11L21 8l-4.5 2.5L12 4l-4.5 6.5L3 8z"></path><path d="M6.5 16h11"></path></svg>`,
      periodontics: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c2.5 0 3-3 6-3s3.5 3 6 3 3.5-3 6-3"></path><path d="M3 19c2.5 0 3-3 6-3s3.5 3 6 3 3.5-3 6-3"></path></svg>`,
      'oral-surgery': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18"></path><circle cx="12" cy="12" r="9"></circle></svg>`,
      'laser-dentistry': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="7"></line><line x1="12" y1="17" x2="12" y2="23"></line><line x1="1" y1="12" x2="7" y2="12"></line><line x1="17" y1="12" x2="23" y2="12"></line><circle cx="12" cy="12" r="3"></circle></svg>`,
      'oral-medicine': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="M11 8v6M8 11h6"></path></svg>`,
      opg: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
      geriatric: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
    };

    // Render all 15 cards dynamically from Single Source of Truth
    grid.innerHTML = '';
    CLINIC_CONFIG.specialities.forEach((spec, idx) => {
      const card = document.createElement('article');
      card.className = 'treatment-card';
      card.dataset.category = spec.category;
      card.dataset.id = spec.id;
      card.dataset.index = idx;
      card.style.opacity = '1';
      card.style.display = 'flex';

      const iconSvg = icons[spec.id] || icons.general;

      card.innerHTML = `
        <div class="treatment-icon-wrap" aria-hidden="true">
          ${iconSvg}
        </div>
        <h3 class="treatment-name">${spec.name}</h3>
        <p class="treatment-desc">${spec.desc}</p>
        <div class="treatment-card-footer">
          <span class="treatment-tag">${spec.badge}</span>
          <button type="button" class="btn btn-outline" data-book-treatment="${spec.id}">
            Book Now →
          </button>
        </div>
      `;

      // Direct click handler for "Book Now" CTA on each card
      const bookBtn = card.querySelector('[data-book-treatment]');
      if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
          e.preventDefault();
          selectTreatmentAndScroll(spec.id, spec.name);
          trackEvent('treatment_book_click', { treatment: spec.name });
        });
      }

      grid.appendChild(card);
    });

    // Visibility update function (handles 6-card limit on 'all' vs full list on filter)
    function updateCardVisibility() {
      const cards = grid.querySelectorAll('.treatment-card');
      const normalizedActive = normalizeCategory(activeFilter);
      let visibleCount = 0;

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        const normalizedCardCat = normalizeCategory(cat);
        const idx = parseInt(card.dataset.index, 10);

        if (normalizedActive === 'all' || !normalizedActive) {
          // If All: respect isExpanded (first 6 cards or all 15)
          if (!isExpanded && idx >= 6) {
            card.classList.add('is-collapsed');
            card.style.display = 'none';
          } else {
            card.classList.remove('is-collapsed');
            card.style.display = 'flex';
            card.style.opacity = '1';
            visibleCount++;
          }
        } else {
          // If category filter active: show all matches without limit
          if (normalizedCardCat === normalizedActive) {
            card.classList.remove('is-collapsed');
            card.style.display = 'flex';
            card.style.opacity = '1';
            visibleCount++;
          } else {
            card.classList.add('is-collapsed');
            card.style.display = 'none';
          }
        }
      });

      // Update toggle button text, icon and aria-expanded
      if (toggleBtn) {
        if (normalizedActive === 'all' || !normalizedActive) {
          toggleBtn.style.display = 'inline-flex';
          toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
          const textSpan = toggleBtn.querySelector('span');
          if (textSpan) {
            textSpan.textContent = isExpanded ? 'Show fewer specialities' : 'View all 15 specialities';
          }
          const icon = toggleBtn.querySelector('.toggle-icon');
          if (icon) {
            icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        } else {
          toggleBtn.style.display = 'none';
        }
      }
    }

    // Toggle button listener (View all 15 specialities <-> Show fewer)
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        updateCardVisibility();
        if (!isExpanded) {
          const sec = document.getElementById('treatments');
          if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Category filter button listeners
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        activeFilter = btn.dataset.filter || 'all';
        updateCardVisibility();
        trackEvent('treatment_filter_change', { filter: activeFilter });
      });
    });

    // Initial display
    updateCardVisibility();
  }

  /* ==========================================================================
     14. Live Social Proof Floating Ticker (Disabled)
     ========================================================================== */
  function initSocialProofTicker() {
    const ticker = document.getElementById('social-proof-ticker');
    if (!ticker) return;
  }

  /* ==========================================================================
     DOM Ready Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initBrandHydration();
    initHeroSearch();
    initHeaderScroll();
    initHeroBackgroundSlider();
    initCountUpStats();
    initScrollReveal();
    initBookingForm();
    initTreatmentToForm();
    initDoctorCardClick();
    initBeforeAfterSlider();
    initTestimonialCarousel();
    initFaqAccordion();
    initExitIntentModal();
    initSymptomGuide();
    initSpecialitiesGrid();
    initSocialProofTicker();
  });

})();
