import CommentBox from "./CommentBox";
import { CommentList } from "./types";

function CommentTree(
  props: CommentList & {
    parentId?: CommentList["id"];
  }
) {
  const { id, children, parentId } = props || {};

  return (
    <>
      <CommentBox
        id={id}
        parentId={parentId}
      />

      <div className="">
        {Array.isArray(children) &&
          children.map((item, idex) => (
            <div className="ml-12" key={`${idex} + ${item.id}`} data-commentId={item.id}>
              <CommentTree {...item} parentId={id} />
            </div>
          ))}
      </div>
    </>
  );
}

export default CommentTree;
