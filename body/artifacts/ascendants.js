import { ancestify, extractId } from "@lib";

import { listArtifacts } from "./artifacts";

export function listAscendants(dependencies, idOrArtifact) {
  const list = listArtifacts(dependencies);
  const id = extractId(idOrArtifact);
  const ascendants = ancestify(list, id);
  return ascendants;
}
