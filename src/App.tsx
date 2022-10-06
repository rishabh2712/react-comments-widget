import CommentTree from "./CommentsTree";
import useCommentsStore from "./hooks/use-comments-store";

export default function App() {
  const { list } = useCommentsStore();
  return (
    <div className="p-4 flex justify-center flex-col w-1/3">
      {/* <CommentBox id={0} parentId={0} /> */}
      {list.map((item) => (
        <CommentTree {...item} />
      ))}
    </div>

  );
}
