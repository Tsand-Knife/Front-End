let previousContent = null; // Menyimpan konten sebelumnya

    function showContent(subject) {
        document.getElementById('main-menu').style.display = 'none';

        const contentAreas = document.querySelectorAll('.content-area');
        contentAreas.forEach(area => area.classList.remove('active'));

        const targetContent = document.getElementById('content-' + subject);
        targetContent.classList.add('active');

        previousContent = targetContent; // Simpan konten aktif
    }

    function showMainMenu() {
        document.getElementById('main-menu').style.display = 'grid';

        const contentAreas = document.querySelectorAll('.content-area');
        contentAreas.forEach(area => area.classList.remove('active'));

        previousContent = null;
    }

    function showDetail(topic) {
        const detailContent = getDetailContent(topic);
        document.getElementById('detail-body').innerHTML = detailContent;

        const contentAreas = document.querySelectorAll('.content-area');
        contentAreas.forEach(area => area.classList.remove('active'));

        document.getElementById('detail-content').classList.add('active');
    }

    function hideDetail() {
        document.getElementById('detail-content').classList.remove('active');

        if (previousContent) {
            previousContent.classList.add('active');
        } else {
            document.getElementById('main-menu').style.display = 'grid';
        }
    }   

        function getDetailContent(topic) {
            const contents = {
                'persamaan-linear': `
                    <h2>Persamaan Linear</h2>
                    <div class="detail-content">
                        <p>Persamaan linear adalah persamaan yang variabelnya berpangkat satu.</p>
                        
                        <h4>Bentuk Umum:</h4>
                        <div class="formula">ax + b = 0</div>
                        <p>dimana a ≠ 0</p>
                        
                        <h4>Cara Penyelesaian:</h4>
                        <p>1. Kumpulkan suku yang mengandung variabel di satu ruas</p>
                        <p>2. Kumpulkan konstanta di ruas yang lain</p>
                        <p>3. Bagi kedua ruas dengan koefisien variabel</p>
                        
                        <div class="example">
                            <h5>Contoh:</h5>
                            <p>Selesaikan: 3x + 5 = 14</p>
                            <p>3x = 14 - 5</p>
                            <p>3x = 9</p>
                            <p>x = 3</p>
                        </div>
                    </div>
                `,
                'persamaan-kuadrat': `
                    <h2>Persamaan Kuadrat</h2>
                    <div class="detail-content">
                        <p>Persamaan kuadrat adalah persamaan yang variabelnya berpangkat tertinggi dua.</p>
                        
                        <h4>Bentuk Umum:</h4>
                        <div class="formula">ax² + bx + c = 0</div>
                        <p>dimana a ≠ 0</p>
                        
                        <h4>Rumus ABC:</h4>
                        <div class="formula">x = (-b ± √(b² - 4ac)) / 2a</div>
                        
                        <h4>Diskriminan:</h4>
                        <div class="formula">D = b² - 4ac</div>
                        <p>• D > 0: dua akar real berbeda</p>
                        <p>• D = 0: dua akar real sama</p>
                        <p>• D < 0: tidak ada akar real</p>
                        
                        <div class="example">
                            <h5>Contoh:</h5>
                            <p>Selesaikan: x² - 5x + 6 = 0</p>
                            <p>a = 1, b = -5, c = 6</p>
                            <p>D = (-5)² - 4(1)(6) = 25 - 24 = 1</p>
                            <p>x = (5 ± 1) / 2</p>
                            <p>x₁ = 3, x₂ = 2</p>
                        </div>
                    </div>
                `,
                'bangun-datar': `
                    <h2>Bangun Datar</h2>
                    <div class="detail-content">
                        <h4>1. Persegi</h4>
                        <p>Luas = s²</p>
                        <p>Keliling = 4s</p>
                        
                        <h4>2. Persegi Panjang</h4>
                        <p>Luas = p × l</p>
                        <p>Keliling = 2(p + l)</p>
                        
                        <h4>3. Segitiga</h4>
                        <p>Luas = ½ × alas × tinggi</p>
                        <p>Keliling = sisi₁ + sisi₂ + sisi₃</p>
                        
                        <h4>4. Lingkaran</h4>
                        <div class="formula">Luas = πr²</div>
                        <div class="formula">Keliling = 2πr</div>
                        
                        <div class="example">
                            <h5>Contoh:</h5>
                            <p>Hitung luas lingkaran dengan jari-jari 7 cm</p>
                            <p>Luas = π × 7² = π × 49 = 49π cm²</p>
                            <p>≈ 153,94 cm²</p>
                        </div>
                    </div>
                `
            };
            
            return contents[topic] || '<h2>Konten sedang dikembangkan...</h2>';
        }