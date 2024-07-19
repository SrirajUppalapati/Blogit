import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import Underline from "@editorjs/underline";

export const tools = {
  paragraph: { class: Paragraph },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header...",
      levels: [1, 2, 3, 4, 5],
      defaultLevel: 2,
    },
  },
  list: {
    class: List,
    config: {
      defaultStyle: "unordered",
    },
  },
  image: {
    class: SimpleImage,
  },
  embed: {
    class: Embed,
    services: {
      youtube: true,
      codepen: true,
    },
  },
  underline: { class: Underline },
  marker: { class: Marker },
  inlineCode: { class: InlineCode },
  checklist: { class: Checklist },
};
