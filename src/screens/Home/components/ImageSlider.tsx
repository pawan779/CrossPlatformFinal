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
        <Text>{cardData.likeCount} likes</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              const updatedCards = cards.map((card) => {
                if (card.id === cardData.id) {
                  return {
                    ...card,
                    likeCount: card.likeCount + 1,
                  };
                }
                return card;
              });

              setCards(updatedCards);
            }}
            style={styles.button}
          >
            <Icon name="thumbs-up" size={40} color="blue" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Add your share logic here
            }}
            style={styles.button}
          >
            <Icon name="share-alt" size={20} color="green" />
          </TouchableOpacity>
        </View>
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
      setCardIndex((prevIndex) => prevIndex - 1); // Go to the previous slide
    }
  };

  console.log(cardIndex);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        onSwiped={(index: number) => setCardIndex(index)}
        // onSwipedLeft={() => onSwiped("left")}
        // onSwipedRight={() => onSwiped("right")}
        // onSwipedTop={() => onSwiped("top")}
        // onSwipedBottom={() => onSwiped("bottom")}
        onTapCard={swipeLeft}
        cards={cards}
        cardIndex={cardIndex}
        cardVerticalMargin={80}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
        infinite
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
    backgroundColor: "#F5FCFF",
  },
  card: {
    height: Dimensions.get("window").height - 200,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    borderRadius: 4,
    resizeMode: "cover",
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
    marginTop: 10,
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
