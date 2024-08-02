import axios from "axios";
import LocalStorage from "../../utils/storage";

async function get(url) {
  const res = await axios.get(url);
  return res.data;
}

function getClientInfo() {
  return get("https://api.bigdatacloud.net/data/client-info");
}

function getClientLocationInfo() {
  return get("https://api.bigdatacloud.net/data/reverse-geocode-client");
}

function getClientCountryInfo(country) {
  return get(`https://restcountries.com/v3.1/name/${country}`);
}

function reverseGeoCodeAddress(latitude = undefined, longitude = undefined) {
  return get(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
}

async function handleCountryInfo(data = {}) {
  const countryInfo = await getClientCountryInfo(data.countryName);

  if (countryInfo) {
    LocalStorage.setStorageData("CLIENT_COUNTRY_INFO", countryInfo, true);
  }
}

async function handleGeoCodeAddress(data = {}) {
  const geoCodeAddressInfo = await reverseGeoCodeAddress(
    data.latitude,
    data.longitude
  );

  if (geoCodeAddressInfo) {
    LocalStorage.setStorageData(
      "CLIENT_REVERSE_GEOCODE_ADDRESS_INFO",
      geoCodeAddressInfo,
      true
    );
  }
}

async function refreshIP() {
  let differenceMinutes = 0;

  let responseV4 = {
    success: false,
  };

  let responseV6 = {
    success: false,
  };

  const response = {
    success: false,
    message: "",
  };

  try {
    const creationTime = LocalStorage.getStorageData(
      "LAST_UPDATE_PUBLIC_IP_CONFIG"
    );

    if (creationTime) {
      const now = Date.now();

      const differenceMillis = now - creationTime;

      differenceMinutes = Math.floor(differenceMillis / (1000 * 60));
    } else {
      differenceMinutes = 10;
    }

    if (differenceMinutes >= 10) {
      let ipConfigV4 = "";
      let ipConfigV6 = "";

      const [clientInfo, clientLocationInfo] = await Promise.all([
        getClientInfo(),
        getClientLocationInfo(),
      ]);

      if (clientInfo) {
        ipConfigV4 = clientInfo.ipString;
        ipConfigV6 = clientInfo.ipString;
        LocalStorage.setStorageData("CLIENT_INFO", clientInfo, true);
      }

      if (clientLocationInfo) {
        LocalStorage.setStorageData(
          "CLIENT_LOCATION_INFO",
          clientLocationInfo,
          true
        );

        handleCountryInfo({ countryName: clientLocationInfo.countryName });
        handleGeoCodeAddress({
          latitude: clientLocationInfo.latitude,
          longitude: clientLocationInfo.longitude,
        });
      }

      if (ipConfigV4) {
        responseV4 = LocalStorage.setStorageData(
          "PUBLIC_IP_CONFIG",
          ipConfigV4,
          true
        );
      }

      if (ipConfigV6) {
        responseV6 = LocalStorage.setStorageData(
          "PUBLIC_IPV6_CONFIG",
          ipConfigV6,
          true
        );
      }

      if (responseV4.success && responseV6.success) {
        LocalStorage.setStorageData(
          "LAST_UPDATE_PUBLIC_IP_CONFIG",
          Date.now(),
          true
        );

        response.success = true;
      }
    }
  } catch (error) {
    if (error.message) {
      response.message = error.message;
    } else {
      response.message = error;
    }
  }

  return response;
}

function getStoragePublicIPV4() {
  return LocalStorage.getStorageData("PUBLIC_IP_CONFIG") ?? "Not available";
}

function getStoragePublicIPV6() {
  return LocalStorage.getStorageData("PUBLIC_IPV6_CONFIG") ?? "Not available";
}

function getStorageClientInfo() {
  return LocalStorage.getStorageData("CLIENT_INFO");
}

function getStorageClientLocationInfo() {
  return LocalStorage.getStorageData("CLIENT_LOCATION_INFO");
}

function getAllClientInfo() {
  return {
    ...(LocalStorage.getStorageData("CLIENT_INFO") ?? {}),
    ...(LocalStorage.getStorageData("CLIENT_LOCATION_INFO") ?? {}),
    countryInfo: LocalStorage.getStorageData("CLIENT_COUNTRY_INFO") ?? {},
    geocodeAddressInfo:
      LocalStorage.getStorageData("CLIENT_REVERSE_GEOCODE_ADDRESS_INFO") ?? {},
    IPV6: LocalStorage.getStorageData("PUBLIC_IPV6_CONFIG"),
  };
}

const IP = {
  getClientLocationInfo,
  getClientInfo,
  refreshIP,
  getStoragePublicIPV4,
  getStoragePublicIPV6,
  getStorageClientLocationInfo,
  getStorageClientInfo,
  getAllClientInfo,
};

export default IP;
