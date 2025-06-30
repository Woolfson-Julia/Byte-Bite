import NotFound from '../../components/NotFound/NotFound';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import css from './RecipeViewPage.module.css'

export default function RecipeViewPage() {
  return (
    <>
      <NotFound />
      <RecipeDetails />
    </>
  );
}