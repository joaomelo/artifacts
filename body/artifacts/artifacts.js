export class Artifacts {
  gatekeeper;
  mutator;
  selector;

  constructor({ mutator, selector }) {
    this.mutator = mutator;

    this.selector = selector;
    this.selector.set({
      name: "artifacts",
      orderBy: "order",
      wheres: [
        {
          field: "userId",
          operator: "==",
          value: () => this.gatekeeper.solveUserId(),
        },
      ],
    });
  }

  list() {
    return this.select().list();
  }

  open() {
    return this.select().open();
  }

  select() {
    return this.selector.get("artifacts");
  }
}
