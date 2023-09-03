import { useState, useEffect } from "react";
import yelp from "../api/yelp";

const useSearchScreen = ({ term }) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    searchAPI("pasta");
  }, []);

  const searchAPI = async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults((response && response.data && response.data.businesses) || []);
      if (errorMessage) {
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.log(`Error occurred while calling API - ${error}`);
    }
  };


  return {
    results,
    errorMessage,
    searchAPI,
  }
};

export default useSearchScreen;
