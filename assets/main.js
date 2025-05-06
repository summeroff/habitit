/* —————————— Clipboard helper (already existed) —————————— */
document.addEventListener('click', e => {
    const btn = e.target.closest('.ai-btn');
    if (!btn) return;
  
    navigator.clipboard.writeText(btn.dataset.prompt).then(() => {
      btn.textContent = '✅ Copied';
      setTimeout(() => (btn.textContent = 'Ask AI'), 1500);
    });
  });
  
  /* —————————— Dark / Light theme logic —————————— */
  const root        = document.documentElement;
  const savedTheme  = localStorage.getItem('theme');      // 'dark' | 'light' | null
  const toggleBtn   = document.getElementById('theme-toggle');
  
  /* 1 · Apply saved preference (if any) */
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.setAttribute('data-theme', savedTheme);
    setToggleIcon(savedTheme);
  }
  
  /* 2 · Toggle handler */
  toggleBtn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || getSystemPref();
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setToggleIcon(next);
  });
  
  /* Helper: icon swap */
  function setToggleIcon(mode) {
    if (!toggleBtn) return;
    toggleBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
  }
  
  /* Helper: system default */
  function getSystemPref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  