    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('✅ Service Worker Registered'))
        .catch(error => console.error('❌ SW registration failed:', error));
    }

    // Note saving logic
    const notepadContent = document.getElementById('notepad');
    // Load saved note on page load
    notepadContent.value = localStorage.getItem('scribbl-note') || '';
    // Save note on every input
    notepadContent.addEventListener('input', () => {
      localStorage.setItem('scribbl-note', notepadContent.value);
    });

    // Long press to clear note logic
    let clearTimer = null;
    function startClearTimer(e) {
      // Only left mouse button or touch
      if (e.type === 'mousedown' && e.button !== 0) return;
      clearTimer = setTimeout(() => {
        if (confirm('Are you sure you want to clear your note? This cannot be undone.')) {
          notepadContent.value = '';
          localStorage.removeItem('scribbl-note');
        }
      }, 1000);
    }
    function cancelClearTimer() {
      clearTimeout(clearTimer);
      clearTimer = null;
    }
    notepadContent.addEventListener('mousedown', startClearTimer);
    notepadContent.addEventListener('touchstart', startClearTimer);
    notepadContent.addEventListener('mouseup', cancelClearTimer);
    notepadContent.addEventListener('mouseleave', cancelClearTimer);
    notepadContent.addEventListener('touchend', cancelClearTimer);
    notepadContent.addEventListener('touchcancel', cancelClearTimer);
    