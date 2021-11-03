import { Injectable, NotFoundException } from '@nestjs/common';

import { Drink } from './drink.model';

@Injectable()
export class DrinksService {
  private Drinks: Drink[] = [];

  insertDrinks(fund: number, income:number, coke:number ,pepsi:number ,dew:number ) {
    const prodId = Math.random().toString();
    const newDrink = new Drink(prodId ,fund, income, coke, pepsi, dew);
    this.Drinks.push(newDrink);
    return prodId;
  }

  getDrinks() {
    return [...this.Drinks];
  }

  findThatOneDrink(drinksId: string) {
    const product = this.findDrinks(drinksId)[0];
    return { ...product };
  }

  async buyDrinks(id: string, drink :string , money :number) {
    try{
      console.log(id);
      console.log(drink);
      console.log(money);

      const [products, index]  = await this.findDrinks(id);;
      console.log("++++++++++++++++++++++++++++++++++")
      console.log(this.Drinks[index]);

      let newValue  = this.Drinks[index];

      let remainder :  number = 0;
      let numOfDrinks : number  = 0;
      let deductSum : number = 0;
      switch(drink){
          case 'coke':
              if(money < 20){
                  numOfDrinks = 0;
                  remainder = money;
                  break;
              }
              else{
                  let numOfCoke : string = (money / 20).toString();
                  numOfCoke = numOfCoke.split('.')[0];
                  numOfDrinks = <number><unknown>numOfCoke;
                  remainder = money % 20;
                  newValue.coke =  newValue.coke - (<number><unknown>numOfCoke);   
                  deductSum = money - remainder;
                  break;
              }

          case 'pepsi':
              if(money < 25){
                  numOfDrinks = 0;
                  remainder = money;
                  break;
              }
              else{
                  let numOfPepsi : string = (money / 25).toString();
                  numOfPepsi = numOfPepsi.split('.')[0];
                  numOfDrinks = <number><unknown>numOfPepsi;
                  remainder = money % 25;
                  newValue.pepsi =  newValue.pepsi - (<number><unknown>numOfPepsi);   
                  deductSum = money - remainder;
                  break;
              }

          case 'dew':
              if(money < 20){
                  numOfDrinks = 0;
                  remainder = money;
                  break;
              }
              else{
                  let numOfDew : string = (money / 30).toString();
                  numOfDew = numOfDew.split('.')[0];
                  numOfDrinks = <number><unknown>numOfDew;
                  remainder = money % 30;
                  newValue.dew =  newValue.dew - (<number><unknown>numOfDew);   
                  deductSum = money - remainder;
                  break;
              }

          default:
              newValue = newValue;
              break;
      }
      newValue.fund = newValue.fund - deductSum;
      newValue.income = newValue.income + deductSum;
      this.Drinks[index] = newValue;
  }
  catch(error) {
      console.log(error);
      throw error;
  }
  }

  deleteDrinksByID(id: string) {
    const index = this.findDrinks(id)[1];
      this.Drinks.splice(index, 1);
  }


  private findDrinks(id: string): [Drink, number] {
    const drinkIndex = this.Drinks.findIndex(prod => prod.id === id);
    console.log("Checking the drinindex");
    console.log(drinkIndex);
    const drink = this.Drinks[drinkIndex];
    if (!drink) {
      console.log("!");
      throw new NotFoundException('Could not find product.');
    }
    console.log("!!!!!");

    return [drink, drinkIndex];
  }
}
