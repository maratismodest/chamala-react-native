import { View } from "@components/Themed";
import { LocaleContext } from "@providers/LocaleProvider";
import { appStyles } from "@styles";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

interface CardProps {
  id: number;
  order: number;
  text: string;
}

const sortCards = (a: CardProps, b: CardProps) => {
  if (a.order > b.order) {
    return 1;
  }
  if (a.order < b.order) {
    return -1;
  }
  return 0;
};

const cards: CardProps[] = [
  {
    id: 1,
    order: 1,
    text: "Card 1",
  },
  {
    id: 2,
    order: 2,
    text: "Card 2",
  },
  {
    id: 3,
    order: 3,
    text: "Card 3",
  },
  {
    id: 4,
    order: 4,
    text: "Card 4",
  },
];
export default function SortPage() {
  const { i18n } = useContext(LocaleContext);
  const [cardList, setCardList] = React.useState<CardProps[]>(cards);
  const [current, setCurrent] = React.useState<CardProps | null>(null);

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    card: CardProps,
  ) {
    setCurrent(card);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>, card: CardProps) {
    e.target.style.backgroundColor = "white";
  }

  function dragOverHandler(
    e: React.DragEvent<HTMLDivElement>,
    card: CardProps,
  ) {
    e.preventDefault();
    e.target.style.backgroundColor = "lightgray";
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, card: CardProps) {
    e.preventDefault();
    setCardList(
      cardList.map((c: CardProps) => {
        if (current) {
          if (c.id === card.id) {
            return { ...c, order: current.order };
          }
          if (c.id === current.id) {
            return { ...c, order: card.order };
          }
        }
        return c;
      }),
    );
    e.target.style.backgroundColor = "white";
  }

  return (
    <View style={appStyles.container}>
      <View style={{ display: "flex", gap: 16 }}>
        {cardList.sort(sortCards).map((card) => (
          <div
            key={card.order}
            style={sortStyles.card}
            draggable
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragEndHandler(e, card)}
            onDragEnd={(e) => dragEndHandler(e, card)}
            onDragOver={(e) => dragOverHandler(e, card)}
            onDrop={(e) => dropHandler(e, card)}
          >
            {card.text}
          </div>
        ))}
      </View>
    </View>
  );
}

const sortStyles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    border: "4px solid",
    justifyContent: "center",
    alignItems: "center",
    cursor: "grab",
    display: "flex",
    borderRadius: 8,
  },
});
