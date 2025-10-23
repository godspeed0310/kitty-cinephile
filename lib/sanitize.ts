import sanitizeHtml from "sanitize-html";

export const sanitizeContent = (html: string): string => {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",

      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "mark",
      "small",
      "del",
      "ins",
      "sub",
      "sup",

      "a",

      "ul",
      "ol",
      "li",

      "blockquote",
      "code",
      "pre",

      "img",
      "figure",
      "figcaption",

      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",

      "div",
      "span",
      "section",
      "article",

      "hr",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["class", "id"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
    },

    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.href && attribs.href.startsWith("http")) {
          return {
            tagName,
            attribs: {
              ...attribs,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          };
        }
        return { tagName, attribs };
      },
    },
  });
};
