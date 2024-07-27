import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import Paragraph from "@coolbytes/editorjs-paragraph";
import Image from "@coolbytes/editorjs-image";

export const tools = {
  header: {
    class: Header,
    config: {
      placeholder: "Add your header here...",
      levels: [1, 2, 3, 4],
      defaultLevel: 2,
    },
  },
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+M",
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  paragraph: {
    class: Paragraph,
    config: {
      placeholder: "Add your content here...",
      preserveBlank: false,
      alignTypes: ["left", "center", "right", "justify"],
      defaultAlignType: "left",
    },
  },
  image: {
    class: Image,
    inlineToolbar: true,
    config: {
      enableCaption: true,
      captionPlaceholder: "Enter a caption",
    },
  },
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+H",
  },
  underline: {
    class: Underline,
    shortcut: "CMD+SHIFT+U",
  },
};
