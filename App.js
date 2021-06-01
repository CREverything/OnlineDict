import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import dictionary from "./database.js";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      word: "",
      lexicalCategory: "",
      definition: "",
      isSearchPressed: false,
    };
  }
  searchWord = (text) => {
    var lowercase = text.toLowerCase();

    try {
      var word = dictionary[lowercase]["word"];
      var lexical = dictionary[lowercase]["lexicalCategory"];
      var definition = dictionary[lowercase]["definition"];
      this.setState({
        word: word,
        lexicalCategory: lexical,
        definition: definition,
      });
    } catch (error) {
      Alert.alert("Sorry, this word is not in our database.");
      this.setState({
        text: "",
        isSearchPressed: false,
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: "OfflineDict",
            style: { color: "white", fontSize: 18 },
          }}
          backgroundColor="orange"
        />
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="Search the word's definition"
            style={styles.searchbar}
            onChangeText={(text) => {
              this.setState({
                text: text,
                word: "loading..",
                lexicalCategory: "",
                definition: "",
                isSearchPressed: false,
              });
            }}
          />

          <TouchableOpacity
            style={styles.search}
            onPress={() => {
              this.setState({
                isSearchPressed: true,
              });

              this.searchWord(this.state.text);
            }}
          >
            <Text style={{ color: "white", justifyContent: "center" }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20 }}>
            {this.state.searchpressed && this.state.word === "Loading.."
              ? this.state.word
              : ""}
          </Text>
          {this.state.word !== "Loading.." ? (
            <View style={{ justifyContent: "center", marginLeft: 10 }}>
              <Text>Word:{this.state.word}</Text>
              <Text>Type:{this.state.lexicalCategory}</Text>
              <Text>Definition:{this.state.definition}</Text>
              <TouchableOpacity style={styles.searchbar}>
                <Text>Pronunciation</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputBoxContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  outputContainer: {
    flex: 0.7,
    alignItems: "center",
  },
  searchbar: {
    borderRadius: 10,
    width: 200,
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    borderRadius: 10,
    width: 100,
    height: 40,
    marginTop: 20,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  headers: {
    color: "orange",
  },
});
