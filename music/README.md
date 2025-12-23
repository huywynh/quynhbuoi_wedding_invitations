# 🎵 Hướng Dẫn Trình Phát Nhạc

## Cách Thêm Nhạc Vào Website Thiệp Cưới

### Bắt Đầu Nhanh

1. **Thêm các file .mp3** vào thư mục `/music` này
2. **Chạy script tự động** để cập nhật danh sách phát:
   ```bash
   node generate-music-manifest.js
   ```
3. **Tải lại website** - nhạc sẽ tự động phát!

---

## Hướng Dẫn Chi Tiết

### Phương pháp 1: Tự động (Khuyên dùng)

1. Sao chép các file .mp3 của bạn vào thư mục `/music` này
2. Mở terminal/command prompt tại thư mục gốc của dự án
3. Chạy lệnh:
   ```bash
   node generate-music-manifest.js
   ```
4. Script sẽ tự động quét thư mục `/music` và tạo/cập nhật file `manifest.json`

### Phương pháp 2: Thủ công

Nếu bạn không muốn dùng script, bạn có thể tự chỉnh sửa file `manifest.json`:

```json
[
  "bai-hat-1.mp3",
  "bai-hat-2.mp3",
  "bai-hat-yeu-thich.mp3"
]
```

Chỉ cần liệt kê tất cả tên file .mp3 trong mảng.

---

## Mẹo Đặt Tên File

- Dùng tên file đơn giản, không dùng ký tự đặc biệt
- Ví dụ: `bai-hat-1.mp3`, `nhac-cuoi.mp3`, `nhac-lang-man.mp3`
- Nhạc sẽ phát theo thứ tự trong file manifest.json

---

## Cách Trình Phát Nhạc Hoạt Động

1. Khi khách truy cập website, trình phát nhạc sẽ khởi tạo
2. Nhạc bắt đầu phát tự động sau khi người dùng có tương tác đầu tiên (click, cuộn trang, hoặc di chuyển chuột)
3. Danh sách phát chạy liên tục, tự động chuyển sang bài tiếp theo khi bài hiện tại kết thúc
4. Khách có thể tạm dừng/phát nhạc bằng nút 🎵 ở góc màn hình
5. Nếu một bài hát không tải được, hệ thống tự động bỏ qua và phát bài tiếp theo

---

## Khắc Phục Sự Cố

**Nhạc không phát?**
- Kiểm tra các file .mp3 có thực sự trong thư mục `/music` không
- Đảm bảo file `manifest.json` tồn tại và liệt kê đúng tên các file
- Chạy lệnh `node generate-music-manifest.js` để tạo lại manifest
- Mở console của trình duyệt (phím F12) để xem log chi tiết

**Muốn thay đổi thứ tự phát?**
- Chỉnh sửa file `manifest.json` và sắp xếp lại thứ tự tên file
- Hoặc đổi tên các file và chạy lại script để tạo manifest mới

---

## Chính Sách Tự Động Phát Của Trình Duyệt

Các trình duyệt hiện đại chặn tự động phát nhạc cho đến khi có tương tác của người dùng. Vì vậy:
- Nhạc sẽ bắt đầu sau lần click/cuộn/di chuyển chuột đầu tiên
- Nút 🎵 giúp người dùng điều khiển việc phát nhạc
- Đây là hành vi bình thường của trình duyệt để có trải nghiệm người dùng tốt hơn
