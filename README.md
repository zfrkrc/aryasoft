# Aryasoft - Kurumsal Web Sitesi

Modern, responsive ve profesyonel kurumsal web sitesi. Red9.com tarzında tasarlanmıştır.

## Özellikler

- 🎨 Modern ve profesyonel tasarım
- 📱 Tam responsive (mobil uyumlu)
- ⚡ Hızlı yükleme (nginx + gzip)
- 🔒 Güvenlik başlıkları
- 🐳 Docker Compose desteği
- 🎭 Smooth animasyonlar

## Hızlı Başlangıç

### Docker ile Çalıştırma

```bash
# Container'ı başlat
docker-compose up -d

# Logları izle
docker-compose logs -f

# Durdur
docker-compose down
```

Site http://localhost adresinde çalışacaktır.

### Manuel Çalıştırma

```bash
# Python ile basit server
python -m http.server 8080

# Node.js ile
npx serve .
```

## Proje Yapısı

```
aryasoft/
├── index.html          # Ana sayfa
├── css/
│   └── style.css       # Stil dosyası
├── js/
│   └── main.js         # JavaScript
├── assets/
│   ├── logos/          # Müşteri logoları
│   ├── tech/           # Teknoloji logoları
│   └── avatars/        # Avatar görselleri
├── Dockerfile          # Docker image
├── docker-compose.yml  # Docker Compose
├── nginx.conf          # Nginx yapılandırması
└── robots.txt          # SEO robots dosyası
```

## Bölümler

1. **Hero Section** - Ana başlık ve CTA
2. **Trust Logos** - Referans müşteriler
3. **Services** - Hizmetler (6 kart)
4. **Stats** - Performans istatistikleri
5. **Testimonials** - Müşteri yorumları
6. **Technologies** - Desteklenen teknolojiler
7. **Map Section** - Konum bilgisi
8. **Contact** - İletişim formu
9. **Footer** - Alt bilgi

## Teknolojiler

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- Nginx
- Docker

## İletişim

- **Telefon:** +90 850 885 27 92
- **E-posta:** hello@aryasoft.com.tr
- **Adres:** Oğuzlar Mahallesi 1385 Cadde No:6/2, ÇANKAYA/ANKARA

## Lisans

© 2026 Aryasoft. Tüm hakları saklıdır.
