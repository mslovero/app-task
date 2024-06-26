import { useEffect, useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";

export default function SharedTodoModalContent({
  id,
  titulo,
  shared_with_id,
  completada,
}) {
  const [author, setAuthor] = useState({});
  const [sharedWith, setSharedWith] = useState({});
  useEffect(() => {
    fetchInfo();
  }, []);

  async function fetchInfo() {
    const response = await fetch(
      `http://localhost:8080/todos/shared_todos/${id}`,
      {
      
        method: "GET",
      }
    );
    console.log("Datos recibidos del servidor:", { author, shared_with }); // Agrega este console.log para verificar los datos recibidos

    const { author, shared_with } = await response.json();
    setAuthor(author);
    setSharedWith(shared_with);
  }
//modal de particintestulo
  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 15 }]}>Shared Tasks</Text>
      <Text style={[styles.title, { marginBottom: 15 }]}>"{titulo}"</Text>
      <Text style={[styles.title]}>Status</Text>
      <View
        style={[
          styles.status,
          { backgroundColor: completada === 1 ? "#4ade80" : "#f87171" },
        ]}
      >
        <Text style={[styles.title, { color: "white" }]}>
          {completada === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={[styles.description]}>PARTICIPANTS</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>
            {author.email}
          </Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "white" }]}>
            {sharedWith.email}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
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
    fontWeight: "900",
    color: "black",
  },
  participant: {
    backgroundColor: "#8b5cf6",
    padding: 5,
    paddingHorizontal: 5,
    margin: 5,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
});