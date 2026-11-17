# Hướng dẫn Deploy MindPhoenix lên Railway với PostgreSQL

Dự án đã được kiến trúc hoá theo **Clean Architecture** và hỗ trợ **PostgreSQL (Production trên Railway)** kết hợp **SQLite (Fallback cho Local Development)**.

---

## 🚀 Các bước Deploy lên Railway

### Bước 1: Khởi tạo Project trên Railway
1. Truy cập [Railway.app](https://railway.app/) và đăng nhập.
2. Bấm **New Project** -> chọn **Deploy from GitHub repo** (chọn repository của bạn).

---

### Bước 2: Thêm Database PostgreSQL (1-Click)
1. Trong Project Dashboard trên Railway, bấm nút **+ New** (ở góc trên phải hoặc phím tắt `Ctrl + K` / `Cmd + K`).
2. Chọn **Database** -> Chọn **Add PostgreSQL**.
3. Railway sẽ tự động tạo một instance PostgreSQL hoàn chỉnh kèm theo biến môi trường `DATABASE_URL`.

---

### Bước 3: Liên kết Backend với PostgreSQL
1. Bấm vào Service Backend Node.js của bạn trên Railway canvas.
2. Vào tab **Variables** -> Bấm **Add Reference**.
3. Chọn biến `DATABASE_URL` từ service PostgreSQL vừa tạo.
4. Thêm các biến môi trường sau:
   - `JWT_SECRET`: Chuỗi ký tự bảo mật (ví dụ: `mindphoenix-super-jwt-secret-2026`)
   - `NODE_ENV`: `production`

---

### Bước 4: Cấu hình Build & Start Command trên Railway

#### Cho Backend Service:
- **Root Directory**: `server`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (chạy `node dist/index.js`)

> 💡 **Tự động khởi tạo & Seed Database**: Khi chạy lần đầu, server sẽ tự động tạo toàn bộ schema (`users`, `orders`, `products`, `leaderboard`, `sales_reports`, `messages`, `app_settings`) và seed tài khoản Admin mặc định:
> - **Email**: `admin@mindphoenix.com`
> - **Password**: `password123`

#### Cho Frontend Service (Client):
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run preview -- --port $PORT --host 0.0.0.0`
- Hoặc cấu hình proxy / VITE API URL trỏ về domain của backend.

---

## 🛠️ Kiểm tra trạng thái Database

Backend cung cấp endpoint `/health`:
```bash
curl https://<your-backend-railway-domain>/health
```
Kết quả trả về:
```json
{
  "status": "ok",
  "server": "MindPhoenix Sales Dashboard Backend",
  "database": "postgresql",
  "timestamp": "2026-11-17T..."
}
```
Nếu `database` hiển thị `"postgresql"`, hệ thống đã kết nối thành công và đang hoạt động 100% trên PostgreSQL!
