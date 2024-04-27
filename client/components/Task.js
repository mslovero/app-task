import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Pressable, Alert } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SharedTodoModalContent from './SharedTodoModalContent';
import TodoModalContent from './TodoModalContent';

function CheckMarck({id, completada, toggleTodo}) {
    async function toggle() {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            value: completada ? false : true,
          }),
        });
        const data = await response.json();
        console.log('desde data===>', data);
        toggleTodo(id);
        if (!completada) {
          Alert.alert(
              '¡Congratulation!',
              'You have completed the task.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
      }
      }
    return (
        <Pressable
        onPress={toggle}
         style={[
            styles.checkMark,
             {backgroundColor: completada === 0 ? "#E9E9EF" : "#0EA5E9" },
         ]}>
        </Pressable>
    );
}
export default function Task({ id, titulo, shared_with_id, completada, clearTodo, toggleTodo}) 
    {
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    // agrego estado para cambiar el icono
    const [isShared, setIsShared] = useState(shared_with_id !== null);

    
    const bottomSheetModalRef = useRef(null);
    const sharedBottomSheetRef = useRef(null);
    
    const snapPoints = ["25%", "48%", "75%"];
    const snapPointsShared = ["40%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function handlePresentShared() {
    sharedBottomSheetRef.current?.present();
  }

    async function deleteTodo() {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: "DELETE"
        });
         clearTodo(id);
        console.log(response.status);
    }

    //funcion que agrego para cerrar el modal
    const closeModal = () => {
      bottomSheetModalRef.current?.dismiss(); // Cierra el modal
    };
    console.log("closeModal:", closeModal);

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}>
        <View  style={styles.containerTextCheckBox}>
            <CheckMarck id={id} completada={completada} toggleTodo={toggleTodo} />
           <Text style={styles.text}>{titulo}</Text>
       </View>
       {isShared ? (
          <Feather 
           onPress={handlePresentShared}
           name="users"
           size={20}
           color="#383839"
            />
        ) : (
        <Feather 
           onPress={handlePresentModal}
           name="share"
           size={20}
           color="#383839"/>
       )}
       {isDeleteActive && (
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
            <Text style={{color:"white", fontWeight:"bo"}}>x</Text>
        </Pressable>
       )}
       <BottomSheetModal
           ref={sharedBottomSheetRef}
           snapPoints={snapPointsShared}
           backgroundStyle={{borderRadius: 50, borderWidth:4}}>
            <SharedTodoModalContent 
              id={id}
              titulo={titulo}
              shared_with_id={shared_with_id}
              completada={completada}
            />
       </BottomSheetModal>
       {/* 2 modal */}
       <BottomSheetModal
          ref={bottomSheetModalRef}
          index={2}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
        >
        <TodoModalContent id={id} titulo={titulo} 
          closeModal={closeModal}  // Cambia esta línea
          setIsShared={setIsShared} />
      </BottomSheetModal>
    </TouchableOpacity> 
    
  );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 14,
      borderRadius: 21,
      marginBottom: 10,
      backgroundColor: "white",
    },
    containerTextCheckBox: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 1,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#383839",
      letterSpacing: -0.011 * 16, // 16 = baseFontSize
      flexShrink: 1,
      marginHorizontal: 8,
    },
    checkMark: {
      width: 20,
      height: 20,
      borderRadius: 7,
    },
    deleteButton: {
      position: "absolute",
      right: 0,
      top: -6,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ef4444",
      borderRadius: 10,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    title: {
      fontWeight: "900",
      letterSpacing: 0.5,
      fontSize: 16,
    },
    subtitle: {
      color: "#101318",
      fontSize: 14,
      fontWeight: "bold",
    },
    description: {
      color: "#56636F",
      fontSize: 13,
      fontWeight: "normal",
      width: "100%",
    },
  });