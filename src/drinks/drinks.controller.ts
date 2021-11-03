import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrinksService } from './drinks.service';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  addDrinks(
    @Body('fund') drinksFund: number,
    @Body('income') drinksIncome: number,
    @Body('coke') drinksCoke: number,
    @Body('pepsi') drinksPepsi: number,
    @Body('dew') drinksDew: number,

  ) {
    const generatedId = this.drinksService.insertDrinks(
      drinksFund,
      drinksIncome,
      drinksCoke,
      drinksPepsi,
      drinksDew,
    );
    return { id: generatedId };
  }

  @Get()
  getAllDrinks() {
    return this.drinksService.getDrinks();
  }

  @Get(':id')
  getDrinksById(@Param('id') id: string) {
    return this.drinksService.findThatOneDrink(id);
  }

  @Patch(':id')
  buyDrinksById(
    @Param('id') drinksId: string,
    @Body('drinks') drinksDrink: string,
    @Body('money') drinksMoney: number,
  ) {
    this.drinksService.buyDrinks(drinksId, drinksDrink, drinksMoney);
    return null;
  }

  @Delete(':id')
  removeDrinksById(@Param('id') id: string) {
    return this.drinksService.deleteDrinksByID(id);
  }
}
