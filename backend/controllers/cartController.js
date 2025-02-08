import userModel from "../models/userModel.js";

// Add to user cart
const addToCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body;

      // Validate input
      if (!userId || !itemId) {
         return res.status(400).json({ success: false, message: "Invalid input" });
      }

      // Find user by ID
      const userData = await userModel.findById(userId);

      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};

      // Update cart data
      cartData[itemId] = (cartData[itemId] || 0) + 1;

      // Save updated cart data
      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({ success: true, message: "Added to cart" });
   } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ success: false, message: "Internal server error while adding to cart" });
   }
};

// Remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body;

      // Validate input
      if (!userId || !itemId) {
         return res.status(400).json({ success: false, message: "Invalid input" });
      }

      // Find user by ID
      const userData = await userModel.findById(userId);

      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};

      // Decrement item quantity if it exists
      if (cartData[itemId] > 0) {
         cartData[itemId] -= 1;

         // Remove item if quantity is 0
         if (cartData[itemId] === 0) {
            delete cartData[itemId];
         }
      }

      // Save updated cart data
      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({ success: true, message: "Removed from cart" });
   } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

// Get user cart
const getCart = async (req, res) => {
   try {
      const { userId } = req.body;

      // Validate input
      if (!userId) {
         return res.status(400).json({ success: false, message: "Invalid input" });
      }

      // Find user by ID
      const userData = await userModel.findById(userId);

      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Return cart data
      const cartData = userData.cartData || {};
      res.json({ success: true, cartData });
   } catch (error) {
      console.error("Error in getCart:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

export { addToCart, removeFromCart, getCart };
