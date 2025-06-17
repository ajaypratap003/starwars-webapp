import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedFavourites } from "../store/selectors";
import { deleteAllFavourites, deleteFavouriteByUID } from "../store/starwarsSlice";
import { Favourites } from "../components/Favourites";
import { Loader } from "../components";

const FavouritesPage: React.FC = () => {
  const favourites = useSelector(selectedFavourites);
  const dispatch = useDispatch();

  if (!favourites) return <Loader />;

  const deleteAll = () => {
    dispatch(deleteAllFavourites());
  };

  const deleteFavourite=(uid: string)=>{
    dispatch(deleteFavouriteByUID(uid));
  }

  return (
    <div>
      <Favourites favourites={favourites} deleteAll={deleteAll} deleteFavourite={deleteFavourite}/>
    </div>
  );
};

export default FavouritesPage;
