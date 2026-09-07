/**
 * Generates profile/assets/*.svg in carol's design language.
 *
 * Every glyph is outlined to <path> (satori embedFont), so the SVGs carry no
 * font dependency and render identically on GitHub — no <style>, no webfonts.
 *
 * Deps (not vendored):  npm i satori @resvg/resvg-js
 * Fonts:  auto-downloaded to scripts/.fonts/ on first run (Pretendard, JetBrains Mono).
 * Run:    node scripts/gen-assets.js
 *
 * Design source: team-carol/carol → docs/DESIGN.md + src/web/*
 *   canvas #0d0d0d · surface #1a1a1a · border #252525 · accent #9333ea / #c084fc
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "profile", "assets");
const FDIR = path.join(__dirname, ".fonts");

const satori = require("satori").default || require("satori");
const { Resvg } = require("@resvg/resvg-js");

const FONT_URLS = {
  "Pretendard-Regular.otf": "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static/Pretendard-Regular.otf",
  "Pretendard-SemiBold.otf": "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static/Pretendard-SemiBold.otf",
  "Pretendard-Bold.otf": "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static/Pretendard-Bold.otf",
  "Pretendard-ExtraBold.otf": "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static/Pretendard-ExtraBold.otf",
  "JetBrainsMono-Regular.ttf": "https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@v2.304/fonts/ttf/JetBrainsMono-Regular.ttf",
  "JetBrainsMono-Medium.ttf": "https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@v2.304/fonts/ttf/JetBrainsMono-Medium.ttf",
};

const get = (url) =>
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return get(res.headers.location).then(resolve, reject);
      if (res.statusCode !== 200) return reject(new Error(`${res.statusCode} ${url}`));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });

async function loadFonts() {
  fs.mkdirSync(FDIR, { recursive: true });
  const out = {};
  for (const [file, url] of Object.entries(FONT_URLS)) {
    const dest = path.join(FDIR, file);
    if (!fs.existsSync(dest) || fs.statSync(dest).size < 10000) {
      process.stdout.write(`fetching ${file} … `);
      fs.writeFileSync(dest, await get(url));
      console.log("ok");
    }
    out[file] = fs.readFileSync(dest);
  }
  return [
    { name: "Pretendard", data: out["Pretendard-Regular.otf"], weight: 400, style: "normal" },
    { name: "Pretendard", data: out["Pretendard-SemiBold.otf"], weight: 600, style: "normal" },
    { name: "Pretendard", data: out["Pretendard-Bold.otf"], weight: 700, style: "normal" },
    { name: "Pretendard", data: out["Pretendard-ExtraBold.otf"], weight: 800, style: "normal" },
    { name: "JBMono", data: out["JetBrainsMono-Regular.ttf"], weight: 400, style: "normal" },
    { name: "JBMono", data: out["JetBrainsMono-Medium.ttf"], weight: 500, style: "normal" },
  ];
}

const h = (type, style, children) => ({ type, props: { style, children } });
const txt = (s, style) => ({ type: "div", props: { style: { display: "flex", ...style }, children: s } });

function banner(dark) {
  const c = dark
    ? { bg: "#0d0d0d", bd: "#252525", preC: "#5c5c5c", word: "#ffffff", eye: "#888888", tag: "#aaaaaa", chipBg: "#1a1a1a", chipBd: "#2a2a2a", chipC: "#cccccc", glow: "rgba(147,51,234,0.30)" }
    : { bg: "#ffffff", bd: "#e9e4f2", preC: "#b3b3b3", word: "#1a1a1a", eye: "#8a8a8a", tag: "#5a5a5a", chipBg: "#f5f2fa", chipBd: "#e5dff0", chipC: "#4a4a4a", glow: "rgba(147,51,234,0.14)" };
  const chip = (label) =>
    txt(label, { padding: "8px 16px", border: `1px solid ${c.chipBd}`, borderRadius: 8, background: c.chipBg, fontSize: 13, fontWeight: 600, color: c.chipC });
  return h(
    "div",
    { width: 1280, height: 360, display: "flex", flexDirection: "column", justifyContent: "center", background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 20, padding: "0 64px", fontFamily: "Pretendard", position: "relative", overflow: "hidden" },
    [
      h("div", { position: "absolute", top: -420, right: -260, width: 900, height: 900, display: "flex", background: `radial-gradient(circle, ${c.glow} 0%, rgba(147,51,234,0) 70%)` }, []),
      h("div", { width: 52, height: 4, borderRadius: 2, display: "flex", background: "linear-gradient(90deg,#9333ea,#c084fc)", marginBottom: 22 }, []),
      txt("TEAM · CAROL", { fontFamily: "JBMono", fontSize: 13, letterSpacing: 4, color: c.eye, marginBottom: 14 }),
      h("div", { display: "flex", flexDirection: "row", fontSize: 92, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }, [txt("team-", { color: c.preC }), txt("carol", { color: c.word })]),
      txt("maimai DX NET을 Discord와 브라우저에서 — 봇 · 확장 · 이슈 triage", { fontSize: 22, color: c.tag, marginTop: 16 }),
      h("div", { display: "flex", flexDirection: "row", gap: 12, marginTop: 26 }, [chip("Discord Bot"), chip("Chrome Extension"), chip("Issue Triage")]),
    ]
  );
}

function card({ eyebrow, title, d1, d2, meta, accent }) {
  return h(
    "div",
    { width: 660, height: 176, display: "flex", flexDirection: "column", background: "#151515", border: "1px solid #2a2a2a", borderRadius: 14, padding: "22px 26px", fontFamily: "Pretendard", position: "relative", overflow: "hidden" },
    [
      h("div", { position: "absolute", left: 0, top: 0, bottom: 0, width: 5, display: "flex", background: accent }, []),
      txt(eyebrow, { fontFamily: "JBMono", fontSize: 11, letterSpacing: 2.5, color: "#777777", marginBottom: 9 }),
      txt(title, { fontSize: 23, fontWeight: 700, color: "#ffffff", marginBottom: 9 }),
      txt(d1, { fontSize: 13.5, color: "#8a8a8a", lineHeight: 1.5 }),
      txt(d2, { fontSize: 13.5, color: "#8a8a8a", lineHeight: 1.5 }),
      h("div", { display: "flex", flex: 1 }, []),
      h("div", { display: "flex", flexDirection: "row", alignItems: "center", fontSize: 12 }, [
        h("div", { width: 9, height: 9, borderRadius: 9, display: "flex", background: "#3178c6", marginRight: 8 }, []),
        txt("TypeScript", { color: "#9a9a9a" }),
        txt(meta, { color: "#666666", marginLeft: 14 }),
      ]),
    ]
  );
}

const CARDS = {
  "card-carol": { eyebrow: "TEAM-CAROL / CAROL", title: "carol", d1: "maimai DX NET 프로필을 Discord에서 확인하는 봇.", d2: "북마클릿 동기화 · satori PNG 렌더 · 타 게임 레이팅 치환.", meta: "MIT  ·  ★ 4", accent: "#9333ea" },
  "card-extension": { eyebrow: "TEAM-CAROL / CAROL-EXTENSION", title: "carol-extension", d1: "maimaiDX NET을 한국어로, 곡을 별명으로 찾는 크롬 확장.", d2: "번역 사전 418 · 곡명 817 · 별명 3,486 · 선택적 동기화.", meta: "MIT  ·  WXT · MV3", accent: "#c084fc" },
  "card-issue": { eyebrow: "TEAM-CAROL / CAROL-ISSUE", title: "carol-issue", d1: "Discord 제보 → AI가 GitHub Issue 초안 → GitHub App 발행.", d2: "carol 본체와 HTTP API로 분리된 triage 서비스.", meta: "OpenAPI / Scalar", accent: "#f97316" },
  "card-web": { eyebrow: "TEAM-CAROL / CAROL-WEB", title: "carol-web", d1: "캐롤봇 랜딩 페이지. 노션 트윗 링크로 패치노트 자동 생성.", d2: "ko / en / ja 다국어 · ISR 10분 갱신.", meta: "Next.js 16 · Tailwind v4", accent: "#16a34a" },
};

(async () => {
  const fonts = await loadFonts();
  fs.mkdirSync(OUT, { recursive: true });
  const jobs = [
    ["banner-dark", banner(true), 1280, 360],
    ["banner-light", banner(false), 1280, 360],
    ...Object.entries(CARDS).map(([k, v]) => [k, card(v), 660, 176]),
  ];
  for (const [name, node, w, hh] of jobs) {
    const svg = await satori(node, { width: w, height: hh, fonts }); // embedFont:true → glyphs outlined
    fs.writeFileSync(path.join(OUT, name + ".svg"), svg);
    console.log("wrote", path.relative(ROOT, path.join(OUT, name + ".svg")), `(${(svg.length / 1024).toFixed(1)} KB)`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
