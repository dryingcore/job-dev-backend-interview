export default class Restaurant {
  id?: number;
  name: string;
  address: string;
  photoUrl: string;
  openingHours: string;

  constructor(name: string, address: string, photoUrl: string, openingHours: string, id?: number) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.photoUrl = photoUrl;
    this.openingHours = openingHours;
  }

  /**
   * Valida os dados do restaurante.
   * @throws Error caso os dados sejam inválidos.
   */
  validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required.');
    }

    if (!this.address || this.address.trim().length === 0) {
      throw new Error('Address is required.');
    }

    if (!this.photoUrl || this.photoUrl.trim().length === 0) {
      throw new Error('Photo URL is required.');
    }

    if (!this.openingHours || this.openingHours.trim().length === 0) {
      throw new Error('Opening hours are required.');
    }
  }
}
