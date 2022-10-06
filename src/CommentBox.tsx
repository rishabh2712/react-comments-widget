import { CommentList } from "./types";
import Editor from './components/Editor'
import useCommentsStore from "./hooks/use-comments-store";
import { useState } from "react";

function CommentBox({
  id,
  parentId = 0,
  replyMode,
  disableReply
}: {
  id?: CommentList["id"];
  parentId?: CommentList["id"]
  replyMode?: boolean;
  disableReply?: () => void;
}) {
  const { onMutation } = useCommentsStore();
  const [isReply, setReply] = useState(false);

  const mutate = (value, type) => {
    const action = {
      type,
      payload: {
        text: value,
        id,
        meta: {
          parentId
        }
      }
    }

    onMutation(action);
    if (replyMode) {
      disableReply?.()
    }
  };

  const initiateReply = () => {
    setReply(true);
  };

  const completeReply = () => {
    setReply(false);
  }

  return (
    <div className="relative">
      <Editor
        initiateReply={initiateReply}
        mutate={mutate}
        id={id}
      />
      <div className="ml-12">
        {isReply && (
          <CommentBox replyMode={isReply} parentId={id} disableReply={completeReply} />
        )}
      </div>
    </div>
  );
}

export default CommentBox;
