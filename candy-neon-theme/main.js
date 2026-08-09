/**
 * Candy Neon — a high-contrast, soft-colorful, eye-catching theme for Acode.
 *
 * Palette:
 *   Background : #12101c (near-black, cool violet undertone)
 *   Surface    : #1c1930
 *   Text       : #f5f3ff (near-white, high contrast against bg)
 *   Pink       : #ff6ec7  — keywords / primary actions
 *   Cyan       : #5ff5e0  — functions / links
 *   Violet     : #b98eff  — types / secondary
 *   Yellow     : #ffe066  — numbers / warnings
 *   Lime       : #8effc1  — strings / success
 *   Orange     : #ff9f6b  — constants / active
 *   Red        : #ff5c7a  — errors / danger
 */

const PLUGIN_ID = "com.neonheart711.candyneon";

const palette = {
  bg: "#12101c",
  surface: "#1c1930",
  surfaceAlt: "#241f3d",
  border: "#372f57",
  text: "#f5f3ff",
  muted: "#a79fc9",
  pink: "#ff6ec7",
  cyan: "#5ff5e0",
  violet: "#b98eff",
  yellow: "#ffe066",
  lime: "#8effc1",
  orange: "#ff9f6b",
  red: "#ff5c7a",
};

function buildUiTheme() {
  const ThemeBuilder = acode.require("themeBuilder");
  const theme = new ThemeBuilder("Candy Neon", "dark");

  // Core palette
  theme.primaryColor = palette.pink;
  theme.secondaryColor = palette.cyan;
  theme.textColor = palette.text;
  theme.backgroundColor = palette.bg;
  theme.activeColor = palette.orange;
  theme.dangerColor = palette.red;
  theme.linkTextColor = palette.cyan;

  // Typography
  theme.fontFamily = "'Roboto Mono', 'Fira Code', monospace";
  theme.fontSize = "14px";
  theme.fontWeight = "400";

  // Element-specific styles
  theme.buttonBackgroundColor = palette.pink;
  theme.buttonTextColor = palette.bg;
  theme.borderColor = palette.border;
  theme.popupBackgroundColor = palette.surface;
  theme.scrollbarColor = palette.violet;

  return theme;
}

function buildEditorTheme(editorThemes) {
  const { cm, createTheme, createHighlightStyle } = editorThemes;
  const t = cm.tags;

  const highlight = createHighlightStyle([
    // Keywords & control flow — every language's def/class/import/if/for/return/etc.
    {
      tag: [
        t.keyword,
        t.controlKeyword,
        t.moduleKeyword,
        t.definitionKeyword,
        t.operatorKeyword,
      ],
      color: palette.pink,
      fontWeight: "bold",
    },

    // Strings & string-like literals
    {
      tag: [t.string, t.special(t.string), t.character, t.regexp],
      color: palette.lime,
    },

    // Numbers, booleans, constant atoms
    {
      tag: [t.number, t.integer, t.float, t.bool, t.atom],
      color: palette.yellow,
    },

    // Comments (line, block, doc)
    {
      tag: [t.comment, t.lineComment, t.blockComment, t.docComment],
      color: palette.muted,
      fontStyle: "italic",
    },

    // Functions, methods, macros, labels
    {
      tag: [t.function(t.variableName), t.propertyName, t.macroName, t.labelName],
      color: palette.cyan,
    },

    // Types, classes, namespaces, interfaces, enums, generics
    {
      tag: [t.typeName, t.className, t.namespace, t.angleBracket, t.annotation],
      color: palette.violet,
    },

    // Plain variables & general definitions
    {
      tag: [t.variableName, t.definition(t.variableName)],
      color: palette.text,
    },

    // Constants (ALL_CAPS-style names), self/this, special names
    {
      tag: [t.constant(t.variableName), t.self, t.standard(t.variableName), t.modifier],
      color: palette.orange,
    },

    // Operators of every flavor
    {
      tag: [
        t.operator,
        t.arithmeticOperator,
        t.logicOperator,
        t.bitwiseOperator,
        t.compareOperator,
        t.updateOperator,
        t.definitionOperator,
        t.derefOperator,
      ],
      color: palette.orange,
    },

    // Punctuation & brackets — kept subdued so colored tokens still pop
    {
      tag: [t.punctuation, t.bracket, t.paren, t.squareBracket, t.brace, t.separator],
      color: palette.muted,
    },

    // Markup (HTML/JSX/XML tags & attributes)
    { tag: t.tagName, color: palette.pink },
    { tag: [t.attributeName], color: palette.orange },
    { tag: t.attributeValue, color: palette.lime },

    // Links, URLs, escapes
    { tag: [t.link, t.url], color: palette.cyan, textDecoration: "underline" },
    { tag: t.escape, color: palette.orange },

    // Markdown / doc formatting
    { tag: t.heading, color: palette.pink, fontWeight: "bold" },
    { tag: t.strong, fontWeight: "bold", color: palette.text },
    { tag: t.emphasis, fontStyle: "italic", color: palette.text },
    { tag: [t.quote, t.monospace], color: palette.cyan },

    // Meta / preprocessor / decorators
    { tag: [t.meta, t.processingInstruction], color: palette.violet },

    // Errors
    { tag: t.invalid, color: palette.red, textDecoration: "underline wavy" },

    // Changes (diff/merge views)
    { tag: t.inserted, color: palette.lime },
    { tag: t.deleted, color: palette.red },
    { tag: t.changed, color: palette.yellow },
  ]);

  return createTheme({
    dark: true,
    styles: {
      "&": { color: palette.text, backgroundColor: palette.bg },
      ".cm-content": { caretColor: palette.pink },
      ".cm-cursor, .cm-dropCursor": { borderLeftColor: palette.pink, borderLeftWidth: "2px" },
      ".cm-selectionBackground, .cm-content ::selection": { backgroundColor: "#3a2f5c" },
      ".cm-gutters": {
        backgroundColor: palette.bg,
        color: palette.muted,
        border: "none",
        borderRight: `1px solid ${palette.border}`,
      },
      ".cm-activeLine": { backgroundColor: palette.surfaceAlt },
      ".cm-activeLineGutter": { backgroundColor: palette.surfaceAlt, color: palette.pink },
      ".cm-matchingBracket, .cm-nonmatchingBracket": {
        backgroundColor: "#3a2f5c",
        color: palette.yellow,
        fontWeight: "bold",
      },
      ".cm-searchMatch": { backgroundColor: "#4a3a70", outline: `1px solid ${palette.violet}` },
      ".cm-searchMatch-selected": { backgroundColor: palette.pink, color: palette.bg },
      ".cm-foldPlaceholder": {
        backgroundColor: palette.surfaceAlt,
        color: palette.cyan,
        border: `1px solid ${palette.border}`,
      },
    },
    highlightStyle: highlight,
  });
}

let uiTheme;

acode.setPluginInit(PLUGIN_ID, () => {
  // Register the app-wide UI theme
  uiTheme = buildUiTheme();

  // Register the syntax-highlighting editor theme
  const editorThemes = acode.require("editorThemes");
  editorThemes.register({
    id: "candy_neon",
    caption: "Candy Neon",
    dark: true,
    getExtension: () => buildEditorTheme(editorThemes),
    config: {
      name: "candy_neon",
      dark: true,
      background: palette.bg,
      foreground: palette.text,
      keyword: palette.pink,
      string: palette.lime,
      number: palette.yellow,
      comment: palette.muted,
      function: palette.cyan,
      variable: palette.text,
      type: palette.violet,
      class: palette.violet,
      constant: palette.orange,
      operator: palette.orange,
      invalid: palette.red,
    },
  });
});

acode.setPluginUnmount(PLUGIN_ID, () => {
  const editorThemes = acode.require("editorThemes");
  editorThemes.unregister("candy_neon");
});
