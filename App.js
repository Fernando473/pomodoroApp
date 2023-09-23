import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View, Platform, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60); // In miliseconds
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false)
  const handleStartStop = () =>{
    setIsActive(!isActive)
  }
  useEffect(()=>{
    let interval = null;
    
    if(isActive){
      // run timer
      interval = setInterval(()=>{
        setTime(time-1)
      },100)
      
    }else{
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  },[isActive,time])
  return (  
    <SafeAreaView style={[styles.container, { backgroundColor:colors[currentTime]}]}>
      <View style={{ flex:1,paddingHorizontal:15, paddingTop: Platform.OS === "android" && 50 }}>
        <Text style={styles.text}>Pomodoro</Text>
        
        <Header setTime={setTime} currentTime={currentTime} setCurrentTime={setCurrentTime} />
        <Timer time={time}/>
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{color:"white", fontWeight:"bold"}}>
            {isActive ? "Stop" :"Start"}
          </Text>
        </TouchableOpacity >
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button:{
    alignItems:"center",
    backgroundColor:"#333333",
    padding:15,
    marginTop:15,
    borderRadius:15
  }
});
