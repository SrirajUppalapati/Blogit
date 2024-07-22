import EditorJs from "@editorjs/editorjs";
import { useDispatch } from "react-redux";
import { writeBlog } from "./blogSlice";
import { useEffect, useRef } from "react";
import { tools } from "./tools";

function Editor() {
  const dispatch = useDispatch();
  const editorRef = useRef();

  useEffect(
    function () {
      if (!editorRef.current) {
        const editor = new EditorJs({
          holder: "editorjs",
          tools: tools,
          placeholder: "Add your content here.",
          onChange: () =>
            editor.save().then((data) => {
              dispatch(writeBlog({ content: data }));
            }),
        });
        editorRef.current = editor;
      }
    },
    [dispatch]
  );

  return <div id="editorjs"></div>;
}

export default Editor;
