const FONT = {
    Inter600: 'Inter_600SemiBold',
    Inter500: 'Inter_500Medium',
    Inter400: 'Inter_400Regular',
    Inter300: 'Inter_300Light',
}

const getFontConfig = (fontSize = 16, lineHeight = 24, fontFamily = FONT.Inter600) => {
    return {
        fontSize,
        lineHeight,
        fontFamily,
    }
}

export const FC = {
    h1: getFontConfig(30, 36, FONT.Inter600),
    h3: getFontConfig(16, 24, FONT.Inter600),
    h4: getFontConfig(14, 20, FONT.Inter500),
    textL: getFontConfig(16, 24, FONT.Inter400),
    textS: getFontConfig(14, 20, FONT.Inter400),
}
