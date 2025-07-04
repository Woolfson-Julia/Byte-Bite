import axios from '../../../axiosConfig';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import css from './RecipeViewPage.module.css'

export default function RecipeViewPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await axios.get(`https://byte-bitebd.onrender.com/api/recipes/${id}`);

        setRecipe(response.data.data.recipes);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getRecipe();
  }, [id]);
  return (
    <>
      {isLoading && <Loader />}
      {isError && <NotFound />}
      {recipe && <RecipeDetails recipe={recipe} />}
    </>
  );
}