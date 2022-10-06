import { Action, ActionTypes, CommentList, CommentStore, CommentsContextType } from "../../types";
import { createContext, useContext, useRef, useState } from "react";

const CommentsContext = createContext<
  CommentsContextType
>({
  store: new Map(),
  list: [],
  onMutation: () => { }
});

const ThisContext = (): CommentsContextType => useContext(CommentsContext)

let uuid = 0;

export function CommentsProvider({
  children
}) {
  const store = useRef<CommentStore>(new Map());
  const newRecord = () => ({
    id: uuid,
    children: []
  });

  const [commentList, mutateList] = useState<CommentList[]>([newRecord()]);

  const update = () => {
    mutateList([...commentList]);
  };

  const findParent = (parentId = 0, parent = commentList): CommentList | null => {

    for (let comment of parent) {
      if (comment.children?.length) {
        const result = findParent(parentId, comment.children);
        if (result) {
          return result;
        }
      }
      if (comment.id === parentId) {
        return comment
      }
    }
    return null
  }

  // addition of new entry
  const onMutation = (action: Action) => {
    const { payload, type } = action;
    const addNewRecord = () => {
      if (payload.text && payload.text.trim().length) {
        const id = ++uuid;
        const record = {
          id,
          updatedAt: Date.now(),
          text: payload.text
        };
        const parent = findParent(payload.meta.parentId)
        if (parent && parent.children) {
          parent.children = [{
            id,
            children: []
          }, ...parent.children]
          store.current.set(id, record);
          update();
        }
      }
    };

    const updateRecord = () => {
      const { id, meta: {
        parentId
      }, ...rest } = payload;

      const parent = findParent(parentId)
      if (parent && parent.children && typeof id !== "undefined") {
        if (store.current.has(id)) {
          //@ts-ignore
          store.current.set(id, { id, updatedAt: Date.now(), ...rest });
          update();
        }
      }
    };

    const deleteRecord = () => {
      const {
        id,
        meta: {
          parentId
        }
      } = payload;

      const parent = findParent(parentId)
      if (parent && parent.children && id) {
        parent.children?.splice(
          parent.children.findIndex((item) => item.id === id),
          1
        );
        store.current.delete(id);
        update();
      }
    };

    const mutations = {
      [ActionTypes.ADD]: addNewRecord,
      [ActionTypes.DELETE]: deleteRecord,
      [ActionTypes.UPDATE]: updateRecord
    };

    if (typeof mutations[type] === "function") {
      mutations[type]();
    }
  };


  return (
    <CommentsContext.Provider value={
      {
        store: store.current,
        list: commentList,
        onMutation
      }
    }>
      {children}
    </CommentsContext.Provider>
  )
}

export default ThisContext;
