import { Controller, Get, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service.js';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getVehicles() {
    return this.vehiclesService.getVehicles();
  }

  @Get(':id')
  getVehicle(@Param('id') id: string) {
    return this.vehiclesService.getVehicle(id);
  }
}