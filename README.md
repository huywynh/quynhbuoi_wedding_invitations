# quynhbuoi_wedding_invitations
# Thiệp Cưới Online - Quỳnh & Hoa Bưởi

Website thiệp cưới đẹp và hiện đại với đầy đủ tính năng.

## 🎉 Tính năng

- ✨ Thiết kế đẹp với animation mượt mà
- ⏱️ Countdown đếm ngược đến ngày cưới
- 📍 Tích hợp Google Maps
- 📝 Form xác nhận tham dự
- 🖼️ Gallery hình ảnh
- 🎵 Nhạc nền (Beautiful in White)
- 📱 Responsive - tương thích mọi thiết bị

## 🚀 Cách sử dụng

### 1. Thay đổi thông tin cá nhân

Mở file `index.html` và chỉnh sửa:
- Tên chú rể và cô dâu
- Ngày giờ đám cưới
- Địa điểm
- Link Google Maps

### 2. Thêm hình ảnh của bạn

Thay thế các link ảnh placeholder trong `index.html`:
```html
<!-- Tìm các dòng có placeholder -->
<img src="https://via.placeholder.com/..." alt="...">

<!-- Thay bằng link ảnh thật -->
<img src="images/photo1.jpg" alt="...">
```

**Cách thêm ảnh:**
1. Tạo thư mục `images` trong project
2. Upload ảnh của bạn vào thư mục đó
3. Đổi tên ảnh thành: groom.jpg, bride.jpg, gallery1.jpg, etc.
4. Cập nhật đường dẫn trong HTML

### 3. Thêm nhạc nền "Beautiful in White"

Có 2 cách:

**Cách 1: Tải file nhạc về**
1. Tải file nhạc "Beautiful in White" (MP3)
2. Đặt vào thư mục project với tên `beautiful-in-white.mp3`
3. Sửa file `index.html`, dòng:
```html
<source src="beautiful-in-white.mp3" type="audio/mpeg">
```

**Cách 2: Dùng link nhạc online**
Tìm link nhạc từ các nguồn hợp pháp và thay vào:
```html
<source src="LINK_NHAC_CUA_BAN" type="audio/mpeg">
```

### 4. Cập nhật Google Maps

1. Mở Google Maps
2. Tìm địa điểm nhà hàng của bạn
3. Click "Share" → "Embed a map"
4. Copy link iframe
5. Thay vào phần `<iframe src="..."` trong file `index.html`

## 📤 Deploy lên Vercel

### Bước 1: Tạo GitHub Repository

```bash
# Khởi tạo git
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit - Wedding invitation"

# Tạo repository trên GitHub (github.com/new)
# Sau đó chạy:
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy trên Vercel

1. Truy cập https://vercel.com
2. Đăng nhập bằng tài khoản GitHub
3. Click "New Project"
4. Chọn repository vừa tạo
5. Click "Deploy"
6. Đợi 1-2 phút để deploy hoàn tất

### Bước 3: Kết nối tên miền riêng

**Trong Vercel:**
1. Vào project → Settings → Domains
2. Nhập tên miền của bạn (ví dụ: damcuoi-quynh-hoabuoi.com)
3. Click "Add"

**Trong nhà cung cấp tên miền (GoDaddy, Namecheap, etc.):**

**Cách 1: Thêm DNS Records**
1. Vào DNS Settings
2. Thêm các records:
   - Type: `A`, Name: `@`, Value: `76.76.19.19`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

**Cách 2: Đổi Nameservers (Đơn giản hơn)**
1. Vào Domain Settings
2. Đổi Nameservers thành:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

Đợi 24-48 giờ để DNS cập nhật. Vercel sẽ tự động cấp HTTPS cho tên miền của bạn.

## 📝 Tùy chỉnh thêm

### Đổi màu sắc
Mở file `styles.css` và tìm phần `:root`:
```css
:root {
    --primary-color: #D4AF37;  /* Màu vàng chính */
    --accent-color: #FFB6C1;   /* Màu hồng nhẹ */
    /* Thay đổi theo ý bạn */
}
```

### Chỉnh form gửi đến email/Google Sheets

Mở file `script.js`, tìm phần form handling và uncomment phần fetch API. Bạn cần:
1. Tạo Google Apps Script để nhận data
2. Hoặc dùng service như Formspree, EmailJS

## 🆘 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra Console (F12 → Console tab)
2. Đảm bảo tất cả file đã upload đúng
3. Kiểm tra đường dẫn ảnh và nhạc

## 📞 Liên hệ

Made with ❤️ by Quynh Phan

---

**Chúc bạn có một ngày cưới thật hạnh phúc! 💍💝**