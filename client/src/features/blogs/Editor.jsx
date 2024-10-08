import EditorJs from "@editorjs/editorjs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tools } from "./tools";
import { useParams } from "react-router-dom";
import { setEditor } from "./blogSlice";

function Editor() {
  const { blog, editor } = useSelector((state) => state.blog);
  const { blogId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId && !blog.content[0]?.blocks) {
      dispatch(setEditor({ isReady: false }));
      return;
    }

    if (!editor.isReady) {
      dispatch(
        setEditor(
          new EditorJs({
            holder: "editorjs",
            tools: tools,
            data: Array.isArray(blog.content) ? blog.content[0] : blog.content,
            placeholder: "Add your content here.",
          })
        )
      );
    }
  }, [blog.content, blogId, dispatch, editor.isReady]);

  return <div id="editorjs"></div>;
}

export default Editor;
