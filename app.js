const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2800);
}

menuButton?.addEventListener("click", function () {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menu?.classList.toggle("is-open", !open);
});

menu?.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menuButton?.setAttribute("aria-expanded", "false");
    menu?.classList.remove("is-open");
  });
});

window.addEventListener("scroll", function () { header?.classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });
document.querySelectorAll("[data-year]").forEach(function (node) { node.textContent = String(new Date().getFullYear()); });

const reveals = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  reveals.forEach(function (node) { observer.observe(node); });
} else {
  reveals.forEach(function (node) { node.classList.add("is-visible"); });
}

document.querySelectorAll("[data-tabs]").forEach(function (group) {
  group.querySelectorAll("[data-tab]").forEach(function (button) {
    button.addEventListener("click", function () {
      const target = button.dataset.tab;
      group.querySelectorAll("[data-tab]").forEach(function (item) { item.classList.toggle("is-active", item === button); });
      document.querySelectorAll("[data-tab-panel]").forEach(function (panel) { panel.classList.toggle("is-active", panel.dataset.tabPanel === target); });
    });
  });
});

document.querySelectorAll("form[data-prototype-form]").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    showToast("Prototype interaction입니다. 입력 정보는 저장되거나 전송되지 않습니다.");
  });
});

document.addEventListener("click", function (event) {
  const mock = event.target.closest("[data-mock-action]");
  if (mock) showToast(mock.dataset.mockAction || "현재는 prototype interaction입니다.");
});

const services=[{"name":"WWW","domain":"www.hbkr.net","type":"Public Landing","scope":"AI/AX narrative + service gateway"},{"name":"WORK","domain":"work.hbkr.net","type":"Marketplace Prototype","scope":"Talent · Project · Match"},{"name":"OPS","domain":"ops.hbkr.net","type":"System Prototype","scope":"Discovery · Scope · Delivery"},{"name":"CAFE","domain":"cafe.hbkr.net","type":"Community Prototype","scope":"Community · Vertical · Evidence"},{"name":"LEARN","domain":"learn.hbkr.net","type":"Learning Prototype","scope":"Foundation · Applied · Builder"},{"name":"LAB","domain":"lab.hbkr.net","type":"Lab Prototype","scope":"Experiment · Field Test · Evidence"},{"name":"ID","domain":"id.hbkr.net","type":"Identity Prototype","scope":"Member · Role · Visibility"},{"name":"API","domain":"api.hbkr.net","type":"Contract Prototype","scope":"Taxonomy · Schema · Match"},{"name":"STATUS","domain":"status.hbkr.net","type":"Static Status","scope":"Public endpoint reachability"}];const grid=document.getElementById("statusGrid");
function renderStatus(){grid.innerHTML=services.map(function(service){return '<article class="status-card" data-status-domain="'+service.domain+'"><header><span class="tag">'+service.type+'</span><span class="status-dot"></span></header><h3>'+service.name+'</h3><p>'+service.domain+'</p><p style="margin-top:8px">'+service.scope+'</p><a href="https://'+service.domain+'/">OPEN SERVICE ↗</a></article>';}).join("");}
async function checkStatus(){document.getElementById("statusTime").textContent="CHECKING";let up=0;await Promise.all(services.map(async function(service){const card=document.querySelector('[data-status-domain="'+service.domain+'"]');const dot=card.querySelector(".status-dot");try{await fetch("https://"+service.domain+"/?status="+Date.now(),{mode:"no-cors",cache:"no-store"});dot.classList.add("is-up");dot.classList.remove("is-down");up+=1;}catch(error){dot.classList.add("is-down");dot.classList.remove("is-up");}}));document.getElementById("upCount").textContent=String(up);document.getElementById("statusTime").textContent=new Intl.DateTimeFormat("ko-KR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date());}
document.getElementById("refreshStatus").addEventListener("click",checkStatus);renderStatus();checkStatus();
