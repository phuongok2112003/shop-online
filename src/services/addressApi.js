const API_URL = "https://provinces.open-api.vn/api";

export const getProvinces = async () => {
  try {
    const response = await fetch(`${API_URL}/p/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const getDistricts = async (provinceCode) => {
  try {
    const response = await fetch(`${API_URL}/p/${provinceCode}?depth=2`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.districts;
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

export const getWards = async (districtCode) => {
  try {
    const response = await fetch(`${API_URL}/d/${districtCode}?depth=2`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.wards;
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw error;
  }
};
