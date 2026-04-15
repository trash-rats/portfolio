(() => {
  const HASH = "2966d51f722d2a5445694255c8ebeafa1273deea20006b823234df88e822de28";
  const KEY = "site-unlocked";

  if (localStorage.getItem(KEY) === HASH) return;

  document.documentElement.classList.add("gate-locked");

  const style = document.createElement("style");
  style.textContent = `
    html.gate-locked body > *:not(.gate-overlay) { display: none !important; }
    .gate-overlay {
      position: fixed; inset: 0; z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      background: #0b0b0f; color: #f5f5f7;
      font-family: Inter, system-ui, -apple-system, sans-serif;
      padding: 24px;
    }
    .gate-card {
      width: 100%; max-width: 380px;
      background: #16161d; border: 1px solid #2a2a33;
      border-radius: 16px; padding: 32px 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .gate-card h1 {
      margin: 0 0 8px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;
    }
    .gate-card p {
      margin: 0 0 20px; font-size: 14px; color: #a1a1aa; line-height: 1.5;
    }
    .gate-card input {
      width: 100%; box-sizing: border-box;
      padding: 12px 14px; font-size: 15px;
      background: #0b0b0f; color: #f5f5f7;
      border: 1px solid #2a2a33; border-radius: 10px;
      outline: none; transition: border-color 0.15s;
    }
    .gate-card input:focus { border-color: #6366f1; }
    .gate-card button {
      width: 100%; margin-top: 12px;
      padding: 12px 14px; font-size: 15px; font-weight: 500;
      background: #f5f5f7; color: #0b0b0f;
      border: none; border-radius: 10px; cursor: pointer;
      transition: opacity 0.15s;
    }
    .gate-card button:hover { opacity: 0.9; }
    .gate-error {
      margin-top: 10px; font-size: 13px; color: #f87171; min-height: 18px;
    }
  `;
  document.head.appendChild(style);

  const mount = () => {
    const overlay = document.createElement("div");
    overlay.className = "gate-overlay";
    overlay.innerHTML = `
      <form class="gate-card" autocomplete="off">
        <h1>This site is password protected</h1>
        <p>Enter the password to view the portfolio.</p>
        <input type="password" name="pw" placeholder="Password" autofocus />
        <button type="submit">Unlock</button>
        <div class="gate-error" aria-live="polite"></div>
      </form>
    `;
    document.body.appendChild(overlay);

    const form = overlay.querySelector("form");
    const input = overlay.querySelector("input");
    const err = overlay.querySelector(".gate-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const value = input.value;
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
      const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
      if (hex === HASH) {
        localStorage.setItem(KEY, HASH);
        overlay.remove();
        document.documentElement.classList.remove("gate-locked");
      } else {
        err.textContent = "Incorrect password";
        input.select();
      }
    });
  };

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
