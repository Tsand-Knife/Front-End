// Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Enhanced card interactions
        document.querySelectorAll('.subject-card').forEach((card, index) => {
            // Staggered animation delay
            card.style.animationDelay = (index * 0.1) + 's';
            
            card.addEventListener('click', function(e) {
                const targetUrl = this.getAttribute('href'); 
                const subjectName = this.querySelector('.subject-name').textContent.trim();

                // Tambahkan animasi klik
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = ''; // Kembalikan transformasi setelah animasi
                    
                    if (targetUrl === '#') {
                        // Jika href adalah '#', tampilkan alert
                        e.preventDefault(); // Mencegah navigasi default jika href adalah '#'
                        alert(`Mata pelajaran: ${subjectName} saat ini belum tersedia.`); 
                    } else {
                        // Jika href adalah URL sebenarnya, biarkan link berfungsi normal
                        // Tidak perlu e.preventDefault() atau window.location.href di sini
                        // karena link <a> akan menangani navigasi secara otomatis
                    }
                }, 150); // Durasi animasi klik
            });

            // Add magnetic effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translateY(-15px) scale(1.05) rotateX(${y / 10}deg) rotateY(${x / 10}deg)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Enhanced search functionality
        const searchInput = document.querySelector('.search-input');
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                if (query.trim()) {
                    // Add search animation
                    this.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = '';
                        alert(`Mencari: "${query}"`);
                    }, 200);
                }
            }
        });

        // Add floating effect to search input
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-8px) scale(1.02)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

        // Initialize particles
        createParticles();

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add logo click effect
        document.querySelector('.logo').addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'gradientText 3s ease infinite';
            }, 10);
        });