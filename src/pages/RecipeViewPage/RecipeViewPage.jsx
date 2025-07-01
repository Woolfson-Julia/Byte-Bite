import { useParams } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecipeViewPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setIsError(false)
        const recipeResponse = await axios.get(`https://byte-bitebd.onrender.com/api/recipes/${id}`);

        setRecipe(recipeResponse.data.data);
      } catch {
        setIsError(true);
      }
    }

    getRecipe();
  }, [id]);

  return (
    <>
      {isError && <NotFound />}
      {recipe && <RecipeDetails recipe={recipe} />}
    </>
  );
}