import EditorJs from "@editorjs/editorjs";
import { useDispatch, useSelector } from "react-redux";
import { writeBlog } from "./blogSlice";
import { useEffect, useRef } from "react";
import { tools } from "./tools";

function Editor() {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const { blog } = useSelector((state) => state.blog);

  useEffect(
    function () {
      if (!editorRef.current) {
        const editor = new EditorJs({
          holder: "editorjs",
          tools: tools,
          data: blog.content,
          placeholder: "Add your content here.",
          onChange: () =>
            editor.save().then((data) => {
              dispatch(writeBlog({ content: data }));
            }),
        });
        editorRef.current = editor;
      }
    },
    [dispatch, blog]
  );

  return <div id="editorjs"></div>;
}

export default Editor;
