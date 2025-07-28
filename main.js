    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('✅ Service Worker Registered'))
        .catch(error => console.error('❌ SW registration failed:', error));
    }

    // Splash screen
    window.addEventListener('load', () => {
      setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash) {
          splash.style.opacity = '0';
          setTimeout(() => splash.remove(), 600);
        }
      }, 1200); // Splash vises i 1.2 sekunder eller indtil assets er loaded
    });

    // Note saving logic
    const notepadContent = document.getElementById('notepad');
    // Load saved note on page load
    notepadContent.value = localStorage.getItem('scribbl-note') || '';
    // Save note on every input
    notepadContent.addEventListener('input', () => {
      localStorage.setItem('scribbl-note', notepadContent.value);
    });

    // When trashcan is clicked, ask if user wants to clear the note.
    function clearNote(){
      if (confirm('Are you sure you want to clear your note? This cannot be undone.')) {
        notepadContent.value = '';
        localStorage.removeItem('scribbl-note');
      }
    }
    