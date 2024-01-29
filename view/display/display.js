import { Helmsman } from "./helmsman";

export class Display {
  helmsman = new Helmsman();

  install(app) {
    app.use(this.helmsman.router);
  }

  mounted() {
    return this.helmsman.solve();
  }

  opened() {
    return this.helmsman.start();
  }

  signedIn() {
    return this.helmsman.open();
  }

  signedOut() {
    return this.helmsman.signIn();
  }
}
