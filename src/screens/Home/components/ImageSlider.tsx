import React, { useState, useEffect, useRef, useCallback } from "react";
import Swiper from "react-native-deck-swiper";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Common } from "../../../components/common";
import ProfileCard from "./ProfileCard";
import Icon from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";

interface CardData {
  id: number;
  text: string;
  image: string;
  userId: number;
  likeCount: number;
}

const ImageSlider: React.FC = () => {
  const swiperRef = useRef<Swiper<CardData>>(null);
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 1,
      text: "This is text", // You can replace this with your desired text
      image: "https://awik.io/wp-content/uploads/2018/06/unsplash.jpg",
      userId: 5, // You can replace this with the appropriate user ID
      likeCount: 5, // You can replace this with the appropriate like count
    },
    {
      id: 2,
      text: "This is text", // You can replace this with your desired text
      image: "https://source.unsplash.com/random",
      userId: 5, // You can replace this with the appropriate user ID
      likeCount: 5, // You can replace this with the appropriate like count
    },
    {
      id: 3,
      text: "This is text", // You can replace this with your desired text
      image: "https://source.unsplash.com/random",
      userId: 5, // You can replace this with the appropriate user ID
      likeCount: 5, // You can replace this with the appropriate like count
    },
    {
      id: 4,
      text: "This is text", // You can replace this with your desired text
      image: "https://source.unsplash.com/random",
      userId: 5, // You can replace this with the appropriate user ID
      likeCount: 5, // You can replace this with the appropriate like count
    },
    {
      id: 5,
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptatem quaerat minus accusantium ducimus doloribus deserunt eum inventore eaque aspernatur, iusto quo, voluptatibus sint quos fuga possimus cumque, debitis amet.", // You can replace this with your desired text
      image: "https://source.unsplash.com/random",
      userId: 5, // You can replace this with the appropriate user ID
      likeCount: 5, // You can replace this with the appropriate like count
    },
  ]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const renderCard = (cardData: CardData, index: number) => {
    return (
      <View style={styles.card} key={index.toString()}>
        <ProfileCard />
        <Image source={{ uri: cardData?.image }} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.7)"]}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 1,
          }}
        />
      </View>
    );
  };

  const onSwiped = (type: string) => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const swipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
      setCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  console.log(cardIndex);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        onSwiped={(index: number) => setCardIndex(index)}
        onTapCard={swipeLeft}
        cards={cards}
        cardIndex={cardIndex}
        // cardVerticalMargin={80}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        infinite
        containerStyle={{ flex: 1, width: "100%", height: "100%" }}
      >
        <Button
          onPress={() => swiperRef.current?.swipeBack()}
          title="Swipe Back"
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  card: {
    height: Dimensions.get("window").height - 70,
    width: Dimensions.get("window").width,
    // justifyContent: "center",
    backgroundColor: "#000",
    marginLeft: -20,
    marginTop: -60,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
});

export default ImageSlider;
