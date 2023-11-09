import type { Node } from "./node";

import { describe, test, expect } from "vitest";
import { treeify } from "./treeify";
import { filterTree } from "./filter";

describe("filter tree", () => {
  const a = { id: "a", parentId: null };
  const a1 = { id: "a1", parentId: "a" };
  const a11 = { id: "a11", parentId: "a1" };
  const b = { id: "b" };
  const b1 = { id: "b1", archivedAt: new Date(), parentId: "b" };

  test("filter a tree into an array", () => {
    const tree = treeify([b1, a11, a, a1, b]);

    const filter = (node: Node) => {
      if ("id" in node) return node.id === a1.id;
      return false;
    };
    const subTree = filterTree(tree, filter);

    expect(subTree).toEqual([
      {
        ...a1,
        children: [
          {
            ...a11,
            children: [],
          },
        ],
      },
    ]);
  });
});
