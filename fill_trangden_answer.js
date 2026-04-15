// Usage: open the TrangDen lesson page in a browser, open DevTools console, and paste this script.
(function() {
  const answer21 = 'Yêu cầu bài số 1 là ra lệnh cho coding agent tạo một trang web profile card đẹp bằng HTML, CSS, hiển thị thông tin cá nhân và verification code.';
  const answer22 = 'Agent đã sử dụng các công nghệ sau để hoàn thành nhiệm vụ:\n1. HTML và CSS để tạo giao diện thẻ profile (profile card).\n2. Một công cụ tự động chụp màn hình để render và chụp lại trang web.\n3. Curl để upload ảnh screenshot lên endpoint.\n4. GitHub để quản lý mã nguồn và commit.';

  // Log all possible input elements
  const allInputs = Array.from(document.querySelectorAll('input, textarea, [contenteditable], div[role="textbox"], span[contenteditable], p[contenteditable]'));
  console.log('Tất cả elements có thể nhập:', allInputs.map(el => ({tag: el.tagName, id: el.id, class: el.className, contenteditable: el.contentEditable, role: el.getAttribute('role'), visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)})));

  const fields = allInputs.filter(el => el.offsetParent !== null || el.isContentEditable || el.getAttribute('role') === 'textbox');

  if (fields.length === 0) {
    console.warn('Không tìm thấy trường nhập. Hãy click vào câu hỏi cần điền trước, rồi chạy lại script.');
    return;
  }

  const values = [answer21, answer22];
  let filled = 0;

  for (let i = 0; i < Math.min(fields.length, values.length); i++) {
    const el = fields[i];
    const text = values[i];

    try {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (el.isContentEditable || el.getAttribute('contenteditable') === 'true') {
        el.focus();
        el.innerText = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      } else if (el.getAttribute('role') === 'textbox') {
        el.focus();
        el.innerText = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      filled++;
      console.log(`Điền vào ${el.tagName}#${el.id || 'no-id'}: ${text.slice(0, 50)}...`);
    } catch (e) {
      console.error(`Lỗi khi điền vào ${el.tagName}:`, e);
    }
  }

  console.log(`Đã điền ${filled} trường. Nếu trang có thêm câu hỏi, hãy click vào ô tiếp theo và chạy lại script.`);
})();
