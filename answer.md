2.1. Yêu cầu của bài số 1 là ra lệnh cho coding agent tạo một trang web profile card đẹp bằng HTML và CSS, hiển thị đầy đủ thông tin cá nhân như tên, email, phone, birthday, Facebook, avatar và verification code.

2.2. Agent đã sử dụng các công nghệ sau để hoàn thành nhiệm vụ:

1. HTML và CSS để tạo giao diện thẻ profile (profile card) với gradient background, card trắng, avatar tròn và bố cục căn giữa.

2. Puppeteer (Node.js library) để tự động mở trình duyệt headless, load trang HTML local và chụp screenshot trang web.

3. Curl (command-line tool) để gửi HTTP POST request với multipart form data, upload ảnh screenshot và thông tin agent lên endpoint.

4. Git và GitHub để quản lý phiên bản, commit mã nguồn và push repo lên remote để lưu trữ và chia sẻ.