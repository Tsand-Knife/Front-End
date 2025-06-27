
  const form = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('toggle-password');
  const eyeIcon = document.getElementById('eye-icon');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const alertContainer = document.getElementById('alert-container');

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    if (type === 'text') {
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>`;
    } else {
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>`;
    }
  });

  // Show alert message
  function showAlert(message, type = 'error') {
    alertContainer.innerHTML = `
      <div class="border-l-4 p-4 rounded mb-4 ${type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              ${type === 'success' ? 
                '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>' :
                '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>'}
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm">${message}</p>
          </div>
        </div>
      </div>`;
  }

  // Validate form
  function validateForm() {
    alertContainer.innerHTML = '';
    let isValid = true;

    usernameInput.classList.remove('border-red-500');
    passwordInput.classList.remove('border-red-500');

    if (usernameInput.value.trim() === '') {
      showAlert('Username atau email wajib diisi');
      usernameInput.classList.add('border-red-500');
      isValid = false;
    }

    if (passwordInput.value.trim() === '') {
      showAlert('Password wajib diisi');
      passwordInput.classList.add('border-red-500');
      isValid = false;
    }

    return isValid;
  }

  // Handle form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');

    try {
      // Simulate login
      await new Promise(res => setTimeout(res, 2000));
      
      // Example condition (replace with real API logic)
      if (usernameInput.value === 'thinked' && passwordInput.value === '1234') {
        showAlert('Login berhasil! Selamat datang.', 'success');
        // Redirect logic
        setTimeout(() => {
          window.location.href = 'landing.html';
        }, 1500);
      } else {
        showAlert('Username atau password salah.');
      }
    } catch (err) {
      showAlert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
    }
  });
