import {Inter_300Light, Inter_400Regular,Inter_500Medium, Inter_600SemiBold, useFonts} from "@expo-google-fonts/inter";

const useInitFonts = () => {
    let [fontsLoaded] = useFonts({
        Inter_600SemiBold,
        Inter_500Medium,
        Inter_400Regular,
        Inter_300Light,
    });
    return {fontsLoaded}
}
export default useInitFonts;
