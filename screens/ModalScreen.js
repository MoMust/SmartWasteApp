import { React, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Formik } from "formik";
import { COLORS } from "../constants";
import { images, icons } from "../constants";
import db, { annonsData, categoryData } from "../constants/db";

export default function ModalScreen({navigation, addAnnons}) {
  const [modalOpen, setModelOpen] = useState(false)
  
  return (
    <View>
      {/* Modal */}
      <Modal isVisible={modalOpen}>
        <View>
          <Text>Modal</Text>
          <TouchableOpacity
            onPress={() => {
              setModelOpen(false);
              navigation.navigate("Annonser");
            }}
          >
            <Text>Press</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                id: null,
                name: "",
                portion: "",
                categories: [1],
                price: "",
                photo: images.fishsoup,
                location: "",
                description: "",
                courier: {
                  profilePicture: images.profilePic,
                  name: "John",
                },
                info: "",
                ingredients: "",
                aller: "",
              }}
              onSubmit={(values) => {
                addAnnons(values);
                console.log(values);
                setModelOpen(true);
              }}
            >
              {(props) => (
                <View>
                  <Text>Maträtt</Text>

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Maträtt"
                    onChangeText={props.handleChange("name")}
                    value={props.values.name}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Beskrivning"
                    onChangeText={props.handleChange("description")}
                    value={props.values.description}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                        height: 100,
                      },
                    ]}
                    placeholder="Ingredientser"
                    onChangeText={props.handleChange("ingredients")}
                    multiline={true}
                    numberOfLines={3}
                    value={props.values.ingredients}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Antal portioner"
                    onChangeText={props.handleChange("portion")}
                    value={props.values.portion}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Allergener"
                    onChangeText={props.handleChange("aller")}
                    value={props.values.aller}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Kategorier"
                    onChangeText={props.handleChange("categories")}
                    value={props.values.categories}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Extra info"
                    onChangeText={props.handleChange("info")}
                    value={props.values.info}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Pris"
                    onChangeText={props.handleChange("price")}
                    value={props.values.price}
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Plats"
                    onChangeText={props.handleChange("location")}
                    value={props.values.location}
                  />

                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderWidth: 1,
                      },
                    ]}
                    placeholder="Namn"
                    onChangeText={props.handleChange("courier")}
                    value={props.values.courier.name}
                  />

                  <Button
                    title="submit"
                    color="maroon"
                    onPress={props.handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
});
