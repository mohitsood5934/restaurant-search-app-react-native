import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");

  const { results, errorMessage, searchAPI } = useResults({ term });

  // console.log(results, 'xxxresults');
  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={(term) => setTerm(term)}
        onTermSubmit={() => searchAPI(term)}
      />
      {errorMessage && <Text>{errorMessage}</Text>}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
          // navigation={navigation}
        />
        <ResultsList
          results={filterResultsByPrice("$$")}
          title="Bit Pricier"
          // navigation={navigation}
        />
        <ResultsList
          results={filterResultsByPrice("$$$")}
          title="Big Spender"
          // navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
