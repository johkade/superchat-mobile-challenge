import React from "react";
import {Text, TextStyle} from "react-native";
import FontConfig from "../../style/theme/types/FontConfig";
import useTheme from "../../style/theme/hooks/useTheme";
import {FC} from "../../style/theme/fontConfig";

type Props = {
    text: string;
    fontConfig: FontConfig;
    color?: string;
    style?: TextStyle;
}

const CText = ({text, fontConfig = FC.textL, color, style}: Props) => {
    const theme = useTheme();

    const styles = {
        ...fontConfig,
        color: color ?? theme.fontStd,
    }
    return (
        <Text style={[styles, style]}>
            {text}
        </Text>

    )
}

export default CText;
