
import { useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function TodoModalContent({ id, titulo, closeModal, setIsShared }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos/shared_todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({

          todo_id: id,
          user_id: 1, 
          todo_id: id,
          shared_with_id:2
        }),
      });

      if (response.ok) {
        Alert.alert(
          "Congratulations 🎉",
          `You successfully shared ${titulo} with ${email}`,
          [{ text: "Okay",  onPress: () => {
            closeModal(true);
            setIsShared(true);
            
          }}
        ]
        );
      } else {
        Alert.alert("Error", "Failed to share task. Please try again later.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to share task. Please try again later.");
    }

    setEmail("");
    setFocus(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Share your task</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{titulo}"</Text>
      <Text style={styles.description}>
        Enter the email of the user you want to share your task with. Share a
        task with someone and stay in sync with your goals every day.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" },
        ]}
        placeholder="Enter your contact email"
      />
      <Button
        onPress={handleSubmit}
        title="Share"
        disabled={email.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
});
