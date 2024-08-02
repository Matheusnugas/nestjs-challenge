// import {
//   browserName,
//   browserVersion,
//   deviceType,
//   osName,
//   osVersion,
// } from "react-device-detect";

import IP from "../../services/ip";

import LocalStorage from "../storage";

// import CryptoUtil from "../crypto";

function getDeviceInfo() {
  const ipv4Response = IP.getStoragePublicIPV4();

  const ipv6Response = IP.getStoragePublicIPV6();

  const clientInfo = IP.getAllClientInfo();

  // const credentials = LocalStorage.getStorageData("drummondCredentials");

  // const encodedCredentials = CryptoUtil.encrypt(credentials, true);

  return {
    // "X-User-Info": encodedCredentials,
    "X-IPV4-Info": ipv4Response,
    "X-IPV6-Info": ipv6Response,
    // "X-Browser-Version": browserVersion,
    // "X-Browser": browserName,
    // "X-OS": osName,
    // "X-Device-Type": deviceType,
    // "X-OS-Version": osVersion,
    // "X-Full-Browser-Version": `${osName}:${osVersion} | ${browserName}:${browserVersion}`,
    // "X-Full-Data": `${osName}:${osVersion} | ${browserName}:${browserVersion} | IPV4:${ipv4Response} | IPV6:${ipv6Response}`,
    ...clientInfo,
  };
}

const DeviceUtils = {
  getDeviceInfo,
};

export default DeviceUtils;
