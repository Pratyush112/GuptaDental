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
    treatments: [
      { id: 'implants', name: 'Dental Implants' },
      { id: 'invisalign', name: 'Invisalign & Clear Braces' },
      { id: 'root-canal', name: 'Microscopic Root Canal (RCT)' },
      { id: 'whitening', name: 'Laser Teeth Whitening' },
      { id: 'smile-design', name: 'Smile Designing & Veneers' },
      { id: 'pediatric', name: 'Paediatric Dentistry' }
    ],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:30 PM', '08:00 PM']
  };

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
    const dateInput = document.getElementById('form-date');
    const slotInput = document.getElementById('form-slot');
    const messageInput = document.getElementById('form-message');
    const honeypotInput = document.getElementById('form-website');
    const submitBtn = document.getElementById('form-submit-btn');
    const successCard = document.getElementById('booking-success-card');
    const newBookingBtn = document.getElementById('btn-book-another');
    const errorSlot = document.getElementById('error-slot');
    const errorForm = document.getElementById('error-form');

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

    treatmentInput.addEventListener('change', validateTreatment);

    // Fetch slots when branch or date changes
    branchInput.addEventListener('change', () => {
      validateBranch();
      fetchSlots();
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
          const treatmentTarget = pill.dataset.treatment;

          const wasActive = pill.classList.contains('is-active');
          concernPills.forEach(p => p.classList.remove('is-active'));
          if (!wasActive) pill.classList.add('is-active');

          if (!wasActive && treatmentTarget && treatmentInput) {
            const found = CLINIC_CONFIG.treatments.find(t => t.id === treatmentTarget);
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
      const payload = {
        action: 'book',
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        treatment: treatmentInput.value,
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
            const found = CLINIC_CONFIG.treatments.find(t => t.id === treatmentId);
            if (found) treatmentSelect.value = found.name;
          }
          // Trigger change event to clear errors and mark valid
          treatmentSelect.dispatchEvent(new Event('change'));
        }

        if (heroCard) {
          heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          heroCard.classList.remove('is-highlighted');
          // Re-trigger CSS animation
          void heroCard.offsetWidth;
          heroCard.classList.add('is-highlighted');

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
          trackEvent('cta_booking_click', { ctaText: btn.textContent.trim() });
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
        const treatmentId = tile.dataset.treatment;
        const symptomTitle = tile.querySelector('.symptom-tile-title')?.textContent?.trim() || '';

        if (treatmentSelect && treatmentId) {
          const matchOpt = Array.from(treatmentSelect.options).find(
            opt => opt.dataset.id === treatmentId || opt.value.toLowerCase().includes(treatmentId)
          );
          if (matchOpt) {
            treatmentSelect.value = matchOpt.value;
          } else {
            const found = CLINIC_CONFIG.treatments.find(t => t.id === treatmentId);
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
     13. Treatment Category Filter Bar (Section 4)
     ========================================================================== */
  function initTreatmentFilter() {
    const filterBtns = document.querySelectorAll('.treatment-filter-btn');
    const cards = document.querySelectorAll('.treatment-card');
    if (filterBtns.length === 0 || cards.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const filterVal = btn.dataset.filter || 'all';

        cards.forEach(card => {
          const cat = card.dataset.category || '';
          if (filterVal === 'all' || cat === filterVal) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });

        trackEvent('treatment_filter_change', { filter: filterVal });
      });
    });
  }

  /* ==========================================================================
     14. Treatment Cost & 0% EMI Estimator (Section 4b)
     ========================================================================== */
  function initCostEstimator() {
    const tabBtns = document.querySelectorAll('.calc-tab-btn');
    const groups = document.querySelectorAll('.calc-option-group');
    const amountEl = document.getElementById('calc-amount');
    const periodEl = document.getElementById('calc-period');
    const emiEl = document.getElementById('calc-emi');
    const bookBtn = document.getElementById('btn-calc-book');
    const treatmentSelect = document.getElementById('form-treatment');
    const heroCard = document.querySelector('.booking-card');
    const messageBox = document.getElementById('form-message');

    if (tabBtns.length === 0 || !amountEl) return;

    let currentService = 'implants';

    // Pricing calculation model
    function calculateCost() {
      let total = 22000;
      let period = '/ tooth';
      let treatmentName = "Dental Implants";

      if (currentService === 'implants') {
        treatmentName = "Dental Implants";
        const teethActive = document.querySelector('#calc-implant-teeth .calc-pill.is-active')?.dataset.val || '1';
        const tierActive = document.querySelector('#calc-implant-tier .calc-pill.is-active')?.dataset.val || 'standard';

        if (teethActive === 'full') {
          total = tierActive === 'standard' ? 160000 : 220000;
          period = '/ arch';
        } else {
          const count = parseInt(teethActive, 10) || 1;
          const perTooth = tierActive === 'standard' ? 22000 : 32000;
          total = count * perTooth;
          period = count === 1 ? '/ tooth' : `for ${count} teeth`;
        }
      } else if (currentService === 'rct') {
        treatmentName = "Root Canal Treatment";
        const loc = document.querySelector('#calc-rct-location .calc-pill.is-active')?.dataset.val || 'front';
        const type = document.querySelector('#calc-rct-type .calc-pill.is-active')?.dataset.val || 'standard';
        let base = loc === 'front' ? 3500 : 4500;
        if (type === 'laser') base += 1500;
        total = base;
        period = '/ tooth';
      } else if (currentService === 'invisalign') {
        treatmentName = "Invisalign & Braces";
        const tier = document.querySelector('#calc-aligner-tier .calc-pill.is-active')?.dataset.val || 'mild';
        if (tier === 'mild') total = 45000;
        else if (tier === 'moderate') total = 75000;
        else total = 125000;
        period = 'complete plan';
      } else if (currentService === 'whitening') {
        treatmentName = "Laser Teeth Whitening";
        const tier = document.querySelector('#calc-whitening-tier .calc-pill.is-active')?.dataset.val || 'express';
        total = tier === 'express' ? 6500 : 11500;
        period = 'per session';
      } else if (currentService === 'crowns') {
        treatmentName = "Smile Designing";
        const tier = document.querySelector('#calc-crown-tier .calc-pill.is-active')?.dataset.val || 'metal-free';
        total = tier === 'metal-free' ? 6500 : 11000;
        period = '/ crown';
      }

      const emiMonthly = Math.round(total / 12);

      amountEl.textContent = total.toLocaleString('en-IN');
      if (periodEl) periodEl.textContent = period;
      if (emiEl) emiEl.textContent = `₹${emiMonthly.toLocaleString('en-IN')}/mo`;

      return { total, treatmentName };
    }

    // Tab switching
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        currentService = btn.dataset.calcService;

        // Show matching option group
        groups.forEach(g => {
          if (g.id === `calc-group-${currentService}`) {
            g.style.display = 'block';
            g.classList.add('is-active');
          } else {
            g.style.display = 'none';
            g.classList.remove('is-active');
          }
        });

        calculateCost();
      });
    });

    // Pill selector click handler
    document.querySelectorAll('.calc-pill-selector .calc-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const parent = pill.parentElement;
        if (!parent) return;
        parent.querySelectorAll('.calc-pill').forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        calculateCost();
      });
    });

    // "Lock This Estimate & Book Free Visit" CTA
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const { total, treatmentName } = calculateCost();

        if (treatmentSelect) {
          treatmentSelect.value = treatmentName;
          treatmentSelect.dispatchEvent(new Event('change'));
        }

        if (messageBox) {
          messageBox.value = `Estimate computed: ${treatmentName} ~₹${total.toLocaleString('en-IN')}. Inquiring 0% EMI & free 3D scan.`;
        }

        if (heroCard) {
          heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          heroCard.classList.remove('is-highlighted');
          void heroCard.offsetWidth;
          heroCard.classList.add('is-highlighted');
        }

        trackEvent('calc_lock_estimate_click', { service: currentService, estimate: total });
      });
    }

    // Initial calculation
    calculateCost();
  }

  /* ==========================================================================
     15. Live Social Proof Floating Ticker
     ========================================================================== */
  function initSocialProofTicker() {
    const ticker = document.getElementById('social-proof-ticker');
    const tickerMain = document.getElementById('ticker-main');
    const tickerMeta = document.getElementById('ticker-meta');
    const tickerClose = document.getElementById('ticker-close');

    if (!ticker || !tickerMain || !tickerMeta) return;

    if (sessionStorage.getItem('guptas_ticker_closed')) {
      ticker.style.display = 'none';
      return;
    }

    if (tickerClose) {
      tickerClose.addEventListener('click', () => {
        ticker.style.opacity = '0';
        ticker.style.transform = 'translateY(16px)';
        setTimeout(() => {
          ticker.style.display = 'none';
        }, 400);
        sessionStorage.setItem('guptas_ticker_closed', 'true');
      });
    }

    const tickerItems = [
      { main: 'Ananya S. from Salt Lake booked a consultation', meta: '3 mins ago • Phoolbagan Clinic' },
      { main: 'Debashis G. from Dum Dum booked Dental Implant Visit', meta: '9 mins ago • Seven Tanks Clinic' },
      { main: 'Rahul M. from Kankurgachi booked Root Canal treatment', meta: '14 mins ago • Phoolbagan Clinic' },
      { main: 'Sneha D. from Baguiati booked 3D Aligners Scan', meta: '22 mins ago • Seven Tanks Clinic' },
      { main: 'Amitava B. from Girish Park booked Laser Teeth Whitening', meta: '37 mins ago • Phoolbagan Clinic' }
    ];

    let currentIdx = 0;
    setInterval(() => {
      if (ticker.style.display === 'none') return;
      currentIdx = (currentIdx + 1) % tickerItems.length;

      ticker.style.opacity = '0';
      ticker.style.transform = 'translateY(10px)';

      setTimeout(() => {
        tickerMain.textContent = tickerItems[currentIdx].main;
        tickerMeta.textContent = tickerItems[currentIdx].meta;
        ticker.style.opacity = '1';
        ticker.style.transform = 'translateY(0)';
      }, 350);
    }, 8500);
  }

  /* ==========================================================================
     DOM Ready Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initBrandHydration();
    initHeaderScroll();
    initHeroBackgroundSlider();
    initCountUpStats();
    initScrollReveal();
    initBookingForm();
    initTreatmentToForm();
    initBeforeAfterSlider();
    initTestimonialCarousel();
    initFaqAccordion();
    initExitIntentModal();
    initSymptomGuide();
    initTreatmentFilter();
    initCostEstimator();
    initSocialProofTicker();
  });

})();
