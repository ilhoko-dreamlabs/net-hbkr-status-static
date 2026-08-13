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
if ("Intersection사용 행동 관찰r" in window) {
  const observer = new Intersection사용 행동 관찰r(function (entries) {
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
    showToast("화면 동작 예시입니다. 입력 정보는 저장되거나 전송되지 않습니다.");
  });
});

document.addEventListener("click", function (event) {
  const mock = event.target.closest("[data-mock-action]");
  if (mock) showToast(mock.dataset.mockAction || "현재는 prototype interaction입니다.");
});

const services=[{"name":"WWW","domain":"www.hbkr.net","type":"공개 소개 화면","scope":"AI/AX narrative + service gateway"},{"name":"WORK","domain":"work.hbkr.net","type":"인재·프로젝트 연결 화면","scope":"AI 실무자 · 프로젝트 · 추천 이유"},{"name":"OPS","domain":"ops.hbkr.net","type":"프로젝트 운영 화면","scope":"사전 진단 · 범위 · 수행"},{"name":"CAFE","domain":"cafe.hbkr.net","type":"커뮤니티 화면","scope":"커뮤니티 · 주제 모임 · 활동 기록"},{"name":"LEARN","domain":"learn.hbkr.net","type":"학습 화면","scope":"기초 실습 · 업무 적용 · 직접 만들기"},{"name":"LAB","domain":"lab.hbkr.net","type":"실험·검증 화면","scope":"실험 · 현장 검증 · 결과 기록"},{"name":"ID","domain":"id.hbkr.net","type":"회원·역할 화면","scope":"회원 · 역할 · 공개 범위"},{"name":"API","domain":"api.hbkr.net","type":"데이터 기준 화면","scope":"분류 기준 · 데이터 구조 · 추천 비교"},{"name":"STATUS","domain":"status.hbkr.net","type":"화면 접속 상태","scope":"공개 화면 접속 여부"}];const grid=document.getElementById("statusGrid");
function renderStatus(){grid.innerHTML=services.map(function(service){return '<article class="status-card" data-status-domain="'+service.domain+'"><header><span class="tag">'+service.type+'</span><span class="status-dot"></span></header><h3>'+service.name+'</h3><p>'+service.domain+'</p><p style="margin-top:8px">'+service.scope+'</p><a href="https://'+service.domain+'/">OPEN SERVICE ↗</a></article>';}).join("");}
async function checkStatus(){document.getElementById("statusTime").textContent="CHECKING";let up=0;await Promise.all(services.map(async function(service){const card=document.querySelector('[data-status-domain="'+service.domain+'"]');const dot=card.querySelector(".status-dot");try{await fetch("https://"+service.domain+"/?status="+Date.now(),{mode:"no-cors",cache:"no-store"});dot.classList.add("is-up");dot.classList.remove("is-down");up+=1;}catch(error){dot.classList.add("is-down");dot.classList.remove("is-up");}}));document.getElementById("upCount").textContent=String(up);document.getElementById("statusTime").textContent=new Intl.DateTimeFormat("ko-KR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date());}
document.getElementById("refreshStatus").addEventListener("click",checkStatus);renderStatus();checkStatus();
