// Page Navigation System
const PageManager = {
  init: function() {
    this.setupEventListeners();
    this.showPage('halaman-awal');
  },

  setupEventListeners: function() {
    // Add any global event listeners here
  },

  showPage: function(pageId) {
    try {
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      
      const target = document.getElementById(pageId);
      if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
        this.playTransitionAnimation();
      } else {
        console.error(`Page with ID ${pageId} not found`);
      }
    } catch (error) {
      console.error('Error in showPage:', error);
    }
  },

  playTransitionAnimation: function() {
    // Add page transition animations if needed
  }
};

// Audio Manager
const AudioManager = {
  play: function(soundId) {
    try {
      const sound = document.getElementById(soundId);
      if (sound) {
        sound.currentTime = 0; // Reset audio to start
        sound.play().catch(e => console.warn('Audio playback prevented:', e));
      }
    } catch (error) {
      console.error('Error in audio playback:', error);
    }
  }
};

// Research Type Selection
const ResearchType = {
  selectedType: null,
  
  select: function(type) {
    this.selectedType = type;
    this.showFeedback(`Kamu memilih metode ${type}`);
    // Additional logic can be added here
  },
  
  showFeedback: function(message) {
    const feedback = document.createElement('div');
    feedback.className = 'floating-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  }
};

// Data Search System
const DataSearch = {
  search: function() {
    const searchTerm = document.getElementById('searchInput')?.value.trim();
    const resultsContainer = document.getElementById('results');
    
    if (!searchTerm || !resultsContainer) return;
    
    resultsContainer.innerHTML = `
      <div class="search-result">
        <h4>Hasil pencarian untuk: <strong>${this.escapeHTML(searchTerm)}</strong></h4>
        <p>Contoh data yang ditemukan...</p>
        <button class="copy-btn" onclick="DataSearch.copyResult()">Salin Data</button>
      </div>
    `;
  },
  
  copyResult: function() {
    // Implement copy functionality
    alert('Data berhasil disalin ke clipboard!');
  },
  
  escapeHTML: function(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag]));
  }
};

// Reference System
const ReferenceSystem = {
  add: function() {
    const quote = document.getElementById('quoteInput')?.value.trim();
    const source = document.getElementById('sourceInput')?.value.trim();
    
    if (!quote || !source) {
      this.showError('Harap isi kutipan dan sumber referensi');
      return;
    }
    
    const listItem = document.createElement('li');
    listItem.className = 'reference-item';
    listItem.innerHTML = `
      <div class="reference-quote">${this.escapeHTML(quote)}</div>
      <div class="reference-source">— ${this.escapeHTML(source)}</div>
      <button class="delete-btn" onclick="ReferenceSystem.deleteReference(this)">×</button>
    `;
    
    document.getElementById('refItems').appendChild(listItem);
    this.clearInputs();
    this.showSuccess('Referensi berhasil ditambahkan!');
  },
  
  deleteReference: function(button) {
    button.parentElement.remove();
  },
  
  clearInputs: function() {
    document.getElementById('quoteInput').value = '';
    document.getElementById('sourceInput').value = '';
  },
  
  showError: function(message) {
    // Implement error display
    alert(message);
  },
  
  showSuccess: function(message) {
    // Implement success display
    console.log(message);
  },
  
  escapeHTML: DataSearch.escapeHTML // Reuse the same method
};

// Tab System
const TabSystem = {
  currentTab: 'teori',
  
  select: function(tabName) {
    this.currentTab = tabName;
    document.getElementById('textArea').placeholder = `Mulai menulis bagian ${tabName} di sini...`;
    
    // Update active tab UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes(tabName));
    });
  }
};

// Section Saving System
const SectionSaver = {
  save: function() {
    const textArea = document.getElementById('textArea');
    if (!textArea?.value.trim()) {
      this.showMessage('Harap isi konten terlebih dahulu', 'error');
      return;
    }
    
    // In a real app, you would save to database/localStorage
    this.showMessage('Bagian berhasil disimpan!', 'success');
  },
  
  showMessage: function(message, type) {
    const messageEl = document.getElementById('saveMessage');
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.className = `save-message ${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3000);
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  PageManager.init();
  
  // Setup button event listeners
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      if (action === 'play-sound') {
        AudioManager.play(this.getAttribute('data-sound'));
      }
      // Add other actions as needed
    });
  });
});

// Public functions for HTML onclick attributes
function playClickSound() {
  AudioManager.play('clickSound');
}

function selectType(type) {
  ResearchType.select(type);
}

function searchData() {
  DataSearch.search();
}

function saveData() {
  // Implement save data functionality
  alert('Data berhasil disimpan!');
}

function addReference() {
  ReferenceSystem.add();
}

function selectTab(tabName) {
  TabSystem.select(tabName);
}

function saveSection() {
  SectionSaver.save();
}

function showCongratulations() {
  document.getElementById('congrats').classList.remove('hidden');
}

function startNew() {
  PageManager.showPage('halaman-awal');
}

function showAdvancedTips() {
  const tipsHTML = `
    <div class="search-tips" id="searchTips">
      <div class="tips-content">
        <span class="close-tips" onclick="closeTips()">&times;</span>
        <h3>Tips Pencarian Google untuk Riset</h3>
        <ul>
          <li><strong>site:.edu</strong> - Hanya hasil dari situs pendidikan</li>
          <li><strong>filetype:pdf</strong> - Hanya file PDF</li>
          <li><strong>intitle:"your keywords"</strong> - Cari di judul dokumen</li>
          <li><strong>2018..2023</strong> - Rentang tahun tertentu</li>
          <li><strong>-wiki</strong> - Exclude Wikipedia</li>
        </ul>
        <p>Contoh: <code>penelitian kualitatif pendidikan site:.edu filetype:pdf 2020..2023</code></p>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', tipsHTML);
  document.getElementById('searchTips').style.display = 'flex';
}

function closeTips() {
  const tips = document.getElementById('searchTips');
  if (tips) {
    tips.remove();
  }
}

function exitGame() {
  if (confirm('Apakah kamu yakin ingin keluar dari BERANI?')) {
    alert('Terima kasih telah menggunakan BERANI!');
    // In a real app: window.close() or redirect
  }
}

function submitEksplorasi() {
  const link = document.getElementById('link-jurnal')?.value.trim();
  const latarBelakang = document.getElementById('latar-belakang')?.value.trim();
  const feedback = document.getElementById('feedback');
  
  if (!link || !latarBelakang || !feedback) return;
  
  feedback.innerHTML = `
    <h3>✅ Eksplorasi Berhasil!</h3>
    <p>Kamu telah memilih jurnal dari: <a href="${link}" target="_blank">${link}</a></p>
    <div class="preview-box">${latarBelakang.slice(0, 100)}...</div>
  `;
  feedback.classList.remove('hidden');
}

function lanjut() {
  PageManager.showPage('halaman-r');
}