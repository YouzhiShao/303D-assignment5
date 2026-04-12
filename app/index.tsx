// app/index.tsx
import { Link, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function Home() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Signed Out", "You have been successfully logged out.");
    } catch (error: any) {
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>

      <Link href="/employee" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Employee Form</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/employee/list" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>View Employee List</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/auth/sign-in" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/auth/sign-up" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        style={[styles.btn, styles.signOutBtn]}
        onPress={handleSignOut}
      >
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  signOutBtn: {
    backgroundColor: "#ef4444",
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "600" },
});
