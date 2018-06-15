import 'bootstrap';

export class App {
  configureRouter(config, router){
    this.router= router;
    config.map([{route: ['',"webworker"], name:"webworker", moduleId:"webworker", title:"Web Worker"}]);
  }
  constructor() {

  }
}
