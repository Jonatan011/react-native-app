import { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Animated } from "react-native";

export default function GameCard({ game }) {
  return (
    <>
      <View key={game.slug} style={styles.card}>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.score}>{game.score}</Text>
        <Text style={styles.description}>{game.description}</Text>
      </View>
    </>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 42, alignItems: "center" },
  image: { width: 107, height: 147, borderRadius: 10 },
  title: {
    fontSize: 20, // Tamaño de fuente para el texto
    color: "white", // Color del texto
    fontWeight: "bold",
    marginTop: 16, // Espacio entre el componente Container y el texto
  },
  description: {
    fontSize: 16, // Tamaño de fuente para el texto
    color: "white", // Color del texto
    fontWeight: "500",
    marginTop: 16, // Espacio entre el componente Container y el texato
    textAlign: "center",
  },
  score: {
    fontSize: 16, // Tamaño de fuente para el texto
    color: "yellow", // Color del texto
    fontWeight: "bold",
    marginTop: 16, // Espacio entre el componente Container y el texto
  },
});
