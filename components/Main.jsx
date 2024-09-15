import React, { useState, useEffect } from "react"; // Asegúrate de importar React y los hooks
import { View, ActivityIndicator, FlatList } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";

export default function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames()
      .then((games) => {
        setGames(games);
      })
      .catch((error) => {
        console.error("Error fetching games:", error); // Manejo de errores
      });
  }, []);
  return (
    <View style={{ marginTop: insets.top, marginBottom: insets.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>

      {games.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
