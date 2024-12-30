import Database from '../database/databaseConfig';
import Restaurant from '../models/restaurantModel';

export default class RestaurantService {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  public async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    const toBeCreatedRestaurant = new Restaurant(
      restaurant.name,
      restaurant.address,
      restaurant.photoUrl,
      restaurant.openingHours,
    );

    // Validação de dados
    toBeCreatedRestaurant.validate();

    // Inserção no banco de dados com parametrização
    const query = `
      INSERT INTO restaurants (name, address, photo_url, opening_hours)
      VALUES ($1, $2, $3, $4) RETURNING id, name, address, photo_url, opening_hours;
    `;
    const values = [
      toBeCreatedRestaurant.name,
      toBeCreatedRestaurant.address,
      toBeCreatedRestaurant.photoUrl,
      toBeCreatedRestaurant.openingHours,
    ];

    const result = await this.db.query(query, values);

    // Retornar o restaurante criado
    const row = result.rows[0];
    return new Restaurant(row.name, row.address, row.photo_url, row.opening_hours, row.id);
  }
}
