// Trong thực tế, API_URL sẽ là URL của backend
const API_URL = "https://api.example.com";

export const login = async (email, password) => {
  try {
    // Trong thực tế, bạn sẽ gọi API để xác thực
    // Đây là mock data để demo
    if (email === "demo@example.com" && password === "password") {
      return {
        id: 1,
        email: email,
        name: "Demo User",
        role:"user",
      };
    
    }  
    else if(email==="admin@gmail.com"&&password==="password"){
      return{
        id: 2,
        email: email,
        name: "Demo Admin",
        role:"admin",
      }
    } 
    else {
      throw new Error("Email hoặc mật khẩu không đúng");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Trong thực tế, bạn sẽ gọi API để đăng ký
    console.log("Registering user:", userData);

    // Mock response
    return {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
