import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";
import { FFQItem } from "../../models/ffqitem";
import { FormControl, Validator, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { FeedingFrequencyComponent } from "../feeding-frequency/feeding-frequency.component";
import { MatDialog } from "@angular/material/dialog";
import { ServingSizePicturesComponent } from "../serving-size-pictures/serving-size-pictures.component";
@Component({
  selector: "question-block",
  templateUrl: "./question-block.component.html",
  styleUrls: ["./question-block.component.css"],
})
export class QuestionBlockComponent implements OnChanges, OnInit {
  FREQUENCY_TYPES = ["Week", "Day"];
  @Input() foodItem: FFQItem;

  imageRef: string;

  toggleDisable() {
    this.foodItem.disabled = !this.foodItem.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.foodItem.isSubmitted = false;
  }
  constructor(private translate: TranslateService, public dialog: MatDialog) {}

  /**
   * The getImageRef() sets the image location for the serving size of the foods that have images.
   * This switch has various cases based on the foods that have pictures.
   */
  getImageRef(): void {
    switch (this.foodItem.name) {
      case "Infant Formula":
        this.imageRef = "../assets/serving-size-images/formula.jpg";
        break;
      case "Baby Cereal added to formula or breastmilk (examples: rice, wheat, etc.)":
        this.imageRef =
          "../assets/serving-size-images/Cereal-added-to-milk.jpg";
        break;
      case "Cows milk (white, plain)":
        this.imageRef = "../assets/serving-size-images/cows-milk.jpg";
        break;
      case "Flavored Milk (chocolate, vanilla or fruit flavored); examples: Nido, frozen beverages, milkshakes, hot chocolate, etc.)":
        this.imageRef =
          "../assets/serving-size-images/Flavored-Milk-tsp-oz .jpg";
        break;
      case "Vitamin Enriched Pediatric Milk Beverages (examples: Pediasure, Pediasure growth, etc.)":
        this.imageRef = "../assets/serving-size-images/cows-milk.jpg";
        break;
      case "100% orange juice":
        this.imageRef = "../assets/serving-size-images/Sodas.jpg";
        break;
      case "100% vegetable juice (examples: carrot, tomato, etc.)":
        this.imageRef = "../assets/serving-size-images/Sodas.jpg";
        break;
      case "Other fruit beverages (examples: Hi-C, Space gang, Sunny D, etc.)":
        this.imageRef = "../assets/serving-size-images/Sodas.jpg";
        break;
      case "Sodas (examples: Coca-Cola, Pepsi, 7-Up, Fanta, Malta, etc.)":
        this.imageRef = "../assets/serving-size-images/Sodas.jpg";
        break;
      case "Kool-Aid, Tang, Iced Tea (examples: Nestea, Lipton, etc.)":
        this.imageRef = "../assets/serving-size-images/Sodas.jpg";
        break;
      case "Hot cereal (examples: rice cereal, cream of wheat, oatmeal, corn mush, etc.)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Ready to eat breakfast cereals, sugar sweetened (examples: Corn Pops, Fruity Pebbles, Frosted Flakes, Trix, Lucky Charms, Cocoa Puffs, Froot Loops, etc.)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Ready to eat breakfast cereals, low sugar (examples: Corn flakes, regular Cheerios, Life, Corn or Rice Chex, Grape nuts, etc.)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Rice and Pasta":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Bread (examples: sandwich bread, dinner roll, bagel, French bread, tortilla...)":
        /** Missing the image */
        this.imageRef = "../assets/serving-size-images/test-picture.jpg";
        break;
      case "Pancake, waffles, French toast, cinnamon rolls, etc.":
        /** Missing the image */
        this.imageRef = "../assets/serving-size-images/test-picture.jpg";
        break;
      case "Crackers (examples: soda, Ritz, Cheez-It, Saltines, etc.)":
        /** Missing the image */
        this.imageRef = "../assets/serving-size-images/test-picture.jpg";
        break;
      case "Banana":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Apple":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Pear":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Citrus fruits (examples: orange, mandarin, etc.)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Melon":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Mango and Papaya":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Other Fruits":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Carrot":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Green beans":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Corn":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Other vegetables (examples: tomato, lettuce, broccoli, etc.)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Pumpkin/Squash":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Potato or sweet potato":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Plantains":
        /** Missing image */
        this.imageRef = "../assets/serving-size-images/test-picture.jpg";
        break;
      case "Other starchy vegetables (yucca, yautia, celery, breadfruit)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Black/Brown/White beans, pigeon beans, chickpeas, etc.":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Beef or pork (includes ground beef, steak, ribs, hot dogs, sausage, ham)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Chicken or turkey (includes breast, thighs, wings, ground)":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Fish":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Peanuts, peanut butter and other nuts":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      case "Cake, muffins, donuts, etc.":
        /** Missing image */
        this.imageRef = "../assets/serving-size-images/test-picture.jpg";
        break;
      case "Cookies (sugar cookies, chocolate chips, oats, vanilla, etc.)":
        /** Missing image */
        this.imageRef = "../assets/serving-size-images/test-picture.jpg";
        break;
      case "Honey, jam, syrup, agave":
        this.imageRef = "../assets/serving-size-images/Hot-cereal.jpg";
        break;
      default:
        break;
    }
  }

  /**
   * The getHasPictures() returns false if any of the food which dont have pictures
   * are called.
   * @returns true to the foods are not on the if/else if statements
   */
  getHasPictures(): boolean {
    if (this.foodItem.name === "Breast milk") {
      return false;
    } else if (this.foodItem.name === "Water") {
      return false;
    } else if (
      this.foodItem.name ===
      "Other milks (example: soy, rice, almond, goat, etc.)"
    ) {
      return false;
    } else if (this.foodItem.name === "Cheese") {
      return false;
    } else if (this.foodItem.name === "Ice Cream") {
      return false;
    } else if (this.foodItem.name === "Yogurt") {
      return false;
    } else if (
      this.foodItem.name ===
      "Soy products: tofu, veggie Burger, edamame, soy nuggets"
    ) {
      return false;
    } else if (
      this.foodItem.name ===
      "100% fruit juice (examples: apple, pear, grape, cranberry, etc.)"
    ) {
      return false;
    } else if (
      this.foodItem.name === "Pizza, turnovers, tacos, other fried foods, etc."
    ) {
      return false;
    } else if (this.foodItem.name === "French Fries") {
      return false;
    } else if (this.foodItem.name === "Egg") {
      return false;
    } else if (
      this.foodItem.name ===
      "Candies (chocolate, gummies, M&Ms, lollipop, etc.)"
    ) {
      return false;
    } else if (
      this.foodItem.name ===
      "Chips (examples: Doritos, Lays, Cheetos, Tostitos, etc.)"
    ) {
      return false;
    } else if (this.foodItem.name === "Margarine/Butter") {
      return false;
    } else if (this.foodItem.name === "Oil") {
      return false;
    }
    return true;
  }

  /**
   * The zoomPictures() sets the data in the dialog box when the user clicks on the image
   * It will show the title, the image in a larger size, and a description of the size of each serving
   */
  zoomPictures(): void {
    let data;
    if (this.foodItem.name === "Infant Formula") {
      data = {
        data: {
          title: "Infant Formula",
          imageUrl: this.imageRef,
          messages: ["This image represents the Infant formula oz amounts."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Baby Cereal added to formula or breastmilk (examples: rice, wheat, etc.)"
    ) {
      data = {
        data: {
          title:
            "Baby Cereal added to formula or breastmilk (examples: rice, wheat, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents the baby cereal."],
        },
      };
    }
    if (this.foodItem.name === "Cows milk (white, plain)") {
      data = {
        data: {
          title: "Cows milk (white, plain)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Flavored Milk (chocolate, vanilla or fruit flavored); examples: Nido, frozen beverages, milkshakes, hot chocolate, etc.)"
    ) {
      data = {
        data: {
          title:
            "Flavored Milk (chocolate, vanilla or fruit flavored); examples: Nido, frozen beverages, milkshakes, hot chocolate, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Vitamin Enriched Pediatric Milk Beverages (examples: Pediasure, Pediasure growth, etc.)"
    ) {
      data = {
        data: {
          title:
            "Vitamin Enriched Pediatric Milk Beverages (examples: Pediasure, Pediasure growth, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "100% orange juice") {
      data = {
        data: {
          title: "100% orange juice",
          imageUrl: this.imageRef,
          messages: [
            "This image represents the ounces for infant formula in a bottle.",
          ],
        },
      };
    }
    if (
      this.foodItem.name ===
      "100% vegetable juice (examples: carrot, tomato, etc.)"
    ) {
      data = {
        data: {
          title: "100% vegetable juice (examples: carrot, tomato, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Other fruit beverages (examples: Hi-C, Space gang, Sunny D, etc.)"
    ) {
      data = {
        data: {
          title:
            "Other fruit beverages (examples: Hi-C, Space gang, Sunny D, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Sodas (examples: Coca-Cola, Pepsi, 7-Up, Fanta, Malta, etc.)"
    ) {
      data = {
        data: {
          title: "Sodas (examples: Coca-Cola, Pepsi, 7-Up, Fanta, Malta, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Kool-Aid, Tang, Iced Tea (examples: Nestea, Lipton, etc.)"
    ) {
      data = {
        data: {
          title: "Kool-Aid, Tang, Iced Tea (examples: Nestea, Lipton, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Hot cereal (examples: rice cereal, cream of wheat, oatmeal, corn mush, etc.)"
    ) {
      data = {
        data: {
          title:
            "Hot cereal (examples: rice cereal, cream of wheat, oatmeal, corn mush, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Ready to eat breakfast cereals, sugar sweetened (examples: Corn Pops, Fruity Pebbles, Frosted Flakes, Trix, Lucky Charms, Cocoa Puffs, Froot Loops, etc.)"
    ) {
      data = {
        data: {
          title:
            "Ready to eat breakfast cereals, sugar sweetened (examples: Corn Pops, Fruity Pebbles, Frosted Flakes, Trix, Lucky Charms, Cocoa Puffs, Froot Loops, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Ready to eat breakfast cereals, low sugar (examples: Corn flakes, regular Cheerios, Life, Corn or Rice Chex, Grape nuts, etc.)"
    ) {
      data = {
        data: {
          title:
            "Ready to eat breakfast cereals, low sugar (examples: Corn flakes, regular Cheerios, Life, Corn or Rice Chex, Grape nuts, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Rice and Pasta") {
      data = {
        data: {
          title: "Rice and Pasta",
          imageUrl: this.imageRef,
          messages: [
            "This image represents the ounces for infant formula in a bottle.",
          ],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Bread (examples: sandwich bread, dinner roll, bagel, French bread, tortilla...)"
    ) {
      data = {
        data: {
          title:
            "Bread (examples: sandwich bread, dinner roll, bagel, French bread, tortilla...)",
          imageUrl: this.imageRef,
          messages: [
            "This image represents the ounces for infant formula in a bottle.",
          ],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Pancake, waffles, French toast, cinnamon rolls, etc."
    ) {
      data = {
        data: {
          title: "Pancake, waffles, French toast, cinnamon rolls, etc.",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Crackers (examples: soda, Ritz, Cheez-It, Saltines, etc.)"
    ) {
      data = {
        data: {
          title: "Crackers (examples: soda, Ritz, Cheez-It, Saltines, etc.)",
          imageUrl: this.imageRef,
          messages: [
            "This image represents the ounces for infant formula in a bottle.",
          ],
        },
      };
    }
    if (this.foodItem.name === "Banana") {
      data = {
        data: {
          title: "Banana",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Apple") {
      data = {
        data: {
          title: "Apple",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Pear") {
      data = {
        data: {
          title: "Pear",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name === "Citrus fruits (examples: orange, mandarin, etc.)"
    ) {
      data = {
        data: {
          title: "Citrus fruits (examples: orange, mandarin, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Melon") {
      data = {
        data: {
          title: "Melon",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Mango and Papaya") {
      data = {
        data: {
          title: "Mango and Papaya",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Other Fruits") {
      data = {
        data: {
          title: "Other Fruits",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Carrot") {
      data = {
        data: {
          title: "Carrot",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Green beans") {
      data = {
        data: {
          title: "Green beans",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Corn") {
      data = {
        data: {
          title: "Corn",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Other vegetables (examples: tomato, lettuce, broccoli, etc.)"
    ) {
      data = {
        data: {
          title: "Other vegetables (examples: tomato, lettuce, broccoli, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Pumpkin/Squash") {
      data = {
        data: {
          title: "Pumpkin/Squash",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Potato or sweet potato") {
      data = {
        data: {
          title: "Potato or sweet potato",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Plantains") {
      data = {
        data: {
          title: "Plantains",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Other starchy vegetables (yucca, yautia, celery, breadfruit)"
    ) {
      data = {
        data: {
          title: "Other starchy vegetables (yucca, yautia, celery, breadfruit)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Black/Brown/White beans, pigeon beans, chickpeas, etc."
    ) {
      data = {
        data: {
          title: "Black/Brown/White beans, pigeon beans, chickpeas, etc.",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Beef or pork (includes ground beef, steak, ribs, hot dogs, sausage, ham)"
    ) {
      data = {
        data: {
          title:
            "Beef or pork (includes ground beef, steak, ribs, hot dogs, sausage, ham)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Chicken or turkey (includes breast, thighs, wings, ground)"
    ) {
      data = {
        data: {
          title: "Chicken or turkey (includes breast, thighs, wings, ground)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Fish") {
      data = {
        data: {
          title: "Fish",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Peanuts, peanut butter and other nuts") {
      data = {
        data: {
          title: "Peanuts, peanut butter and other nuts",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Cake, muffins, donuts, etc.") {
      data = {
        data: {
          title: "Cake, muffins, donuts, etc.",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (
      this.foodItem.name ===
      "Cookies (sugar cookies, chocolate chips, oats, vanilla, etc.)"
    ) {
      data = {
        data: {
          title:
            "Cookies (sugar cookies, chocolate chips, oats, vanilla, etc.)",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    if (this.foodItem.name === "Honey, jam, syrup, agave") {
      data = {
        data: {
          title: "Honey, jam, syrup, agave",
          imageUrl: this.imageRef,
          messages: ["This image represents ."],
        },
      };
    }
    this.dialog.open(ServingSizePicturesComponent, data);
  }

  ngOnInit(): void {
    this.getImageRef();
    console.log(this.imageRef);
  }

  openDialog(): void {
    this.dialog.open(ServingSizePicturesComponent);
  }
}
