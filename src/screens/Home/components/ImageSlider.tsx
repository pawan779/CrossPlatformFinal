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
  ScrollView,
} from "react-native";
import { Common } from "../../../components/common";
import ProfileCard from "./ProfileCard";
import Icon from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";

interface CardData {
  id: number;
  text: string;
  postImage?: string;
  userId: number;
  likeCount: number;
}
interface CardDataProps {
  data: [CardData];
  onRefresh: () => void;
}

const ImageSlider: React.FC<CardDataProps> = (props) => {
  const swiperRef = useRef<Swiper<CardData>>(null);

  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const renderCard = (cardData: CardData, index: number) => {
    return (
      <View style={styles.card} key={cardData.id.toString()}>
        <ProfileCard
          data={cardData}
          swipeLeft={swipeLeft}
          onRefresh={props.onRefresh}
        />
        {cardData?.postImage && (
          <>
            <Image source={{ uri: cardData?.postImage }} style={styles.image} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,.7)"]}
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: 1,
              }}
            />
          </>
        )}
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
      swiperRef.current.swipeBack();
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
        cards={props?.data}
        cardIndex={cardIndex}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        infinite
        containerStyle={{ flex: 1, width: "100%", height: "100%" }}
      />
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
