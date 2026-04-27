import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 15,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  searchSection: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryButtonActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  categoryButtonText: {
    color: "#666",
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  sortSection: {
    marginBottom: 15,
  },
  sortButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sortButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  sortButtonText: {
    color: "#666",
    fontSize: 13,
  },
  sortButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  productsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  emptyState: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 4,
  },
  productStock: {
    fontSize: 13,
    color: "#666",
  },
  productActions: {
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  quantityButton: {
    backgroundColor: "#2196F3",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
  cartSummary: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  summaryPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  summaryActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#f44336",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSection: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2196F3",
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 5,
  },

  cartSpacer: {
    height: 100, // Tinggi sesuai dengan CartSummary + margin
  },

  // CartSummary - BUKAN floating, tapi fixed di bottom
  cartSummaryFloating: {
    position: "absolute", // Tetap absolute tapi relatif ke SafeAreaView
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4, // Shadow ke atas
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  cartSummaryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2D8A3E",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cartInfoLeft: {
    flex: 1,
    marginRight: 15,
  },
  cartItemCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cartDeliveryText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  cartInfoRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cartTotalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cartIconBag: {
    width: 45,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIconStar: {
    fontSize: 22,
  },
});
export { styles };