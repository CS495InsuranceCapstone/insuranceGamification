export class Loader {
  // Data must be an imported JSON file
  protected data: Object;

  protected createObject(): Object { return null; }

  protected createEventList(jsonList: Object[]): Object[] {
    return jsonList.map(json =>
      Object.assign(this.createObject(), json)
    );
  }
}
