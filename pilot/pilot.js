import { AUTH_STATUSES } from "@lib";
import { key } from "./key";

export class Pilot {
  router;
  artifacts;
  auth;

  constructor({ artifacts, auth, router }) {
    this.artifacts = artifacts;
    this.auth = auth;
    this.router = router;
    this.router.push({ name: "page-unsolved" });
  }

  async start() {
    const status = await this.auth.open();

    if (status === AUTH_STATUSES.SIGNED_IN) {
      await this.artifacts.open();
      this.router.push({ name: "page-artifacts-plan" });
    } else {
      this.router.push({ name: "page-auth" });
    }
  }

  async signIn(payload) {
    await this.auth.signIn(payload);
    await this.artifacts.open();
    this.router.push({ name: "page-artifacts-plan" });
  }

  async signOut() {
    await this.auth.signOut();
    this.artifacts.close();
    this.router.push({ name: "page-auth" });
  }

  // async addArtifact(name: string) {
  //   await this.artifacts.add({ name });
  // }
  // listArtifacts() {
  //   return this.artifacts.filter();
  // }

  install(app) {
    app.provide(key, this);
  }
}
