import { Category } from "../models";

export interface CategoryUseCase {
  load(): Array<Category>
}