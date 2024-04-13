import UploadModal from "@/component/UploadModal";
import { SearchHistory } from "@/redux/reducers/profileSlice";
import axios from "axios";
import Image from "next/image";
// import Footer from "@/component/footer";
import React, { useCallback, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const SearchItems = [
  "Wallpapers",
  "Nature",
  "3D Renders",
  "Travel",
  "Architecture & Interiors",
  "Textures & Patterns",
  "Street Photography",
  "Film",
  "Archival",
  "Experimental",
  "Flower",
  "Home",
  "Birds",
  "Animals",
  "Sunset",
];

const index = () => {
  const [photosData, setPhotosData] = useState({
    photos: [],
    page: 1,
    perPage: 500,
    isLoading: false,
  });

  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [showHistory, setShowHistory] = useState(false);    
  //   const clientId =
  //     "5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02";

  const clientId = "pl0cVvHXInEomk5LF4XojCiD6GC9aZPZtufMQUH5v1Q";

  const fetchPhotos = useCallback(
    (page, perPage) => {
      //   console.log(search, "searchsearch");
      //   console.log(
      //     `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${clientId}`
      //   );

      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${clientId}`
        )
        .then((response) => {
          const data = response.data;
          //   console.log(data, "sdfsdf");
          if (data) {
            const images = data.results.map((item) => ({
              url: item?.urls?.full,
            }));
            setPhotosData((prev) => ({
              ...prev,
              photos: [...prev.photos, ...images],
              isLoading: false,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    [search]
  );

  useEffect(() => {
    fetchPhotos(1, 500);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPhotos]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      !photosData.isLoading
    ) {
      setPhotosData((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
      fetchPhotos(photosData.page + 1, 50);
    }
  };

  //dispatch for History of search 
  const dispatch = useDispatch();
  useEffect(() => {
    if (!SearchItems.includes(text)) {
      dispatch(SearchHistory(text));
    }
  }, [search]);

  //access history of search
  const searchedValue = useSelector((state) => state.profile.searchedValue);
//   console.log("hello history", searchedValue);

  const { photos, isLoading } = photosData;
  //   let loader;
  //   if (photos.length < 0 || isLoading) {
  //     loader = <Loader />;
  //   }

  const handleChange = (e) => {
    e.preventDefault();
    // setSearch(e.target.value);
    setText(e.target.value);
  };
  //   console.log(search, "search");
  return (
    <div>
      <nav className="bg-black py-5 px-20 lg:flex space-y-8 lg:space-y-0 text-center lg:text-left text-gray-300 justify-between font-medium">
        {/* logo on the left side of nav */}
        <a href="#" className="font-extrabold text-xl text-white">
          Resplash{" "}
          <span className="opacity-40 font-light italic">
            (An Unsplash Clone)
          </span>
        </a>
        {/* right side of nav */}

        <div>
          <a href="#" className="py-4 px-6 text-gray-200">
            Login/Signup
          </a>

          <UploadModal />
        </div>
      </nav>

      <div>
        {/* <div className="w-full flex flex-wrap justify-around items-center bg-gray-200 p-4">
          <span
            className="text-lg font-bold text-blue-500 m-2 cursor-pointer"
            onClick={() => {
              setText("Flowers"), setSearch("Flowers");
            }}
          >
            Flowers
          </span>
          <span
            className="text-lg font-bold text-blue-500 m-2 cursor-pointer"
            onClick={() => {
              setText("birds"), setSearch("birds");
            }}
          >
            Birds
          </span>
          <span
            className="text-lg font-bold text-blue-500 m-2 cursor-pointer"
            onClick={() => {
              setText("office"), setSearch("office");
            }}
          >
            Office
          </span>
          <span
            className="text-lg font-bold text-blue-500 m-2 cursor-pointer"
            onClick={() => {
              setText("Shirts"), setSearch("Shirts");
            }}
          >
            Shirts
          </span>
          <span
            className="text-lg font-bold text-blue-500 m-2 cursor-pointer"
            onClick={() => {
              setText("Tshirts"), setSearch("Tshirts");
            }}
          >
            Tshirts
          </span>
          <span
            className="text-lg font-bold text-blue-500 m-2 cursor-pointer"
            onClick={() => setText("Laptops")}
          >
            Laptops
          </span>
        </div> */}

        <div className="py-4 border-b shadow-sm flex">
          {SearchItems.map((item) => {
            return (
              <span
                key={item}
                className="text-lg font-normal text-gray-500 m-2 cursor-pointer whitespace-nowrap py-1 px-2 hover:text-gray-800"
                onClick={() => {
                  setText(item), setSearch(item);
                  setPhotosData({
                    photos: [],
                    page: 1,
                    perPage: 500,
                    isLoading: false,
                  });
                }}
              >
                {item}
              </span>
            );
          })}
        </div>

        <div className="px-4 py-2">
          <h1 className="text-xl font-bold">Search Images</h1>
        </div>
        <div className="flex items-center gap-2 px-4">
          <div className="w-1/3 relative">
            <span className="text-gray-400 absolute top-2 right-2">
              <BiSearch size={25} />
            </span>
            <input
              type="text"
              placeholder="Search high-resolution images"
              onChange={handleChange}
              onFocus = {() => setShowHistory(true)}
              value={text}
              className="border rounded-lg w-full py-2 pl-3 pr-6 text-gray-700 text-base focus:outline-none focus:shadow-outline"
            />
            {showHistory && searchedValue.length > 0 && (
              <div className="absolute border rounded-lg w-full flex flex-wrap gap-2 p-3 bg-white">
                {searchedValue.map((item) => {
                  return (
                    <span className="px-2 text-gray-500 border rounded cursor-pointer" onClick={() => {setText(item), setSearch(item), setShowHistory(false);}}>
                      {item}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer border px-3 py-2 flex rounded-lg"
            name="Search"
            onClick={() => setSearch(text)}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-5 px-5 py-5">
        {/* {console.log(photos, "photo")} */}
        {photos?.map((photo, index) => (
          //print image
          <img
            key={index}
            src={photo.url}
            alt="photo"
            width={395}
            height={395}
          />
        ))}
      </div>

      {/* <div className="flex items-end h-full w-screen"> 
        <Footer/>
     </div> */}
    </div>
  );
};

export default index;
