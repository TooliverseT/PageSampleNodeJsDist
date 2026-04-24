(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const n=document.querySelector("#app");n&&(n.innerHTML=`
    <main class="layout">
      <h1>PageSampleNodeJs</h1>
      <p class="lead">${c()}</p>
      <p class="meta">Node + Vite · ${u()}</p>
    </main>
  `);function c(){return"로컬은 Docker, 배포는 GitHub Pages(외부 저장소)로 동작하는 샘플입니다."}function u(){return"빌드: production"}
