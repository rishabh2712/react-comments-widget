type Identity = number;

export type CommentList = {
  id: Identity;
  children?: CommentList[];
};

export type CommentDetails = {
  id: Identity;
  text: string;
  updatedAt: number;
  isEdited?: boolean;
};

export type CommentStore = Map<Identity, CommentDetails>;

export enum ActionTypes {
  ADD,
  UPDATE,
  DELETE
}

export type Action = {
  type: ActionTypes;
  payload: Partial<CommentDetails> & {
    meta: {
      parentId: CommentList["id"];
    };
  };
};

export type CommentsContextType = {
  store: Map<Identity, CommentDetails>;
  list: CommentList[];
  onMutation: (action: Action) => void;
}
