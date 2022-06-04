import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from "../../style/theme/hooks/useTheme";
import {StyleSheet, View, ViewStyle} from "react-native";
import {BORDER_RADIUS, SPACE} from "../../style/theme/misc";


type Icons = 'filter' | 'chevron-down' | 'chevron-up' | 'close' | 'add' | 'search' | 'moon'

type Props = {
    icon: Icons;
    size?: number;
    color?: string;
    style?: ViewStyle;
    withBgColor?: string;
}

const CIcon = ({icon, size = 32, color, withBgColor, style}: Props) => {
    const theme = useTheme();

    const dynamicStyle = [styles.container, style, {backgroundColor: withBgColor}]
    return (
        <View style={dynamicStyle}>
            {/*@ts-ignore --> TODO: fix this later (warning)*/}
            <Ionicons name={icon} size={size} color={color ?? theme.fontStd}/>
        </View>

    )
}

export default CIcon;

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        aspectRatio: 1,
        padding: SPACE.xxs1
    }
})
