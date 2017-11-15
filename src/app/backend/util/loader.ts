export class Loader {
  // Data must be an imported JSON file
  protected data: Object;

  constructor(data) {
    this.data = data;
  }

  protected createObject(): Object { return null; }

  protected createObjectList(jsonList: Object[]): Object[] {
    return jsonList.map(json =>
      Object.assign(this.createObject(), json)
    );
  }
}
