import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToList } from "../Features/ListSlice";
import { fetchMovies } from "../Features/MoviesSlice";
import Cards from "./Cards";
export default function Movies() {
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movies);
    console.log(movies)
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleClick = (movie) => {
        dispatch(addToList(movie))
    }
    const banner = movies[Math.floor(Math.random() * 20)];
    return (
        <>
            <div className="h-[100vh] bg-black flex flex-col items-start justify-center md:px-4 font-body relative top-0" style={{
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original${banner?.backdrop_path}")`,
                backgroundPosition: 'cover cover',
                boxShadow: '10px -31px 66px 50px rgba(0,0,0,0.75) inset',
            }}>
                <div className="flex flex-col items-start justify-around">
                    <h1 className="text-6xl text-white mb-4">{banner?.title || banner?.name}</h1>
                    <div className="flex items-center justify-between md:space-x-5">
                        <button
                            className="bg-slate-500 bg-opacity-40 hover:bg-opacity-90 px-7 py-1 rounded-sm text-white">
                            <span>Play</span>
                        </button>
                        <button onClick={() => handleClick(banner)}
                            className="bg-slate-500 bg-opacity-40 hover:bg-opacity-90 px-7 py-1 rounded-sm text-white">
                            <span>Watch List</span>
                        </button>
                    </div>
                    <div className="md:max-w-md mt-5">
                        <p className="text-white">
                            {banner?.overview}
                        </p>
                    </div>
                </div>
            </div>
            <Cards media={movies} title={true} />
        </>
    );
}