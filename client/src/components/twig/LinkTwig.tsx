import { IonCard } from "@ionic/react";
import { Arrow } from "../../types";
import { Twig } from "../../warp/arrow/types";

interface LinkTwigProps {
  i: number;
  twig: Twig;
  arrow: Arrow;
}

const LinkTwig = ({i, twig, arrow}: LinkTwigProps) => {
  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 8,
      borderTopLeftRadius: 0,
      width: 25,
      height: 25,
    }}>
    </IonCard>
  )
}

export default LinkTwig;