import type { Nodes } from "@/domain";
import type { Configuration } from "@/utils";

import type { Source } from "./source";

import { SuitesPortfolio } from "./suites";

export class NodesService {
  nodes: Nodes;
  portfolio: SuitesPortfolio;

  constructor(nodes: Nodes, configuration: Configuration) {
    this.nodes = nodes;
    this.portfolio = new SuitesPortfolio(configuration);
  }

  async bootstrap(source: Source) {
    const suite = this.portfolio.get(source);
    const repository = await suite.repository();
    this.nodes.connect(repository);
  }

  exit() {
    this.nodes.disconnect();
  }

  async request(source: Source) {
    const suite = this.portfolio.get(source);
    await suite.request();
  }

  supports(source: Source) {
    const suite = this.portfolio.get(source);
    return suite.supports();
  }
}