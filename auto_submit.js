const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Navigate to the lesson page
  await page.goto('https://trangden.vn/agentsee/lop-hoc/khoa-hoc/2/tuan/1/bai/2', { waitUntil: 'networkidle0' });

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Inject and run the fill script
  const scriptContent = `
(async function() {
  const answer21 = 'Yêu cầu bài số 1 là ra lệnh cho coding agent tạo một trang web profile card đẹp bằng HTML, CSS, hiển thị thông tin cá nhân và verification code.';
  const answer22 = 'Agent đã sử dụng các công nghệ sau để hoàn thành nhiệm vụ:\\n1. HTML và CSS để tạo giao diện thẻ profile (profile card).\\n2. Một công cụ tự động chụp màn hình để render và chụp lại trang web.\\n3. Curl để upload ảnh screenshot lên endpoint.\\n4. GitHub để quản lý mã nguồn và commit.';

  const url = window.location.pathname;
  const candidates = new Set();
  const matchBai = url.match(/bai\\/(\\d+)/i);
  if (matchBai) candidates.add(Number(matchBai[1]));
  const matchQuest = url.match(/quest\\/(\\d+)/i);
  if (matchQuest) candidates.add(Number(matchQuest[1]));
  const text = document.body.innerText;
  const textQuest = text.match(/quest_id\\D*(\\d+)/i) || text.match(/quest\\s*id\\D*(\\d+)/i);
  if (textQuest) candidates.add(Number(textQuest[1]));
  [1,2,3,4,5].forEach(n => candidates.add(n));

  const candidateQuestIds = Array.from(candidates).filter(n => !isNaN(n) && n > 0).slice(0, 6);
  console.log('Đã thu thập candidate quest_id:', candidateQuestIds);

  const tokenKeys = Object.keys(localStorage).filter(k => /token|auth|jwt|bearer|access/i.test(k));
  const tokens = tokenKeys.map(k => ({key:k, value: localStorage.getItem(k)}));
  console.log('Các key token khả dĩ trong localStorage:', tokens);

  const possibleToken = tokens.find(t => t.value && t.value.length > 10);
  const authHeader = possibleToken ? 'Bearer ' + possibleToken.value : null;
  if (!possibleToken) {
    console.warn('Không tìm thấy token rõ ràng trong localStorage; request sẽ thử dùng cookie nếu có.');
  }

  const answerString = answer21 + '\\n\\n' + answer22;
  const payloads = [
    {quest_id: null, answer: answerString},
    {quest_id: null, answer: {field_0: answer21, field_1: answer22}},
    {quest_id: null, answer: {answer_text: answerString}},
    {quest_id: null, answer: [answer21, answer22]}
  ];

  async function trySubmit(questId) {
    const baseUrl = '/agentsee/api/quest-answer';
    for (let i = 0; i < payloads.length; i++) {
      const payload = JSON.parse(JSON.stringify(payloads[i]));
      payload.quest_id = questId;
      const url = baseUrl;
      const headers = { 'Content-Type': 'application/json' };
      if (authHeader) headers.Authorization = authHeader;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
          credentials: 'include'
        });
        const body = await res.text();
        console.log('POST', url, 'payload', payload, 'status', res.status, 'response', body);
        if (res.ok) {
          console.log('Submit thành công với quest_id', questId, 'payload', payload);
          return true;
        }
      } catch (e) {
        console.error('Lỗi gửi request với quest_id', questId, 'payload', payload, e);
      }
    }
    return false;
  }

  let success = false;
  for (const q of candidateQuestIds) {
    if (await trySubmit(q)) {
      success = true;
      break;
    }
  }

  if (!success) {
    console.warn('Không submit được. Hãy kiểm tra token trong localStorage và quest_id chính xác, rồi thử lại.');
  }
})();
  `;

  await page.evaluate(scriptContent);

  // Wait a bit for submission
  await page.waitForTimeout(5000);

  // Close browser
  await browser.close();
})();