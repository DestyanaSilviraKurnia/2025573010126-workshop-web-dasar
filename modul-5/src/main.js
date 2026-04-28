import "./style.css";

const btn = document.getElementById("toggleDark");
const html = document.documentElement;

// 1. Fungsi untuk mengatur tema
function setTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    btn.textContent = "Light"; // Ubah teks tombol
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    btn.textContent = "Dark"; // Ubah teks tombol
  }
}

// 2. Cek preferensi saat halaman dimuat (Init)
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
  setTheme("dark");
} else {
  setTheme("light");
}

// 3. Event Listener yang benar
btn.addEventListener("click", () => {
  if (html.classList.contains("dark")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});
