// flow-typed signature: d6f2a36873c8623fdfa8b29c6bfde6c0
// flow-typed version: c6154227d1/use-react-router_v1.x.x/flow_>=v0.104.x

declare module "use-react-router" {
  declare type Location = {
    pathname: string,
    search: string,
    hash: string,
    state?: any,
    key?: string,
    ...
  }
  declare export type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: any,
    ...
  };
  declare type HistoryAction = "PUSH" | "REPLACE" | "POP";
  declare type RouterHistory = {
    length: number,
    location: Location,
    action: HistoryAction,
    listen(
      callback: (location: Location, action: HistoryAction) => void
    ): () => void,
    push(path: string | LocationShape, state?: any): void,
    replace(path: string | LocationShape, state?: any): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
    canGo?: (n: number) => boolean,
    block(
      callback: (location: Location, action: HistoryAction) => boolean
    ): void,
    // createMemoryHistory
    index?: number,
    entries?: Array<Location>,
    ...
  }
  declare type Match = {
    params: { [key: string]: ?string, ... },
    isExact: boolean,
    path: string,
    url: string,
    ...
  };
  declare function useReactRouter(): {
    history: RouterHistory,
    match: Match,
    location: Location,
    ...
  };
  declare module.exports: typeof useReactRouter;
}
