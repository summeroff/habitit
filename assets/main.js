/* ----------  HABIT TOGGLE + ARIA ------------------------------------ */
export function toggleDetails(btn) {
    const details = btn.nextElementSibling;
    const expanded = details.classList.toggle('show');
    btn.setAttribute('aria-expanded', expanded);
    btn.querySelector('.toggle').textContent = expanded ? '−' : '+';
  }
  
  /* ----------  RANDOM DAILY FOCUS ------------------------------------- */
  export function highlightRandomHabit() {
    const items = document.querySelectorAll('.habit-item');
    if (!items.length) return;
    const pick = items[Math.floor(Math.random() * items.length)];
    pick.classList.add('highlighted');
    pick.querySelector('.focus-label').style.display = 'inline';
  }
  
  /* ----------  INIT ---------------------------------------------------- */
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    /* hook up every .habit-title */
    document.querySelectorAll('.habit-title').forEach((btn, i) => {
      const details = btn.nextElementSibling;
      const detailsId = `habit-details-${i}`;
      details.id = detailsId;
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-controls', detailsId);
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => toggleDetails(btn));
      btn.addEventListener('keyup', e => { if (e.key === 'Enter' || e.key === ' ') toggleDetails(btn); });
    });
  
    /* good‑habits page only */
    if (document.body.dataset.page === 'good-habits') highlightRandomHabit();
  }
  
/* ----------  AI‑Prompt clipboard copy ----------------------------- */
document.addEventListener('click', e=>{
    if(!e.target.classList.contains('ai-btn')) return;
    const prompt = e.target.dataset.prompt;
    navigator.clipboard.writeText(prompt).then(()=>{
      const old = e.target.textContent;
      e.target.textContent = '✅ Copied!';
      setTimeout(()=>{ e.target.textContent = old; }, 1500);
    });
  });
  