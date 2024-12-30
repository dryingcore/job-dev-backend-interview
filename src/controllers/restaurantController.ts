import { IncomingMessage, ServerResponse } from 'http';
import RestaurantService from '../services/RestaurantService';
import Restaurant from '../models/restaurantModel';

export default class RestaurantController {
  private restaurantService: RestaurantService;

  constructor() {
    this.restaurantService = new RestaurantService();
  }

  /**
   * Rota POST para criar um restaurante.
   * @param req Request do servidor.
   * @param res Response do servidor.
   */
  public async createRestaurant(req: IncomingMessage, res: ServerResponse): Promise<void> {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { name, address, photoUrl, openingHours } = JSON.parse(body);

        // Valida os campos obrigatórios
        if (!name || !address || !photoUrl || !openingHours) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing required fields' }));
          return;
        }

        const restaurant = new Restaurant(name, address, photoUrl, openingHours);
        const createdRestaurant = await this.restaurantService.createRestaurant(restaurant);

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(createdRestaurant));
      } catch (error) {
        console.error('Error creating restaurant:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  }
}
