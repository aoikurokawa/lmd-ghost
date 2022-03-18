export type TweetAttr = {
  author?: string,
  timestamp?: number,
  topic?: string,
  content?: string,
};

export interface ITweetState {
  loading: boolean;
  error: string | null;
  data: TweetAttr;
}

export enum ActionType {
  GET_ALL_TWEETS = "GET_ALL_TWEETS",
}

export type Action = {
  type: ActionType.GET_ALL_TWEETS;
  payload: Required<TweetAttr>;
};
