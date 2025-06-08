import { collection, getDocs, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const db = window.db;

const adminPassword = 'seulA'; // 슬아 고유 비번 여기에 설정!

// 비번 prompt 띄우고 검사
const userInput = prompt('관리자 비밀번호를 입력하세요:');
if (userInput !== adminPassword) {
  alert('비밀번호가 틀렸습니다. 접근이 차단됩니다.');
  window.location.href = 'index.html'; // 틀리면 메인으로 튕김
} else {
  loadAdminGuestbook(); // 맞으면 목록 로드
}

async function loadAdminGuestbook() {
  const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);

  const listEl = document.getElementById('admin-guestbook-list');
  listEl.innerHTML = '';

  querySnapshot.forEach(docSnapshot => {
    const data = docSnapshot.data();
    const div = document.createElement('div');
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.marginBottom = '10px';
    div.style.borderRadius = '5px';
    div.style.backgroundColor = '#fffdf2';
    div.style.textAlign = 'left';

    div.innerHTML = `
      <strong>${data.name}</strong> ${data.isSecret ? '(비밀글)' : ''}<br>
      ${data.message} <br>
      <button data-id="${docSnapshot.id}" class="delete-btn" style="margin-top:10px; background-color: #977b00; color: white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">삭제</button>
    `;

    listEl.appendChild(div);
  });

  // 삭제 버튼 이벤트 연결
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      const confirmed = confirm('정말로 삭제하시겠습니까?');
      if (confirmed) {
        await deleteDoc(doc(db, 'guestbook', id));
        alert('삭제되었습니다.');
        loadAdminGuestbook(); // 목록 새로고침
      }
    });
  });
}
