import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const db = window.db;

document.getElementById('guestbook-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value || '익명';
  const message = document.getElementById('message').value;
  const isSecret = document.getElementById('isSecret').checked;
  const password = document.getElementById('password').value;

  await addDoc(collection(db, 'guestbook'), {
    name,
    message,
    isSecret,
    password, // 개발용 평문 저장 (추후 암호화 가능)
    timestamp: new Date()
  });

  document.getElementById('guestbook-form').reset();
  document.getElementById('guestbook-confirmation').style.display = 'block';

  loadGuestbook();
});

async function loadGuestbook() {
  const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);

  const listEl = document.getElementById('guestbook-list');
  listEl.innerHTML = '';

  querySnapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.marginBottom = '10px';
    div.style.borderRadius = '5px';
    div.style.backgroundColor = '#fffdf2';
    div.style.textAlign = 'left';

    if (data.isSecret) {
      div.innerHTML = `<strong>${data.name}</strong> - 비밀글입니다.`;
    } else {
      div.innerHTML = `<strong>${data.name}</strong><br>${data.message}`;
    }

    listEl.appendChild(div);
  });
}

loadGuestbook();
