#!/usr/bin/env python3
"""
Script để tạo thumbnails cho tất cả hình ảnh trong website
Giảm kích thước file để tăng tốc độ load trang
"""

from PIL import Image
import os
from pathlib import Path

# Cấu hình kích thước thumbnails cho từng loại
THUMBNAIL_CONFIGS = {
    'pic_hero': {
        'width': 1200,  # Hero slider cần độ phân giải cao hơn
        'quality': 85,
        'output_dir': 'pic_hero/thumbs'
    },
    'gallery': {
        'width': 600,  # Gallery grid nhỏ hơn
        'quality': 80,
        'output_dir': 'gallery/thumbs'
    },
    'event': {
        'width': 800,  # Event cards trung bình
        'quality': 85,
        'output_dir': 'event/thumbs'
    },
    'pic_couple': {
        'width': 600,  # Couple photos trung bình
        'quality': 85,
        'output_dir': 'pic_couple/thumbs'
    }
}

def create_thumbnail(input_path, output_path, max_width, quality):
    """
    Tạo thumbnail từ hình gốc
    
    Args:
        input_path: Đường dẫn hình gốc
        output_path: Đường dẫn lưu thumbnail
        max_width: Chiều rộng tối đa
        quality: Chất lượng JPEG (0-100)
    """
    try:
        with Image.open(input_path) as img:
            # Chuyển sang RGB nếu cần (cho PNG, RGBA, etc.)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Tính toán kích thước mới giữ nguyên tỷ lệ
            width, height = img.size
            if width > max_width:
                new_width = max_width
                new_height = int((max_width / width) * height)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Lưu thumbnail
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Tính toán kích thước file
            original_size = os.path.getsize(input_path) / 1024 / 1024  # MB
            new_size = os.path.getsize(output_path) / 1024 / 1024  # MB
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"✓ {os.path.basename(input_path)}: {original_size:.2f}MB → {new_size:.2f}MB (-{reduction:.1f}%)")
            
    except Exception as e:
        print(f"✗ Lỗi khi xử lý {input_path}: {e}")

def process_directory(source_dir, config):
    """
    Xử lý tất cả hình trong một thư mục
    
    Args:
        source_dir: Thư mục chứa hình gốc
        config: Cấu hình thumbnail
    """
    source_path = Path(source_dir)
    output_path = Path(config['output_dir'])
    
    # Tạo thư mục output nếu chưa có
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Lấy danh sách file hình
    image_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
    image_files = [f for f in source_path.iterdir() 
                   if f.is_file() and f.suffix in image_extensions]
    
    if not image_files:
        print(f"⚠ Không tìm thấy hình trong {source_dir}")
        return
    
    print(f"\n📁 Xử lý {source_dir} ({len(image_files)} hình):")
    print(f"   Kích thước: {config['width']}px, Chất lượng: {config['quality']}%")
    print("-" * 60)
    
    total_original = 0
    total_new = 0
    
    for img_file in sorted(image_files):
        output_file = output_path / f"{img_file.stem}.jpg"
        create_thumbnail(
            str(img_file),
            str(output_file),
            config['width'],
            config['quality']
        )
        
        total_original += os.path.getsize(img_file) / 1024 / 1024
        if output_file.exists():
            total_new += os.path.getsize(output_file) / 1024 / 1024
    
    reduction = ((total_original - total_new) / total_original) * 100
    print(f"\n📊 Tổng kết: {total_original:.2f}MB → {total_new:.2f}MB (-{reduction:.1f}%)")

def main():
    """Hàm chính"""
    print("=" * 60)
    print("🖼️  THUMBNAIL GENERATOR - Wedding Website")
    print("=" * 60)
    
    # Kiểm tra thư viện PIL
    try:
        from PIL import Image
    except ImportError:
        print("\n❌ Lỗi: Chưa cài đặt thư viện Pillow")
        print("Chạy lệnh: pip install Pillow")
        return
    
    # Xử lý từng thư mục
    for dir_name, config in THUMBNAIL_CONFIGS.items():
        if os.path.exists(dir_name):
            process_directory(dir_name, config)
        else:
            print(f"\n⚠ Bỏ qua {dir_name} (không tồn tại)")
    
    print("\n" + "=" * 60)
    print("✅ HOÀN TẤT! Thumbnails đã được tạo.")
    print("=" * 60)
    print("\n📝 Bước tiếp theo:")
    print("   1. Kiểm tra thư mục thumbs trong mỗi folder")
    print("   2. Cập nhật HTML để sử dụng thumbnails")
    print("   3. Implement lazy loading JavaScript")

if __name__ == "__main__":
    main()
