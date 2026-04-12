// app/employee/list.tsx
import { Stack } from "expo-router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";

interface Employee {
  id: string;
  fullName: string;
  position: string;
  email: string;
}

export default function EmployeeListScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const q = query(
      collection(db, "employees"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const employeeData: Employee[] = [];
        querySnapshot.forEach((doc) => {
          employeeData.push({ id: doc.id, ...doc.data() } as Employee);
        });

        setEmployees(employeeData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "My Submissions" }} />

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No submissions yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.details}>
              {item.position} | {item.email}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  details: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#9ca3af",
    fontSize: 16,
  },
});
