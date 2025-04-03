import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { useSession } from "../../context/AuthProvider.js";
import { Text } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Show a loading screen while checking authentication
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // If the user is not authenticated, redirect to login
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ gestureEnabled: true }}>
      <Stack.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
      <Stack.Screen name="storelists" options={{ title: "Store",headerShown: false }} />
    </Stack>
  );
}
