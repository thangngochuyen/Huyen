# Huyen

This repository contains the profile card project for TrangDen.

## Automated answer filling

If TrangDen does not expose a visible answer submission form, use the browser console to inject answers:

1. Open the lesson page: https://trangden.vn/agentsee/lop-hoc/khoa-hoc/2/tuan/1/bai/2
2. Open DevTools Console in your browser.
3. Copy the contents of `fill_trangden_answer.js` and paste them into the console.
4. Press Enter to execute and fill the available input fields.

If the site uses hidden or contenteditable fields, click the question area first and run the script again.