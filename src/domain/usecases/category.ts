import {CategoryModel} from '../models/category-model'

export interface Category {
    handleGetCategoreis(): Promise<Array<CategoryModel>>
    handleGetCategoryById(): Promise<CategoryModel>
}
