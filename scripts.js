document.addEventListener('DOMContentLoaded', function() {
    // 漢堡選單功能
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', function() {
        // 切換導航欄顯示
        nav.classList.toggle('nav-active');
        
        // 動畫導航連結
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // 漢堡選單動畫
        burger.classList.toggle('toggle');
    });
    
    // 滾動效果 - 導航欄背景
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
    
    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 如果在手機視圖中，點擊後關閉導航選單
                if (burger.classList.contains('toggle')) {
                    burger.click();
                }
            }
        });
    });
    
    // 顧客見證輪播
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    // 如果有顧客見證區塊才執行
    if (testimonials.length > 0) {
        // 初始化：只顯示第一個見證
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // 自動輪播功能
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
            testimonials[currentTestimonial].style.animation = 'fadeIn 1s';
        }, 5000); // 每5秒切換一次
    }
    
    // 淡入效果
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // 初始檢查
    checkFade();
    
    // 滾動時檢查
    window.addEventListener('scroll', checkFade);
});

// 頁面加載動畫
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 添加 Google Maps API 互動功能
function initMap() {
    // 此函數將在 Google Maps API 加載完成後被調用
    if (document.getElementById('map')) {
        const location = {lat: 24.805066, lng: 120.967936}; // 新竹市東區民權路24巷11號
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "weight": "2.00"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#9c9c9c"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f9f2f5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f5a5c7"
                        },
                        {
                            "lightness": 80
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#db7093"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 60
                        }
                    ]
                }
            ]
        });
        
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Mikami Studio 女性專屬私密美肌進化中心'
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info">
                    <h3>Mikami Studio</h3>
                    <p>女性專屬私密美肌進化中心</p>
                    <p>新竹市東區民權路24巷11號</p>
                    <p>電話：02-2345-6789</p>
                </div>
            `
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
} 