import { jsx, jsxs } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
const SITE_NAME = "PageSampleNodeJs";
const SITE_TAGLINE = "정보 전달용 샘플 블로그";
const FOOTER_COPYRIGHT = "© PageSampleNodeJs";
const CATEGORY_DEV = "dev";
const CATEGORY_NOTES = "notes";
const CATEGORY_META = "meta";
const CATEGORY_ORDER = [CATEGORY_DEV, CATEGORY_NOTES, CATEGORY_META];
const CATEGORY_LABELS = {
  [CATEGORY_DEV]: "개발",
  [CATEGORY_NOTES]: "노트",
  [CATEGORY_META]: "소개·운영"
};
function SiteFooter() {
  return /* @__PURE__ */ jsx("footer", { className: "siteFooter", role: "contentinfo", children: /* @__PURE__ */ jsx("p", { className: "siteFooter__text", children: FOOTER_COPYRIGHT }) });
}
function SiteHeader({ rootPrefix, active }) {
  const home = rootPrefix ? rootPrefix : "./";
  const about = `${rootPrefix}about/`;
  return /* @__PURE__ */ jsx("header", { className: "siteHeader", role: "banner", children: /* @__PURE__ */ jsxs("div", { className: "siteHeader__inner", children: [
    /* @__PURE__ */ jsx("a", { href: home, className: "siteHeader__brand", "aria-current": active === "home" ? "page" : void 0, children: "PageSampleNodeJs" }),
    /* @__PURE__ */ jsx("nav", { className: "nav", "aria-label": "주요 메뉴", children: /* @__PURE__ */ jsxs("ul", { className: "nav__list", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: home, className: `nav__link ${active === "home" ? "nav__link--active" : ""}`, children: "홈" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: about, className: `nav__link ${active === "about" ? "nav__link--active" : ""}`, children: "About" }) }),
      CATEGORY_ORDER.map((cat) => {
        const href = `${rootPrefix}${cat}/`;
        const act = `category-${cat}`;
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href, className: `nav__link ${active === act ? "nav__link--active" : ""}`, children: CATEGORY_LABELS[cat] }) }, cat);
      })
    ] }) })
  ] }) });
}
function SiteLayout({ children, rootPrefix, active }) {
  return /* @__PURE__ */ jsxs("div", { className: "siteLayout", id: "top", children: [
    /* @__PURE__ */ jsx(SiteHeader, { rootPrefix, active }),
    /* @__PURE__ */ jsx("main", { className: "siteLayout__content", children }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
function rootPrefixFromDepth(depth) {
  if (depth <= 0) {
    return "";
  }
  return "../".repeat(depth);
}
function homeDirHrefFromDepth(depth) {
  if (depth <= 0) {
    return "./";
  }
  return rootPrefixFromDepth(depth);
}
function postListHrefFromDepth(depth, fileNum) {
  return `${rootPrefixFromDepth(depth)}posts/${fileNum}/`;
}
function HomePage({ page }) {
  const { data, active, depth } = page;
  const r = rootPrefixFromDepth(depth);
  const posts = [...data.posts || []].sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
  return /* @__PURE__ */ jsx(SiteLayout, { rootPrefix: r, active, children: /* @__PURE__ */ jsxs("div", { className: "page", children: [
    /* @__PURE__ */ jsxs("section", { className: "page__hero", "aria-labelledby": "home-title", children: [
      /* @__PURE__ */ jsx("h1", { id: "home-title", className: "page__h1", children: data.siteName ?? SITE_NAME }),
      /* @__PURE__ */ jsx("p", { className: "page__meta", children: data.tagline ?? SITE_TAGLINE })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "page__section page__section--posts", "aria-labelledby": "posts-heading", children: [
      /* @__PURE__ */ jsx("h2", { id: "posts-heading", className: "page__h2 page__h2--section", children: "최근 글" }),
      /* @__PURE__ */ jsx("div", { className: "page__listShell", children: /* @__PURE__ */ jsx("div", { className: "postList", children: posts.map((post) => /* @__PURE__ */ jsxs("article", { className: "postCard", children: [
        /* @__PURE__ */ jsx("p", { className: "postCard__date", children: post.date }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            className: "postCard__linkBlock",
            href: postListHrefFromDepth(depth, post.fileNum),
            "aria-label": `${post.title} 글 보기`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: "postCard__title", children: post.title }),
              /* @__PURE__ */ jsx("p", { className: "postCard__excerpt", children: post.excerpt })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "postCard__tags", children: /* @__PURE__ */ jsx(
          "a",
          {
            className: "postCard__catLink",
            href: `${r}${post.category}/`,
            "aria-label": `${CATEGORY_LABELS[post.category] || post.category} 분류로 이동`,
            children: /* @__PURE__ */ jsx("span", { className: "tag", children: CATEGORY_LABELS[post.category] || post.category })
          }
        ) })
      ] }, post.id)) }) })
    ] })
  ] }) });
}
function AboutPage({ page }) {
  const { active, depth } = page;
  const r = rootPrefixFromDepth(depth);
  return /* @__PURE__ */ jsx(SiteLayout, { rootPrefix: r, active, children: /* @__PURE__ */ jsxs("div", { className: "page", children: [
    /* @__PURE__ */ jsxs("section", { className: "page__hero", "aria-labelledby": "about-title", children: [
      /* @__PURE__ */ jsx("h1", { id: "about-title", className: "page__h1", children: "About" }),
      /* @__PURE__ */ jsxs("p", { className: "page__meta", children: [
        "React로 UI를 구성하고, 글은 ",
        /* @__PURE__ */ jsx("code", { children: "posts/1.md" }),
        " … 통일 번호로 두고 프론트매터 ",
        /* @__PURE__ */ jsx("code", { children: "category" }),
        "(dev·notes·meta)로 분류만 표시하며, 빌드·미들웨어에서 HTML로 뽑은 뒤 ",
        /* @__PURE__ */ jsx("strong", { children: "하이드레이션" }),
        "합니다.             글 URL은 ",
        /* @__PURE__ */ jsx("code", { children: "/posts/N/" }),
        " 형태로 통일하고, 링크는 디렉터리 형태로 둡니다."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "page__section", children: [
      /* @__PURE__ */ jsx("h2", { className: "page__h2", children: "구성" }),
      /* @__PURE__ */ jsxs("p", { className: "page__p", children: [
        "이동은 ",
        /* @__PURE__ */ jsx("code", { children: "<a href>" }),
        " 전체 문서 리로드(해시 없음)입니다. 클라이언트 라우터는 쓰지 않습니다."
      ] })
    ] })
  ] }) });
}
function CategoryPage({ page }) {
  const { data, active, depth } = page;
  const r = rootPrefixFromDepth(depth);
  return /* @__PURE__ */ jsx(SiteLayout, { rootPrefix: r, active, children: /* @__PURE__ */ jsxs("div", { className: "page", children: [
    /* @__PURE__ */ jsxs("section", { className: "page__hero", "aria-labelledby": "cat-title", children: [
      /* @__PURE__ */ jsx("h1", { id: "cat-title", className: "page__h1", children: data.label }),
      /* @__PURE__ */ jsx("p", { className: "page__meta", children: "이 분류에 해당하는 글입니다." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "page__section page__section--posts", "aria-labelledby": "cat-posts", children: [
      /* @__PURE__ */ jsx("h2", { id: "cat-posts", className: "page__h2 page__h2--section", children: "글 목록" }),
      data.posts.length === 0 ? /* @__PURE__ */ jsx("p", { className: "page__p page__p--emptyInList", children: "이 분류에 등록된 글이 없습니다." }) : /* @__PURE__ */ jsx("div", { className: "page__listShell", children: /* @__PURE__ */ jsx("div", { className: "postList", children: data.posts.map((post) => /* @__PURE__ */ jsxs("article", { className: "postCard", children: [
        /* @__PURE__ */ jsx("p", { className: "postCard__date", children: post.date }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            className: "postCard__linkBlock",
            href: postListHrefFromDepth(depth, post.fileNum),
            "aria-label": `${post.title} 글 보기`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: "postCard__title", children: post.title }),
              /* @__PURE__ */ jsx("p", { className: "postCard__excerpt", children: post.excerpt })
            ]
          }
        )
      ] }, post.id)) }) })
    ] })
  ] }) });
}
function PostPage({ page }) {
  const { data, active, depth } = page;
  const r = rootPrefixFromDepth(depth);
  return /* @__PURE__ */ jsx(SiteLayout, { rootPrefix: r, active, children: /* @__PURE__ */ jsx("div", { className: "page postDetail", children: /* @__PURE__ */ jsxs("article", { children: [
    /* @__PURE__ */ jsxs("header", { className: "page__hero postDetail__header", "aria-labelledby": "post-title", children: [
      /* @__PURE__ */ jsx("p", { className: "page__meta", children: data.date }),
      /* @__PURE__ */ jsx("h1", { id: "post-title", className: "page__h1", children: data.title }),
      /* @__PURE__ */ jsxs("p", { className: "page__meta postDetail__category", children: [
        /* @__PURE__ */ jsx("a", { className: "textLink", href: `${r}${data.category}/`, children: CATEGORY_LABELS[data.category] || data.category }),
        /* @__PURE__ */ jsx("span", { className: "postDetail__sep", children: " · " }),
        /* @__PURE__ */ jsx("a", { className: "textLink", href: r || "./", children: "목록" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "page__section postDetail__body", "aria-label": "본문", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "postBody markdownBody",
        dangerouslySetInnerHTML: { __html: data.bodyHtml }
      }
    ) })
  ] }) }) });
}
function NotFoundPage({ page }) {
  const { depth = 0 } = page;
  const r = homeDirHrefFromDepth(depth);
  return /* @__PURE__ */ jsx(SiteLayout, { rootPrefix: rootPrefixFromDepth(depth), active: "", children: /* @__PURE__ */ jsx("div", { className: "page page--notFound", children: /* @__PURE__ */ jsxs("section", { className: "page__hero", "aria-labelledby": "notfound-title", children: [
    /* @__PURE__ */ jsx("h1", { id: "notfound-title", className: "page__h1", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "page__meta", children: "요청한 경로를 찾을 수 없습니다." }),
    /* @__PURE__ */ jsx("p", { className: "page__p", children: /* @__PURE__ */ jsx("a", { className: "textLink", href: r, children: "홈으로 돌아가기" }) })
  ] }) }) });
}
function App({ page }) {
  switch (page.type) {
    case "home":
      return /* @__PURE__ */ jsx(HomePage, { page });
    case "about":
      return /* @__PURE__ */ jsx(AboutPage, { page });
    case "category":
      return /* @__PURE__ */ jsx(CategoryPage, { page });
    case "post":
      return /* @__PURE__ */ jsx(PostPage, { page });
    case "notFound":
      return /* @__PURE__ */ jsx(NotFoundPage, { page });
    default:
      return /* @__PURE__ */ jsx(NotFoundPage, { page });
  }
}
function renderAppToString(page) {
  return renderToString(/* @__PURE__ */ jsx(App, { page }));
}
export {
  renderAppToString
};
