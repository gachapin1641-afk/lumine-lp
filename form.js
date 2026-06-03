/* ============================================================
  LUMINÉ インナーグロウ 購入フォーム
  - バリデーション
  - Googleスプレッドシート送信（GAS経由）
============================================================ */

// ▼▼▼ GASのデプロイURLをここに貼り付けてください ▼▼▼
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzzte0fNedT56S7SiEPDgHhKh71W75W3wc8LDSMEIFHnjW4IOhHtijGqCbwbWagw7556g/exec';
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('purchaseForm');
  const submitBtn = document.getElementById('submitBtn');

  /* ============================================================
    バリデーション関数
  ============================================================ */
  function validateName() {
    const val = document.getElementById('name').value.trim();
    const group = document.getElementById('group-name');
    if (!val) {
      group.classList.add('form__group--error');
      return false;
    }
    group.classList.remove('form__group--error');
    return true;
  }

  function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const group = document.getElementById('group-email');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val || !re.test(val)) {
      group.classList.add('form__group--error');
      return false;
    }
    group.classList.remove('form__group--error');
    return true;
  }

  function validateTel() {
    const val = document.getElementById('tel').value.trim();
    const group = document.getElementById('group-tel');
    const re = /^[\d\-\+\(\)\s]{10,15}$/;
    if (!val || !re.test(val)) {
      group.classList.add('form__group--error');
      return false;
    }
    group.classList.remove('form__group--error');
    return true;
  }

  function validateZip() {
    const val = document.getElementById('zip').value.trim();
    const group = document.getElementById('group-zip');
    const re = /^\d{3}-?\d{4}$/;
    if (!val || !re.test(val)) {
      group.classList.add('form__group--error');
      return false;
    }
    group.classList.remove('form__group--error');
    return true;
  }

  function validateAddress() {
    const val = document.getElementById('address').value.trim();
    const group = document.getElementById('group-address');
    if (!val) {
      group.classList.add('form__group--error');
      return false;
    }
    group.classList.remove('form__group--error');
    return true;
  }

  function validateCourse() {
    const selected = document.querySelector('input[name="course"]:checked');
    const group = document.getElementById('group-course');
    if (!selected) {
      group.classList.add('form__group--error');
      return false;
    }
    group.classList.remove('form__group--error');
    return true;
  }

  function validateAll() {
    const results = [
      validateName(),
      validateEmail(),
      validateTel(),
      validateZip(),
      validateAddress(),
      validateCourse()
    ];
    return results.every(Boolean);
  }

  /* ============================================================
    リアルタイムバリデーション（入力中）
  ============================================================ */
  document.getElementById('name').addEventListener('blur', validateName);
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('tel').addEventListener('blur', validateTel);
  document.getElementById('zip').addEventListener('blur', validateZip);
  document.getElementById('address').addEventListener('blur', validateAddress);

  document.querySelectorAll('input[name="course"]').forEach(function (radio) {
    radio.addEventListener('change', validateCourse);
  });

  /* ============================================================
    送信処理
  ============================================================ */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateAll()) {
      // 最初のエラー項目までスクロール
      const firstError = document.querySelector('.form__group--error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // ボタンを無効化
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    // 送信データ作成
    const data = {
      timestamp: new Date().toLocaleString('ja-JP'),
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      tel: document.getElementById('tel').value.trim(),
      zip: document.getElementById('zip').value.trim(),
      address: document.getElementById('address').value.trim(),
      course: document.querySelector('input[name="course"]:checked').value,
      note: document.getElementById('note').value.trim()
    };

    // GASへ送信
    fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function () {
      // サンキューページへ遷移
      window.location.href = 'thanks.html';
    })
    .catch(function (err) {
      console.error('送信エラー:', err);
      submitBtn.disabled = false;
      submitBtn.textContent = 'この内容で申し込む';
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    });
  });

});
