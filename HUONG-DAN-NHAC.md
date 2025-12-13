# 🎵 Hướng Dẫn Thêm Nhạc Nền

## Tóm Tắt Nhanh

Website của bạn đã được cấu hình để tự động phát nhạc từ thư mục `/music`. Hiện tại có **4 bài hát** sẵn sàng:

1. ✅ a_thousand_years.mp3
2. ✅ beautiful_in_white.mp3
3. ✅ my_love.mp3
4. ✅ only_love.mp3

---

## Cách Hoạt Động

### Khi Mở Website:
- Nhạc sẽ tự động phát sau khi khách truy cập **tương tác lần đầu** (click, scroll, hoặc di chuột)
- Điều này là yêu cầu bảo mật của trình duyệt hiện đại
- Nhạc sẽ phát liên tục theo playlist, tự động chuyển bài khi hết

### Điều Khiển:
- Nút 🎵 ở góc màn hình để tạm dừng/phát nhạc
- Nếu file nhạc nào không tải được, tự động chuyển bài tiếp theo

---

## Thêm Nhạc Mới

### Bước 1: Thêm File MP3
Copy các file .mp3 của bạn vào thư mục `/music`

### Bước 2: Cập Nhật Playlist
Chạy lệnh sau trong terminal (ở thư mục gốc của project):

```bash
python3 generate-music-manifest.py
```

Hoặc nếu bạn có Node.js:

```bash
node generate-music-manifest.js
```

### Bước 3: Reload Website
Mở lại website để nghe nhạc mới!

---

## Cập Nhật Thủ Công (Không Dùng Script)

Nếu không muốn chạy script, bạn có thể tự sửa file `music/manifest.json`:

```json
[
  "a_thousand_years.mp3",
  "beautiful_in_white.mp3",
  "my_love.mp3",
  "only_love.mp3",
  "bai-hat-moi.mp3"
]
```

Chỉ cần thêm tên file .mp3 mới vào danh sách.

---

## Thay Đổi Thứ Tự Phát

Để thay đổi thứ tự phát nhạc, chỉnh sửa thứ tự trong file `music/manifest.json`:

```json
[
  "my_love.mp3",          ← Phát đầu tiên
  "beautiful_in_white.mp3",
  "only_love.mp3",
  "a_thousand_years.mp3"   ← Phát cuối cùng
]
```

---

## Lưu Ý Kỹ Thuật

### Tại Sao Không Tự Động Phát Ngay?
Trình duyệt hiện đại (Chrome, Safari, Firefox) chặn autoplay để bảo vệ trải nghiệm người dùng. Nhạc chỉ phát được sau khi người dùng tương tác với trang web.

### Định Dạng File
- Chỉ hỗ trợ file .mp3
- Nên dùng tên file đơn giản, không dấu tiếng Việt
- Ví dụ tốt: `song1.mp3`, `romantic-music.mp3`
- Tránh: `Bài hát số 1.mp3`, `music (copy).mp3`

### Kiểm Tra Lỗi
Mở Console của trình duyệt (nhấn F12) để xem log chi tiết:
- ✅ Loaded playlist from manifest.json: 4 tracks
- 🎵 Playing track 1/4: music/a_thousand_years.mp3
- ⚠️ Playback failed: ... (nếu có lỗi)

---

## Giải Quyết Sự Cố

**Nhạc không phát?**
1. Kiểm tra file .mp3 có trong thư mục `/music`
2. Kiểm tra `manifest.json` có liệt kê đúng tên file
3. Chạy lại script: `python3 generate-music-manifest.py`
4. Xem console của trình duyệt (F12) để biết lỗi cụ thể

**Script báo lỗi?**
- Đảm bảo Python 3 đã được cài đặt: `python3 --version`
- Hoặc dùng Node.js: `node --version`
- Hoặc tự sửa `manifest.json` bằng tay

---

## Công Nghệ Sử Dụng

- **HTML5 Audio API**: Phát nhạc trong trình duyệt
- **Fetch API**: Tải playlist từ manifest.json
- **Autoplay Policy**: Tuân thủ quy định của trình duyệt
- **Auto-skip**: Tự động chuyển bài nếu lỗi

Chúc bạn có trải nghiệm tuyệt vời! 💝
