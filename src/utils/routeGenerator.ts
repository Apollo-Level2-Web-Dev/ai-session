import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
  children?: TRoute[];
};

export const routeGenerator = (items: TRoute[]): TRoute[] => {
  return items.map((item) => ({
    path: item.path,
    element: item.element,
    children: item.children ? routeGenerator(item.children) : undefined,
  }));
};
