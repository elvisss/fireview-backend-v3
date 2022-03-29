export default class Marker {
  constructor(
    public id: string,
    public name: string,
    public lng: number,
    public lat: number,
    public value: boolean,
    public data_sensor: number,
  ) {}
}
