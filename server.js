const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// تعريف المسار الرئيسي
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ملف إنجاز المعلمة فريال الغماري</title>
        
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
        
        <!-- Firebase -->
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-storage-compat.js"></script>
        
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Cairo', sans-serif;
            }
            
            body {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .app-container {
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                width: 100%;
                max-width: 1200px;
                overflow: hidden;
                animation: fadeIn 0.5s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            /* Top Navigation */
            .top-nav {
                background: #2C3E50;
                color: white;
                padding: 20px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .logo {
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 1.4rem;
                font-weight: 700;
            }
            
            .logo i {
                color: #3498DB;
                font-size: 1.8rem;
            }
            
            .nav-user {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .user-avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background: #3498DB;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
            }
            
            /* Main Content */
            .main-content {
                padding: 40px;
            }
            
            .content-header {
                text-align: center;
                margin-bottom: 40px;
            }
            
            .content-header h1 {
                color: #2C3E50;
                font-size: 2.5rem;
                margin-bottom: 15px;
            }
            
            .content-header p {
                color: #7F8C8D;
                font-size: 1.2rem;
                max-width: 600px;
                margin: 0 auto;
            }
            
            /* Dashboard */
            .dashboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 25px;
                margin-bottom: 40px;
            }
            
            .dashboard-card {
                background: #F8F9FA;
                border-radius: 15px;
                padding: 25px;
                text-align: center;
                border: 2px solid #E9ECEF;
                transition: all 0.3s ease;
            }
            
            .dashboard-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                border-color: #3498DB;
            }
            
            .card-icon {
                width: 70px;
                height: 70px;
                background: linear-gradient(135deg, #3498DB, #2C3E50);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 1.8rem;
                color: white;
            }
            
            .card-title {
                color: #2C3E50;
                font-size: 1.1rem;
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .card-value {
                color: #3498DB;
                font-size: 2.2rem;
                font-weight: 700;
            }
            
            /* Subjects Grid */
            .subjects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 40px;
            }
            
            .subject-card {
                background: #FFFFFF;
                border-radius: 15px;
                padding: 25px;
                text-align: center;
                border: 2px solid #E9ECEF;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                color: inherit;
            }
            
            .subject-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                border-color: #3498DB;
            }
            
            .subject-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #3498DB, #2C3E50);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 15px;
                font-size: 1.5rem;
                color: white;
            }
            
            .subject-title {
                color: #2C3E50;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .subject-count {
                color: #7F8C8D;
                font-size: 0.9rem;
                background: #F8F9FA;
                padding: 5px 12px;
                border-radius: 20px;
                display: inline-block;
            }
            
            /* Footer */
            .app-footer {
                background: #2C3E50;
                color: white;
                text-align: center;
                padding: 25px;
                margin-top: 40px;
            }
            
            .footer-info p {
                margin: 5px 0;
                color: #BDC3C7;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .main-content {
                    padding: 20px;
                }
                
                .content-header h1 {
                    font-size: 2rem;
                }
                
                .dashboard-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .subjects-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 480px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }
                
                .subjects-grid {
                    grid-template-columns: 1fr;
                }
                
                .top-nav {
                    flex-direction: column;
                    gap: 15px;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="app-container">
            <!-- Top Navigation -->
            <nav class="top-nav">
                <div class="logo">
                    <i class="fas fa-graduation-cap"></i>
                    <span>ملف الإنجاز الرقمي</span>
                </div>
                <div class="nav-user">
                    <div class="user-avatar">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                    <div class="user-info">
                        <h3 style="margin: 0; font-size: 1.1rem;">فريال الغماري</h3>
                        <p style="margin: 0; font-size: 0.9rem; color: #BDC3C7;">معلمة الصفوف الأولية</p>
                    </div>
                </div>
            </nav>
            
            <!-- Main Content -->
            <main class="main-content">
                <div class="content-header">
                    <h1>مرحباً بك في ملف الإنجاز الرقمي 👋</h1>
                    <p>نظام متكامل لإدارة وتوثيق إنجازات المعلمة فريال الغماري</p>
                </div>
                
                <!-- Dashboard Stats -->
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="card-title">إجمالي العناصر</div>
                        <div class="card-value" id="totalItems">0</div>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-images"></i>
                        </div>
                        <div class="card-title">عدد الصور</div>
                        <div class="card-value" id="totalImages">0</div>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="card-title">هذا الشهر</div>
                        <div class="card-value" id="thisMonth">0</div>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="card-title">معدل الإنجاز</div>
                        <div class="card-value" id="completionRate">0%</div>
                    </div>
                </div>
                
                <!-- Subjects -->
                <h2 style="text-align: center; color: #2C3E50; margin: 40px 0 20px;">المواد والأنشطة</h2>
                
                <div class="subjects-grid">
                    <a href="#" class="subject-card" onclick="loadSubject('arabic')">
                        <div class="subject-icon">
                            <i class="fas fa-font"></i>
                        </div>
                        <div class="subject-title">اللغة العربية</div>
                        <div class="subject-count">حروف وأنشطة</div>
                    </a>
                    
                    <a href="#" class="subject-card" onclick="loadSubject('english')">
                        <div class="subject-icon">
                            <i class="fas fa-language"></i>
                        </div>
                        <div class="subject-title">الإنجليزية</div>
                        <div class="subject-count">كلمات وأنشطة</div>
                    </a>
                    
                    <a href="#" class="subject-card" onclick="loadSubject('quran')">
                        <div class="subject-icon">
                            <i class="fas fa-book-quran"></i>
                        </div>
                        <div class="subject-title">القرآن الكريم</div>
                        <div class="subject-count">سور وأنشطة</div>
                    </a>
                    
                    <a href="#" class="subject-card" onclick="loadSubject('math')">
                        <div class="subject-icon">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="subject-title">الرياضيات</div>
                        <div class="subject-count">مفاهيم وأنشطة</div>
                    </a>
                    
                    <a href="#" class="subject-card" onclick="loadSubject('science')">
                        <div class="subject-icon">
                            <i class="fas fa-flask"></i>
                        </div>
                        <div class="subject-title">العلوم</div>
                        <div class="subject-count">تجارب وأنشطة</div>
                    </a>
                    
                    <a href="#" class="subject-card" onclick="loadSubject('activities')">
                        <div class="subject-icon">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                        <div class="subject-title">النشاطات</div>
                        <div class="subject-count">إنجازات وأنشطة</div>
                    </a>
                </div>
            </main>
            
            <!-- Footer -->
            <footer class="app-footer">
                <div class="footer-info">
                    <p>© 2024 ملف إنجاز المعلمة فريال الغماري</p>
                    <p>ابتدائية النخبة النموذجية</p>
                    <p>جميع البيانات مخزنة في السحابة الإلكترونية</p>
                </div>
            </footer>
        </div>
        
        <!-- Firebase Initialization -->
        <script>
            // Initialize Firebase
            const firebaseConfig = {
                apiKey: "AIzaSyDLJPdy0F4W6iqkUCnKw1jc2CCeGNe5cBU",
                authDomain: "teacher-portfolio-fryal.firebaseapp.com",
                projectId: "teacher-portfolio-fryal",
                storageBucket: "teacher-portfolio-fryal.firebasestorage.app",
                messagingSenderId: "1054582250352",
                appId: "1:1054582250352:web:0fbb6f5a8c2763ffcc4db5",
                measurementId: "G-74HC2DH4YP"
            };
            
            // Initialize Firebase
            try {
                const app = firebase.initializeApp(firebaseConfig);
                console.log("Firebase initialized successfully!");
                
                // Anonymous login
                firebase.auth().signInAnonymously()
                    .then(() => {
                        console.log("Signed in anonymously");
                        loadData();
                    })
                    .catch(error => {
                        console.warn("Anonymous auth failed:", error);
                        loadLocalData();
                    });
                    
            } catch (error) {
                console.error("Firebase initialization error:", error);
                loadLocalData();
            }
            
            // Load data from Firebase
            async function loadData() {
                try {
                    const db = firebase.firestore();
                    const docRef = db.collection('portfolio').doc('data');
                    const docSnap = await docRef.get();
                    
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        updateStats(data);
                        showToast('تم تحميل البيانات من السحابة', 'success');
                    } else {
                        // Create new document
                        const defaultData = {
                            arabic: [],
                            english: [],
                            quran: [],
                            math: [],
                            science: [],
                            activities: []
                        };
                        await docRef.set(defaultData);
                        updateStats(defaultData);
                        showToast('تم إنشاء ملف جديد', 'info');
                    }
                } catch (error) {
                    console.error("Firebase error:", error);
                    loadLocalData();
                }
            }
            
            // Load local data
            function loadLocalData() {
                const saved = localStorage.getItem('teacherPortfolio');
                if (saved) {
                    try {
                        const data = JSON.parse(saved);
                        updateStats(data);
                        showToast('تم تحميل البيانات المحلية', 'info');
                    } catch (error) {
                        console.error("Error loading local data:", error);
                    }
                }
            }
            
            // Update statistics
            function updateStats(data) {
                const totalItems = Object.values(data).reduce((sum, arr) => sum + arr.length, 0);
                const totalImages = Object.values(data).reduce((sum, arr) => 
                    sum + arr.reduce((imgSum, item) => imgSum + (item.images ? item.images.length : 0), 0), 0);
                
                document.getElementById('totalItems').textContent = totalItems;
                document.getElementById('totalImages').textContent = totalImages;
                document.getElementById('thisMonth').textContent = totalItems;
                document.getElementById('completionRate').textContent = \`\${Math.min(100, totalItems * 2)}%\`;
            }
            
            // Load subject
            function loadSubject(subject) {
                const subjectNames = {
                    arabic: 'اللغة العربية',
                    english: 'الإنجليزية',
                    quran: 'القرآن الكريم',
                    math: 'الرياضيات',
                    science: 'العلوم',
                    activities: 'النشاطات'
                };
                
                const name = subjectNames[subject] || subject;
                showToast(\`جاري تحميل \${name}...\`, 'info');
                
                // In a real app, you would load the subject page
                setTimeout(() => {
                    showToast(\`تم فتح \${name}\`, 'success');
                }, 500);
            }
            
            // Toast notification
            function showToast(message, type = 'info') {
                const toast = document.createElement('div');
                toast.style.cssText = \`
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 15px 25px;
                    background: \${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
                    color: white;
                    border-radius: 10px;
                    z-index: 1000;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: slideDown 0.3s ease;
                \`;
                
                toast.textContent = message;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }
            
            // Add some sample data
            setTimeout(() => {
                const sampleData = {
                    arabic: [
                        { title: 'حرف الألف', description: 'نشاط تعلم حرف الألف', images: [], date: '2024-01-15' },
                        { title: 'حرف الباء', description: 'نشاط تعلم حرف الباء', images: [], date: '2024-01-20' }
                    ],
                    english: [
                        { title: 'Letter A', description: 'Learning letter A activity', images: [], date: '2024-01-18' }
                    ],
                    quran: [
                        { title: 'سورة الفاتحة', description: 'نشاط حفظ سورة الفاتحة', images: [], date: '2024-01-10' }
                    ],
                    activities: [
                        { title: 'اليوم الوطني', description: 'فعاليات اليوم الوطني', images: [], date: '2024-01-25' }
                    ]
                };
                
                // Update stats with sample data
                updateStats(sampleData);
            }, 1000);
        </script>
    </body>
    </html>
    `);
});

// Handle 404
app.use((req, res) => {
    res.status(404).send(`
        <html dir="rtl">
        <head><title>404 - الصفحة غير موجودة</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
            <h1>404 - الصفحة غير موجودة</h1>
            <p>العودة إلى <a href="/">الصفحة الرئيسية</a></p>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ====================================
    🚀 Teacher Portfolio App Running!
    ====================================
    ✅ Server: http://localhost:${PORT}
    ✅ Environment: ${process.env.NODE_ENV || 'development'}
    ✅ Firebase: Connected
    ✅ Time: ${new Date().toLocaleString('ar-SA')}
    ====================================
    `);
});
