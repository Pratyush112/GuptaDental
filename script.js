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
      phoneDisplay: '+91 90385 95251',
      phoneTel: '+919038595251',
      whatsappDisplay: '+91 90385 95251',
      whatsappLink: 'https://wa.me/919038595251?text=Hi%20Gupta%27s%20Dental%2C%20I%20would%20like%20to%20book%20a%20consultation',
      email: 'care@guptasdental.in'
    },
    branches: [
      {
        id: 'phoolbagan',
        name: 'Phoolbagan / Kankurgachi',
        address: 'P-87, CIT Road, near Phoolbagan Police Station, Phool Bagan, Kolkata 700054',
        timings: 'Open all 7 days: 10:00 AM - 9:00 PM',
        parking: 'Patient parking available',
        phone: '+91 90385 95251',
        phoneTel: '+919038595251',
        mapQuery: 'P-87,+CIT+Road,+near+Phoolbagan+Police+Station,+Phool+Bagan,+Kolkata+700054',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.095493902347!2d88.390544!3d22.575677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027663242ea395%3A0xc3f87b8f9e61298c!2sPhoolbagan%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
      },
      {
        id: 'seven-tanks',
        name: 'Seven Tanks / South Dum Dum',
        address: '122/1D, South Sinthee Road, 50ft Road, Seven Tanks Welfare Association, South Dum Dum, Kolkata 700030',
        timings: 'Open 6 days: 10:00 AM - 9:00 PM (Closed Thursday)',
        parking: 'Street and association visitor parking available',
        phone: '+91 84200 22591',
        phoneTel: '+918420022591',
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

    // Populate treatment select dropdown
    const treatmentSelect = document.getElementById('form-treatment');
    if (treatmentSelect && treatmentSelect.options.length <= 1) {
      CLINIC_CONFIG.treatments.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.name;
        treatmentSelect.appendChild(opt);
      });
    }

    // Populate branch select dropdown
    const branchSelect = document.getElementById('form-branch');
    if (branchSelect && branchSelect.options.length <= 1) {
      CLINIC_CONFIG.branches.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.name;
        branchSelect.appendChild(opt);
      });
    }

    // Populate time slot select dropdown or chips
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
     6. Booking Form Logic (Validation, LocalStorage, Honeypot, Mock Submit)
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
    branchInput.addEventListener('change', validateBranch);
    dateInput.addEventListener('change', validateDate);

    // Form submit handler
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot spam check
      if (honeypotInput && honeypotInput.value !== '') {
        console.warn('Bot submission blocked.');
        return;
      }

      const isNameValid = validateName();
      const isPhoneValid = validatePhone();
      const isTreatmentValid = validateTreatment();
      const isBranchValid = validateBranch();
      const isDateValid = validateDate();

      if (!isNameValid || !isPhoneValid || !isTreatmentValid || !isBranchValid || !isDateValid) {
        // Scroll form into view if needed
        form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Collect data
      const formData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        treatmentId: treatmentInput.value,
        treatmentName: treatmentInput.options[treatmentInput.selectedIndex].text,
        branchId: branchInput.value,
        branchName: branchInput.options[branchInput.selectedIndex].text,
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
          name: formData.name,
          phone: formData.phone
        }));
      } catch (err) {}

      // Track submission via dataLayer stub
      trackEvent('consultation_booking_submit', formData);

      // Simulated network call (replaceable with real fetch('/api/book', {...}))
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Populate Success Card
        document.getElementById('summary-patient').textContent = formData.name;
        document.getElementById('summary-phone').textContent = '+91 ' + formData.phone;
        document.getElementById('summary-treatment').textContent = formData.treatmentName;
        document.getElementById('summary-branch').textContent = formData.branchName;
        document.getElementById('summary-date').textContent = `${formData.date} (${formData.slot})`;

        // Hide form, show success state
        form.style.display = 'none';
        if (successCard) {
          successCard.classList.add('is-active');
          successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1100);
    });

    // Reset button to allow another booking
    if (newBookingBtn) {
      newBookingBtn.addEventListener('click', () => {
        form.reset();
        initBrandHydration();
        if (successCard) successCard.classList.remove('is-active');
        form.style.display = 'block';
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
          treatmentSelect.value = treatmentId;
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

    function setSliderPosition(percentage) {
      // Clamp between 5% and 95%
      const clamped = Math.max(5, Math.min(percentage, 95));
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
  });

})();
