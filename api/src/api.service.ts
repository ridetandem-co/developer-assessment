import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

export interface BusTime {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
}

@Injectable()
export class ApiService {
  getBusTimes() {
    return this.generateRandomBusTimes(5);
  }
  private generateRandomBusTimes(timesToGenerate: number) {
    let data: BusTime[] = [];
    for (let i = 0; i < timesToGenerate; i++) {
      const { id: busId, destination } = this.getRandomBusRoute();
      data.push({
        id: i,
        busId,
        destination,
        minutesUntilArrival: _.random(1, 15),
      });
    }
    return data;
  }
  private getRandomBusRoute() {
    const busRoutes = [
      { id: 176, destination: 'Newham Close', nonOperationalDays: [1, 3] },
      { id: 185, destination: 'Train Station', nonOperationalDays: [5, 2] },
      {
        id: 193,
        destination: 'Shopping Centre',
        nonOperationalDays: [1, 5, 4],
      },
    ];
    return busRoutes[_.random(0, busRoutes.length - 1)];
  }
}
