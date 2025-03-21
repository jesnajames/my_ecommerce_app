export interface Category {
  id: string;
  name: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}
